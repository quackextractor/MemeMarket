# Final Project: MEME MARKETPLACE PRO

**Goal:** Build a fully functional React application where users can:

* View meme images
* Filter and search memes
* View meme details
* Add memes to the cart
* Manage the cart (using Context + custom hooks)
* Work with an API
* Use React Router with private routes
* Style the application
* Create a clear dashboard

The application must be built in **React**, using **React Router** and any component library for UI.

---

## 1. Login System (Mock)

**Requirements:**

* **/login page**
* **Form fields:**

  * Username (min. 3 characters)
  * Password (min. 5 characters)
* Input validation
* **Login action:**

  * If valid → save to `localStorage` as `{ username: "...", loggedIn: true }`
  * Redirect to `/dashboard`

**Private routes:**

* `/login` is the only public page
* All other pages are protected:

  * `/dashboard`
  * `/memes`
  * `/memes/:id`
  * `/cart`

*Protect routes using a wrapper component: `if (!user.loggedIn) redirect to /login`.*

---

## 2. Dashboard – Meme Admin Panel

**Dashboard must display after login:**

* Number of meme images (from API)
* Number of categories (derived from data)
* Number of items in the cart (from context)
* Most popular meme (by rating)
* “Go to Memes” button → `/memes`

**Data:**

* Memes come from: [https://api.imgflip.com/get_memes](https://api.imgflip.com/get_memes)
* API returns: `id`, `name`, `url`, `width`, `height`, `box_count`
* Must add:

  * Random rating (1–5)
  * Random category from: `["animals", "celebrities", "gaming", "school", "random"]`

---

## 3. Memes Page – `/memes`

**Data Display:**

* Fetch memes using `useFetch()` or `getMemes()` service
* Display in a grid (3–5 columns depending on width)
* Each meme must show:

  * Image
  * Title
  * Category
  * Rating (1–5 stars)
  * Detail button
  * Add to cart button

**Filtering:**

* Filters must work together:

  1. **Search by name** (case-insensitive, debounce ≥ 300ms)
  2. **Filter by category:** All / animals / gaming / school / etc.
  3. **Sort by:** Name (A–Z) / Rating (descending) / Image size (width × height)

**Loading & Error States:**

* Loading → skeleton loader (≥3 gray cards)
* Error → “Failed to load memes”

---

## 4. Meme Detail – `/memes/:id`

**Detail page must show:**

* Large image
* Meme name
* Rating (stars)
* Category
* Dimensions (width × height)
* Add to cart button
* Back to list button
* Related memes → 3 other memes from the same category

**Advanced requirement:**

* Must not rely only on list data
* Must fetch data by ID from API or fallback to global state/context

---

## 5. Cart – Global State via Context

**Requirements:**

* Use **React Context**
* Custom hook `useCart()`
* Save cart in `localStorage`

**Cart Functions:**

* `addItem(meme)`
* `removeItem(id)`
* `decreaseCount(id)`
* `clearCart()`
* `getTotalPrice()` → `price = rating * 25`

**Cart Page (`/cart`) must display:**

* List of items
* Image, name, rating, quantity
* Buttons: + / – / Remove
* Total price

---

## 6. Custom Hooks

**Create at least three hooks, e.g.:**

1. `useFetch(url)` → returns `{ data, loading, error }`
2. `useLocalStorage(key, initial)` → store objects
3. `useCart()` → manage Context API

---

## 7. Routing – React Router

**Pages:**

* `/login` (public)
* `/dashboard` (private)
* `/memes` (private)
* `/memes/:id` (private)
* `/cart` (private)
* `/*` → NotFound page

---

## 8. Styling

**Requirements:**

* Tailwind or CSS Modules
* Responsive layout:

  * Mobile: 1 column
  * Tablet: 2 columns
  * Desktop: ≥ 4 columns

---

## Additional Features: Not optional

* Light/Dark mode toggle (store in localStorage)
* Infinite scroll for memes
* Random “Meme of the Day” on dashboard
* Animations (Framer Motion)
* Lazy loading images
* Form validation via Zod