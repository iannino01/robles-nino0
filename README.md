# RoblesNino0

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## GitHub and Netlify

This repository is already configured so `node_modules/` and `dist/` are not uploaded to GitHub because they are listed in `.gitignore`.

For Netlify, the project includes:

- `netlify.toml` with the build command `npm run build`
- publish directory set to `dist/RoblesNino0/browser`
- SPA redirect support through `public/_redirects`

Recommended flow:

```bash
git init
git add .
git commit -m "Initial commit"
```

Then connect the GitHub repository in Netlify and it will build the app automatically.

## Firebase backend

The app is now prepared to use Firebase for:

- Google-backed authenticated sessions
- per-user family members
- Firestore storage for the family list

Before Firebase is configured, the app still works and stores family members in the current browser only.

### 1. Create a Firebase project

Create a project in Firebase and enable:

- Authentication
- Google as a sign-in provider
- Firestore Database

### 2. Add your web app config

Open `src/app/firebase.config.ts` and replace the empty strings with your Firebase web app values:

- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

### 3. Configure Firestore rules

Use rules like these so each signed-in user can read and write only their own family records:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId}/familiares/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Allow the deployed site in Google/Firebase

Add your Netlify domain to the authorized domains list and OAuth settings, for example:

- `familia-robles-nino.netlify.app`

### 5. Deploy the update

After saving your Firebase config:

```bash
git add .
git commit -m "Configura Firebase"
git push
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

