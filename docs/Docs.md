# Meme Marketplace Pro - Project Documentation

## Project Overview
Meme Marketplace Pro is a React-based web application that simulates a digital marketplace for memes. It allows users to browse, search, filter, and "purchase" memes using a mock currency. The project demonstrates modern React patterns including **Hooks**, **Context API**, and **Client-Side Routing**.

## Features Checklist
- **Authentication**: Mock login system with username/password validation and protected routes.
- **Dashboard**: Overview of marketplace statistics, top-rated memes, and quick actions.
- **Meme Gallery**: Grid view of memes with advanced filtering (Category), sorting (Name, Rating, Price, Size), and real-time search.
- **Infinite Scroll**: Seamless browsing experience using Intersection Observer.
- **Meme Details**: Dedicated page for each meme with related content recommendations.
- **Shopping Cart**: Global cart state with persistence, allowing users to add/remove items and adjust quantities.
- **Theme System**: Dark/Light mode toggle persisted in local storage.
- **Performance**: Lazy loading for images using a blur-up effect.

## Feature & Requirement Analysis

| Feature | Requirement | Implementation Details |
| :--- | :--- | :--- |
| **Login** | Mock Login, Validation, Redirect | `LoginPage.tsx` handles form state and validation. `AuthContext` manages global auth state and persists to `localStorage`. `PrivateRoute` protects routes. |
| **Dashboard** | Stats, Top Meme, Navigation | `DashboardPage.tsx` calculates stats from `MemeContext` and `CartContext`. "Meme of the Day" added as a bonus. |
| **Memes Page** | Grid, Filters, Search, Sort | `MemesPage.tsx` uses a responsive grid. `useMemeFilters` hook handles complex filtering logic with `useMemo` for performance. Supports Search, Category, and multiple Sort options. |
| **Infinite Scroll** | Optional Feature | Implemented using `IntersectionObserver` API to load more memes as the user scrolls. |
| **Meme Detail** | Details, Related Memes | `MemeDetailPage.tsx` shows all details. "Related Memes" are calculated by filtering the global meme list by category and randomizing. |
| **Cart** | Global State, Add/Remove, Total | `CartContext` manages state with `useLocalStorage` persistence. `CartPage` displays table with full CRUD operations. |
| **Routing** | Private/Public Routes | `react-router-dom` used with a `PrivateRoute` wrapper component to secure dashboard, memes, and cart pages. |
| **Styling** | Responsive, CSS/Tailwind | Built with **Tailwind CSS** and **Shadcn UI** components. Fully responsive layout (mobile to desktop). |
| **Extra** | Dark Mode, Lazy Loading | `ThemeContext` handles Dark Mode. `BlurImage` component provides a blur-up effect for smooth image loading. |

## Technical Architecture

### Tech Stack
*   **Framework**: React 18 + TypeScript + Vite
*   **Routing**: React Router DOM v6
*   **Styling**: Tailwind CSS + Shadcn UI
*   **State Management**: React Context API
*   **Icons**: Lucide React

### React Patterns & Concepts Used

#### 1. Context API for Global State
*   **Pattern**: `AuthContext`, `CartContext`, `MemeContext`, `ThemeContext`.
*   **Reason**: To avoid "prop drilling" (passing data through many layers of components). Global state like the User, Cart, and Meme Data is needed across many unrelated components (Header, Dashboard, Memes, Cart). Context provides a clean way to share this state.

#### 2. Custom Hooks
*   **Pattern**: `useFetch`, `useLocalStorage`, `useCart`, `useMemeFilters`.
*   **Reason**: To abstract complex logic from UI components.
    *   `useFetch`: Reusable data fetching logic handling loading/error states.
    *   `useLocalStorage`: Reusable logic for synchronizing state with browser storage.
    *   `useMemeFilters`: Separates the complex business logic of filtering and sorting from the `MemesPage` view.

