// ---------------------------------------------------------------------------
// Settings you edit by hand. Everything else is edited on the site itself.
// ---------------------------------------------------------------------------

// 1. Firebase. Paste the config object from
//    Firebase console > Project settings > Your apps > Web app.
//    While apiKey is empty the site saves only in this browser (localStorage)
//    and the Files page is switched off. README.md has the full steps.
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// 2. Where uploaded files are kept.
//    "firestore" works on Firebase's free Spark plan. Files are cut into
//                pieces and saved in the database. Limit: 20 MB per file.
//    "storage"   uses Firebase Storage. Better for big files, but new Firebase
//                projects need the Blaze (pay-as-you-go) plan to turn it on.
export const FILE_BACKEND = "firestore";

// 3. The six-month plan: first Monday and length in weeks.
export const PLAN_START = "2026-11-16";
export const PLAN_WEEKS = 26;
