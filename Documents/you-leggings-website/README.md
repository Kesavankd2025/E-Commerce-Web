# You Leggings — React/Vite App

## Project Structure

```
you-leggings/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── my-account.html     ← redirects to /?page=my-account
└── src/
    ├── main.jsx
    ├── App.jsx              ← client-side router
    ├── style.css            ← exact copy of original style.css
    ├── data.js              ← all product data, filter metadata
    ├── cartUtils.js         ← localStorage cart helpers
    ├── productUtils.js      ← product profile builder
    └── components/
        ├── TopBar.jsx
        ├── Header.jsx
        ├── Footer.jsx
        ├── Toast.jsx
        ├── HomePage.jsx
        ├── AboutPage.jsx
        ├── ShopPage.jsx
        ├── ProductPage.jsx
        ├── NewArrivalsPage.jsx
        ├── BlogPage.jsx
        ├── ContactPage.jsx
        ├── CartPage.jsx
        ├── LoginPage.jsx
        └── MyAccountPage.jsx
```

## Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Copy your assets** into `public/` (images, videos):
   - `public/images/` — all image folders
   - `public/LEGGINGS.mp4`, `public/LEGGINGS1.mp4`, `public/Untitled.mp4`

3. **Start dev server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Notes

- **CSS**: `src/style.css` is an exact copy of the original — zero changes.
- **Routing**: URL query params (`?page=shop`, `?page=product&product=cobalt-core-legging`) work identically to the original.
- **Cart**: Uses `localStorage` key `youLeggingsCart` — same as original.
- **Auth**: OTP login simulation with static OTP `123456` — same as original.
- **my-account.html**: The original separate HTML file is replaced by `public/my-account.html` which redirects to `/?page=my-account`.
- **Images**: Place all images exactly as referenced in the original (same relative paths, now relative to `public/`).
- **Videos**: Place `LEGGINGS.mp4` etc. in `public/`.
