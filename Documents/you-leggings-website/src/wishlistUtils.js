const WISHLIST_STORAGE_KEY = 'youLeggingsWishlist';

export function getStoredWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setStoredWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function toggleWishlist(product) {
  const current = getStoredWishlist();
  const exists = current.find((p) => p.slug === product.slug);
  if (exists) {
    const next = current.filter((p) => p.slug !== product.slug);
    setStoredWishlist(next);
    return false; // Removed
  } else {
    current.push(product);
    setStoredWishlist(current);
    return true; // Added
  }
}

export function isInWishlist(slug) {
  return getStoredWishlist().some((p) => p.slug === slug);
}

export function getWishlistCount() {
  return getStoredWishlist().length;
}
