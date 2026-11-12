# 공부방 (study room)

One site for the six-month plan: course links, workout log, Korean units and file uploads.

It is plain HTML, CSS and JavaScript. There is no build step and nothing to install.

## What is where

| File | What it does |
| --- | --- |
| `index.html` | The page shell: brand, navigation, where pages are drawn |
| `css/style.css` | All styling |
| `js/config.js` | **The file you edit by hand:** Firebase config, upload mode, plan start date |
| `js/app.js` | Starts the site and switches pages |
| `js/home.js`, `courses.js`, `workouts.js`, `korean.js`, `files.js` | One file per page |
| `js/store.js` | Holds the data and saves it (browser first, Firebase when signed in) |
| `js/cloud.js` | Everything that talks to Firebase |
| `js/seed.js` | Your routines and 34 workouts imported from the spreadsheet |
| `js/seed-courses.js` | The seven course links the site starts with |
| `firestore.rules`, `storage.rules` | Security rules to paste into the Firebase console |

## Run it on your computer

The site uses JavaScript modules, which browsers only load over http, so opening
`index.html` by double-click will show a blank page. Use either of these:

```bash
npx serve .
```

or the "Live Server" extension in VS Code.

## Put it on Vercel

1. Create a new GitHub repository and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Study room"
   git branch -M main
   git remote add origin https://github.com/McLight-Note/study-room.git
   git push -u origin main
   ```
2. On vercel.com choose **Add New > Project** and import the repository.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Deploy. Every later `git push` redeploys the site.

Without Firebase the site already works: everything is saved in the browser you
use. That also means your phone and laptop will not see each other's data until
you do the next part.

## Connect Firebase (cloud saving and file uploads)

1. Open https://console.firebase.google.com and create a project.
2. **Build > Authentication > Sign-in method**: enable **Google**.
3. **Build > Firestore Database > Create database** (production mode). Then open
   the **Rules** tab, paste the contents of `firestore.rules`, and publish.
4. **Project settings (gear icon) > General > Your apps**: add a **Web** app.
   Copy the `firebaseConfig` values into `js/config.js`.
5. Commit and push. After Vercel deploys, copy your site address
   (for example `study-room.vercel.app`) into
   **Authentication > Settings > Authorized domains**.
6. Open the site and press **Sign in with Google**. The first sign-in copies
   what is saved in that browser up to Firebase.

The Firebase config is safe to commit. It only identifies your project; the
rules are what protect your data.

### Only letting yourself in

With the rules above, anyone with a Google account could sign in and store
their own data in your project. To allow only you, change the rule line to:

```
allow read, write: if request.auth != null
                   && request.auth.uid == uid
                   && request.auth.token.email == "YOUR_EMAIL@gmail.com";
```

### Uploads: two modes

`FILE_BACKEND` in `js/config.js` chooses where files go.

- `"firestore"` (default): works on the free Spark plan. Each file is split
  into pieces and saved in the database. Limit 20 MB per file. The free plan
  gives 1 GB of database space in total.
- `"storage"`: uses Firebase Storage, which suits large files. New Firebase
  projects must be on the Blaze (pay-as-you-go) plan to enable it. If you
  switch, also enable **Build > Storage** and paste `storage.rules` there.

## How saving works

- Every change is written to `localStorage` in the browser straight away.
- If you are signed in, it is also sent to Firestore under `users/<your id>/`.
- A workout you are in the middle of logging is kept in the browser only, so a
  reload at the gym does not lose it.
- Workouts saved while offline or signed out are sent the next time you open
  the site signed in.

## Changing things

- Course links, routines, workouts and Korean units are all edited on the site.
- The plan's start date and length are `PLAN_START` and `PLAN_WEEKS` in `js/config.js`.
- To start again from the spreadsheet data in one browser, clear the site's
  storage (DevTools > Application > Local Storage > delete `studyhub:v1`).
