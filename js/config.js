// ---------------------------------------------------------------------------
// Settings you edit by hand. Everything else is edited on the site itself.
// ---------------------------------------------------------------------------

// 1. Firebase. Paste the config object from
//    Firebase console > Project settings > Your apps > Web app.
//    While apiKey is empty the site saves only in this browser (localStorage)
//    and the Files page is switched off. README.md has the full steps.
export const firebaseConfig = {
apiKey: "AIzaSyCjNQgb2syVyWbA0xBVus4qWd3-45Fta5o",
authDomain: "mclighty-huhu.firebaseapp.com",
projectId: "mclighty-huhu",
storageBucket: "mlighty-huhu.firebasestorage.app",
messagingSenderId: "353662219358",
appId: "1:353662219358:web:6ce6f57a7b48d4d5ad30cf",
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