#### 3. Memoization (`useMemo`, `useCallback`)
*   **Pattern**: Used `useMemo` for filtering memes and calculating stats.
*   **Reason**: Performance optimization. Calculating stats or filtering a list of 100 memes on every render would be inefficient. `useMemo` ensures these calculations only rerun when dependencies (like the search query or meme list) change. `useCallback` ensures function references remain stable for children components (like the Intersection Observer).

#### 4. Compound Components & Reusability
*   **Pattern**: Logic split into `MemeCard`, `BlurImage`, `ModeToggle`.
*   **Reason**: Reusability and Separation of Concerns. `MemeCard` encapsulates how a meme looks, making it easy to reuse in the Dashboard, Grid, and Related Memes sections.

#### 5. Lazy Loading & Optical Performance
*   **Pattern**: `BlurImage` component.
*   **Reason**: To improve User Experience (UX). Instead of showing empty space or jagged loading, we show a blurred placeholder or skeleton, making the app feel faster and more polished.

#### 6. Higher-Order Components / Wrappers
*   **Pattern**: `PrivateRoute`.
*   **Reason**: To centrally handle access control logic. Instead of checking `isLoggedIn` in every page file, checking it once in the router wrapper is more secure and maintainable.

### Backend & Data Handling

#### API Interaction
The project uses the **Imgflip API** (`https://api.imgflip.com/get_memes`).
*   **Implementation**: `useFetch` hook retrieves the raw list.
*   **Challenge**: The API returns only `id`, `name`, `url`, `width`, `height`. It **does not** provide `price`, `rating`, or `category`.

#### Data Augmentation & Persistence strategy
Since the backend functionality (saving ratings/prices) is missing from the public API, we implemented a **Mock Backend Layer** on the client side:
1.  **Augmentation**: When memes are fetched, we generate random Ratings, Prices, and Categories.
2.  **Persistence**: To ensure these values don't change every time the user refreshes (which would be confusing), we save this metadata to `localStorage` key `memeMetadata`.
3.  **Synchronization**: On load, we merge the fresh API data with the stored metadata. This simulates a consistent database.

#### Why this approach?
This allows us to fulfill the assignment requirements (filtering by category, sorting by rating) using a simple public API that wouldn't normally support these features, without needing to spin up a real Node.js database backend.

## Installation & Running

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## FAQ / Teacher's Questions

### Q: Why did you choose Context API over Redux or Zustand?
**A:** For an application of this size, Redux would introduce unnecessary boilerplate. The Context API provides sufficient power for managing the Cart and Auth states without adding external heavy dependencies. It demonstrates native React capabilities effectively.

### Q: The API doesn't support filtering or sorting. How is this implemented?
**A:** Correct. The `Imgflip` API is a simple "get all" endpoint. We fetch the data once and then perform all filtering, searching, and sorting **client-side** using `useMemo`. This provides a very snappy user experience since we don't wait for server round-trips when changing filters.

### Q: How are "Related Memes" determined?
**A:** In a real app, this would be a server query. Here, we implement it by filtering the global meme list for items in the same category, excluding the current one, and randomly selecting 3 items from that subset.

### Q: How is the Login system secured?
**A:** Note that this is a **mock** login as per requirements. It validates input length and stores a flag in LocalStorage. In a real production app, we would never store auth status purely in LocalStorage without a valid JWT or session token, but this implementation satisfies the assignment's simulation requirements.

### Q: What explicit performance optimizations did you add?
**A:**
1.  **Lazy Loading**: We created a `BlurImage` component that shows a localized skeleton/blur effect while the high-res image loads.
2.  **Memoization**: We used `useMemo` extensively in `useMemeFilters` to ensure that typing in the search bar doesn't cause unnecessary re-renders of unrelated components.
3.  **Virtualization/Infinite Scroll**: Instead of rendering all 100+ memes at once, we limit the initial render and load more as the user scrolls, reducing initial TTI (Time to Interactive).
