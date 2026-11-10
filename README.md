# Crypto: React Native test assignment

A mobile app built with Expo and React Native (TypeScript). It covers registration, login with a PIN code and biometrics, an offline-first posts feed, search, and settings with language switching (English / Swedish).

## Features

- **Welcome, Login, Register screens.** Registration is UI plus validation only (name, e-mail, password 8-64 chars with lower case, upper case and a special character).
- **Login** against the DummyJSON auth API.
- **PIN code.** Created after the first login and stored in the secure storage (iOS Keychain).
- **Biometrics.** Face ID / Touch ID is offered on every app start, with PIN as the fallback.
- **Existing login.** After a restart the user is not logged out. The app shows the PIN screen (or biometrics), then opens Home.
- **Home** with the user name, a static "Personal Advisor" card, a static "Before you Start" list, and 3 posts from JSONPlaceholder.
- **Post screen** with details and comments.
- **Search** over posts (works offline).
- **Settings** with the user photo and name, language switch (English / Swedish), and log out.
- **Offline-first.** Data from the backend is cached on the device and the app stays usable without a connection.

## Tech stack

| Area | Library |
|---|---|
| Framework | Expo (development build), React Native, TypeScript |
| Navigation | `@react-navigation/native`, `native-stack`, `bottom-tabs` |
| Global state | `zustand` |
| Server state and cache | `@tanstack/react-query` |
| Offline persistence | `@tanstack/query-async-storage-persister`, `@tanstack/react-query-persist-client`, `@react-native-async-storage/async-storage`, `@react-native-community/netinfo` |
| HTTP | `axios`, `axios-auth-refresh` |
| Secure storage | `react-native-keychain` |
| Biometrics | `expo-local-authentication` |
| Forms | `react-hook-form` |
| i18n | `i18next`, `react-i18next` |

## Getting started

### Requirements

- Node.js 22+
- macOS with Xcode (the project was developed and tested on iOS)
- An Apple ID added to Xcode if you want to run on a physical device

### Install and run

```bash
npm install
npx expo prebuild --platform ios
npx expo run:ios                 # simulator
npx expo run:ios --device        # physical iPhone
```

Notes:

- The app **cannot run in Expo Go**: it uses native modules (Keychain, local authentication, AsyncStorage, NetInfo). Use the development build created by the commands above.
- `.npmrc` contains `legacy-peer-deps=true`. The project is on a pre-release Expo SDK / React Native, and npm otherwise rejects some peer dependency ranges.
- To run on a device, open `ios/*.xcworkspace` once in Xcode, pick your Personal Team under *Signing & Capabilities* and set a unique bundle identifier (also in `app.json`).
- Face ID should be verified on a real device. Simulator support for biometrics is limited in the current Xcode.

### Test credentials

Any user from https://dummyjson.com/users works, for example:

```
username: emilys
password: emilyspass
```

Note that the login field accepts the DummyJSON `username`, even though the design labels it "Email".

## Architecture

### Project structure

```
src/
  api/            axios clients, API calls, token refresh interceptor
  constants/      shared constants (PIN length)
  hooks/          react-query hooks (posts, comments, profile)
  i18n/           i18next setup and locales (en, sv)
  lib/            QueryClient and persister
  navigation/     root navigator, tabs, profile stack, bootstrap
  services/       biometrics, sign out
  storage/        Keychain wrapper (session, PIN)
  store/          zustand auth store
  theme/          colors
  views/
    components/   shared UI components
    screens/      one folder per screen: index.tsx (UI) + useScreen.ts (logic)
```

Each screen follows the same rule: `index.tsx` only renders, `useScreen.ts` owns the screen logic.

### Auth flow as a state machine

Navigation is driven by one status value in the zustand store, so screens never navigate manually between flows:

| Status | What is shown |
|---|---|
| `loading` | Splash screen (session is being read from Keychain) |
| `signedOut` | Welcome, Login, Register |
| `needsPin` | Create PIN |
| `locked` | Enter PIN / biometrics |
| `unlocked` | Main tabs (Home, Portfolio, Search, Settings) |

On start the app reads the session and the PIN from Keychain and picks the status. The splash screen stays visible until this is done, so there is no flicker.

### Tokens

Access and refresh tokens (together with the user data) are stored in Keychain. A request interceptor adds the bearer token. When the API answers 401, `axios-auth-refresh` obtains a new token pair through `/auth/refresh`, stores it, and retries the request. If refreshing fails, the user is signed out.

### Offline-first

- The react-query cache is persisted to AsyncStorage for 7 days.
- `NetInfo` is connected to react-query's `onlineManager`, so requests pause offline and resume when the connection returns.
- After login the full post list is prefetched. Each post is also written to the cache under its own key, and comments for the posts on Home are prefetched. Search filters the cached list locally.
- Comments for other posts are available offline only after they were opened once online.
- The cache and the Keychain data are cleared on sign out.

## Decisions and known limitations

- **PIN length is 5.** The design shows 5 digits when creating a PIN and 4 on the entry screen. The length is a single constant (`src/constants/pin.ts`).
- **Swedish instead of Arabic.** The language design shows Arabic, the written requirements ask for Swedish, so Swedish is implemented (Arabic would also need RTL support).
- **Home header** uses a solid color instead of the gradient from the design (the gradient needs an extra native dependency).
- **Not implemented:** the "Forgot?" link and the inline error icons from the login design, the Portfolio tab content (placeholder), and Android verification.
- **PIN storage.** The PIN is stored in Keychain as is. For production I would store a salted hash and add a limit on failed attempts.
- **Registration** performs validation only and does not call an API, as agreed in the requirements.

## Possible next steps

- Hash the PIN and add attempt limiting.
- Verify and polish the Android build.
- Unit tests for validation rules and the auth bootstrap logic.
- Header gradient and the remaining error states from the design.
