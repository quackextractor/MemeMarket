# Verification User Journey

1.  **Login System**
    -   [ ] Navigate to `/login`.
    -   [ ] Attempt login with short username ("ab") -> Expect error "Username must be at least 3 characters".
    -   [ ] Attempt login with short password ("123") -> Expect error "Password must be at least 5 characters".
    -   [ ] Login with valid credentials ("user", "password") -> Expect redirect to `/dashboard`.
    -   [ ] Verify `meme_market_user` in localStorage.

2.  **Dashboard**
    -   [ ] Verify "Meme Statistics" are displayed (Total Memes, Categories, etc.).
    -   [ ] Verify "Most Popular Meme" section.
    -   [ ] Verify "Meme of the Day" section.
    -   [ ] Toggle **Dark Mode** -> Verify background changes.
    -   [ ] Reload page -> Verify Theme and Login state persist.

3.  **Memes Page**
    -   [ ] Click "Go to Memes".
    -   [ ] Verify Memes Grid loads.
    -   [ ] Verify **Animations** (staggered fade-in).
    -   [ ] Hover over a card -> Verify scale animation.
    -   [ ] Search for a meme (e.g., "Cat") -> Verify list filters.
    -   [ ] Filter by Category (e.g., "gaming") -> Verify list filters.
    -   [ ] Sort by "Image Size (Small-Large)" -> Verify order.
    -   [ ] Check `loading="lazy"` on images (via DevTools or visual check).

4.  **Meme Detail & Cart**
    -   [ ] Click on a Meme.
    -   [ ] Verify Detail Page (Image, Info, Related Memes).
    -   [ ] Click "Add to Cart" -> Verify button text changes to "Added!".
    -   [ ] Click "Go to Cart" (or Cart icon).
    -   [ ] Verify Item in Cart.
    -   [ ] Increase quantity (+).
    -   [ ] Check Total Price calculation.
    -   [ ] Remove item.
    -   [ ] Reload -> Verify Cart persistence.

5.  **Logout**
    -   [ ] Click Logout.
    -   [ ] Expect redirect to `/login`.
    -   [ ] Try to access `/dashboard` -> Expect redirect to `/login`.
