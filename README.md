# GovData dashboard

This web application provides a dashboard showing how many data sets each federal ministry has made available on GovData.

## How to start

Run `yarn start` to start the application.

The frontend can be opened at [http://localhost:5173/](http://localhost:5173/) in the browser.
A json-server serves the mock data at `localhost:3000`.

The ministries with the most available datasets are shown on top of the table.
You can use the search input to filter the ministries by name.

## Scripts

The following scripts can be used during the development of the app.

`yarn build` - bundles the frontend assets into the "dist" folder  
`yarn lint` - runs a lint check on the code base  
`yarn format` - formats the code  
`yarn format-check` - checks if the code formatting rules are applied to the code base  
`yarn test` - runs unit and integration tests
`yarn cypress:open` - opens Cypress client to run end-to-end tests
`yarn cypress:run` - runs end-to-end tests headless in console

## Tech Stack

The following tech stack is used in the project.

### UI

**React** as UI library  
**Material UI** as component library  
**React Query** to perform backend request in React components  
**Zod** for schema validation  
**CSS modules** for CSS style management

### Code Style

**ESLint** as linter  
**Prettier** as code formatter

### Testing

**Vitest** as test runner for unit and integration tests  
**React Testing Library** to test React components  
**Cypress** to automate end-to-end tests  
**Axe** for automated accessibility testing

### Bundling & deployment

**Vite** as bundler and development toolbox  
**GitHub Actions** as CI/CD platform

## QA

This project ensures functional quality on three levels:

- Unit tests are covering single functions and presentational components
- Integration tests are covering full pages with focus on interaction between components. Backend calls are mocked.
- End-to-end tests are covering the whole user flow with the actual backend. Only the happy path is tested.

### Examples

Due to time restrictions only a few sample tests have been written for each level:  
[Unit tests](./src/utils/useDebounce.test.ts)  
[Integration tests](./src/dashboard/Dashboard.test.tsx)  
[End-to-end tests](./cypress/e2e/Dashboard.cy.ts)
