# React + Vite

## Ascend Workout Library

The responsive Workout Library is available at `/workouts`. It uses sample workout plans only and does not save workout completion or EXP.

### Run the app

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use the demo login form to open the dashboard, then choose **Workouts** in the navigation or select **View all** in the dashboard workout section. You can also open `/workouts` directly.

On Windows PowerShell, if script execution blocks `npm.ps1`, use `npm.cmd` in place of `npm` (for example, `npm.cmd run dev`).

### Manually test the Workout Library

- Confirm the page heading reads “Choose Your Next Quest.” and the Rank E recommendations and workout cards are visible.
- Search for a workout name (for example, “mobility”), then try category filters and verify the displayed results update.
- Search for a name that is not in the library, use **Reset Filters**, and confirm the full library returns.
- Open **View Plan** on a card. Check the description, warm-up, exercise prescriptions, rest times, total duration, and EXP reward. Close with the close button and with Escape.
- Use Tab/Shift+Tab and Enter/Space to navigate the controls, and check the layout at desktop and narrow mobile widths.
- Use the page navigation to return to Home, and verify the existing login, signup, and dashboard still work.

### Checks

```sh
npm run lint
npm run build
```

Workout sample data lives in `src/data/workouts.js`. The library filters that array in React state using the search text and selected category; its cards, filters, navigation, and workout-plan dialog are separate React components.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
