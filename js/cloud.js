// Everything that talks to Firebase lives in this file.
// It is only loaded when js/config.js has a Firebase config in it.
//
// Where things are saved (uid is your Firebase user id):
//   users/{uid}/state/main          courses, routines, Korean checklist
//   users/{uid}/sessions/{id}       one logged workout each
//   users/{uid}/files/{id}          one uploaded file's details each
//   users/{uid}/files/{id}/chunks   the file itself, in pieces (FILE_BACKEND "firestore")

import { firebaseConfig, FILE_BACKEND } from "./config.js";
import { newId, formatSize } from "./ui.js";

const CDN = "https://www.gstatic.com/firebasejs/10.12.2/";
const CHUNK_BYTES = 800_000; // a Firestore document can hold just under 1 MB
const MAX_DATABASE_FILE = 20 * 1024 * 1024;

export async function startCloud(onUser) {
  const [appLib, authLib, fs] = await Promise.all([
    import(CDN + "firebase-app.js"),
    import(CDN + "firebase-auth.js"),
    import(CDN + "firebase-firestore.js"),
  ]);

  const app = appLib.initializeApp(firebaseConfig);
  const auth = authLib.getAuth(app);
  const db = fs.getFirestore(app);
  let uid = null;

  const userDoc = (...path) => fs.doc(db, "users", uid, ...path);
  const userCollection = (...path) => fs.collection(db, "users", uid, ...path);
  // Firestore refuses `undefined`, so send clean copies.
  const plain = (value) => JSON.parse(JSON.stringify(value));

  // Firebase Storage is loaded only if you chose it in config.js.
  let storageLib = null;
  let storage = null;
  async function useStorage() {
    if (!storageLib) {
      storageLib = await import(CDN + "firebase-storage.js");
      storage = storageLib.getStorage(app);
    }
    return storageLib;
  }

  const api = {
    signIn: () => authLib.signInWithPopup(auth, new authLib.GoogleAuthProvider()),
    signOut: () => authLib.signOut(auth),

    // ---- courses, routines, Korean -------------------------------------
    async getMain() {
      const snapshot = await fs.getDoc(userDoc("state", "main"));
      return snapshot.exists() ? snapshot.data() : null;
    },
    setMain: (data) => fs.setDoc(userDoc("state", "main"), plain(data)),

    // ---- workouts ------------------------------------------------------
    async getSessions() {
      const snapshot = await fs.getDocs(userCollection("sessions"));
      return snapshot.docs.map((d) => d.data());
    },
    async setSessions(list) {
      // A batch can hold 500 writes, so send in groups of 400.
      for (let i = 0; i < list.length; i += 400) {
        const batch = fs.writeBatch(db);
        list.slice(i, i + 400).forEach((s) => batch.set(userDoc("sessions", s.id), plain(s)));
        await batch.commit();
      }
    },
    deleteSession: (id) => fs.deleteDoc(userDoc("sessions", id)),

    // ---- files ---------------------------------------------------------
    async listFiles() {
      const snapshot = await fs.getDocs(userCollection("files"));
      return snapshot.docs
        .map((d) => d.data())
        .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    },

    async uploadFile(file, onProgress) {
      const id = newId();
      const details = {
        id,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        addedAt: new Date().toISOString(),
        backend: FILE_BACKEND,
      };

      if (FILE_BACKEND === "storage") {
        const lib = await useStorage();
        const path = `users/${uid}/${id}/${file.name}`;
        const fileRef = lib.ref(storage, path);
        const task = lib.uploadBytesResumable(fileRef, file);
        await new Promise((resolve, reject) => {
          task.on(
            "state_changed",
            (s) => onProgress(s.bytesTransferred / s.totalBytes),
            reject,
            resolve
          );
        });
        details.path = path;
        details.url = await lib.getDownloadURL(fileRef);
      } else {
        if (file.size > MAX_DATABASE_FILE) {
          throw new Error(
            `${file.name} is ${formatSize(file.size)}. Files can be up to 20 MB unless you switch FILE_BACKEND to "storage" in js/config.js.`
          );
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const count = Math.max(1, Math.ceil(bytes.length / CHUNK_BYTES));
        for (let i = 0; i < count; i++) {
          const piece = bytes.subarray(i * CHUNK_BYTES, (i + 1) * CHUNK_BYTES);
          await fs.setDoc(userDoc("files", id, "chunks", String(i)), {
            index: i,
            data: fs.Bytes.fromUint8Array(piece),
          });
          onProgress((i + 1) / count);
        }
        details.chunks = count;
      }

      await fs.setDoc(userDoc("files", id), details);
      return details;
    },

    // Returns a link the browser can download from.
    async fileUrl(details) {
      if (details.backend === "storage") return details.url;
      const snapshot = await fs.getDocs(userCollection("files", details.id, "chunks"));
      const pieces = snapshot.docs
        .map((d) => d.data())
        .sort((a, b) => a.index - b.index)
        .map((c) => c.data.toUint8Array());
      return URL.createObjectURL(new Blob(pieces, { type: details.type }));
    },

    async deleteFile(details) {
      if (details.backend === "storage") {
        const lib = await useStorage();
        await lib.deleteObject(lib.ref(storage, details.path)).catch(() => {});
      } else {
        const snapshot = await fs.getDocs(userCollection("files", details.id, "chunks"));
        for (const d of snapshot.docs) await fs.deleteDoc(d.ref);
      }
      await fs.deleteDoc(userDoc("files", details.id));
    },
  };

  authLib.onAuthStateChanged(auth, (user) => {
    uid = user ? user.uid : null;
    onUser(user ? { uid: user.uid, email: user.email, name: user.displayName } : null);
  });

  return api;
}
