# MemesPro

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router
- **Architecture**: Clean Architecture (OOP)

## Project Structure

The project follows a Clean Architecture approach:

- `src/core`: Domain layer (Entities, Use Cases, Repository Interfaces). Pure TypeScript, no React.
- `src/infrastructure`: Interface Adapters (API clients, Repository Implementations).
- `src/presentation`: View layer (React Components, Pages, Hooks).

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run test`: Run Vitest tests

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
