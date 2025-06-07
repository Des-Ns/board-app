# BoardApp

BoardApp is an Angular-based project management application that allows users to manage projects, teams, members, and tasks with a modern UI built using Angular Material.

## Key Features

- **Project Management:** Create, edit, delete, and view projects, each with a title, description, status, team members, tasks, and date range.
- **Team & Member Management:** Manage team members, including their details, roles, and project assignments. Members can be created, edited, or deleted.
- **Task Management:** Assign tasks to projects and members, and track their status.
- **Dashboard:** Visual overview of projects grouped by status (to-do, in-progress, finished).
- **Tables & Lists:** Interactive tables for projects and members, with filtering, sorting, and pagination.
- **Dialogs:** Use of modal dialogs for creating/editing projects and members.
- **Mock Backend:** Uses json-server with db.json for local API simulation.
- **Responsive UI:** Built with Angular Material components and Flex Layout for a responsive, user-friendly experience.

## Architecture

- **Angular CLI Structure:** Standard Angular CLI layout with modular organization.
- **Services:** Centralized data and API logic in Angular services.
- **State Management:** Uses RxJS BehaviorSubjects and Observables for reactive state.
- **Dialogs:** Angular Material dialogs for CRUD operations.
- **Mock API:** json-server for simulating RESTful backend.

## Getting Started

1. Install dependencies:
   ```cmd
   npm install
   ```
2. Start the Angular app:
   ```cmd
   npm start
   ```
3. Start the mock API server:

   ```cmd
   npx json-server db.json
   ```

## Restoring the Original Database

If you want to reset the mock backend to its original state, you can restore the original `db.json`:

1. Locate the backup file `db.original.json` in the project root.
2. Replace your current `db.json` with the original:

## Project Structure

- `src/app/` - Main application code
- `src/app/shared/` - Shared models, services, and pipes
- `src/app/sidenav-components/` - Dashboard, team, and related features
- `db.json` - Mock database for json-server
