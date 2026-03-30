import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const STORAGE_KEY = 'youLeggingsWishlist';

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load wishlist", err);
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.slug === product.slug);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (slug) => {
    setWishlist((prev) => prev.filter((item) => item.slug !== slug));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.slug === product.slug);
    if (exists) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (slug) => {
    return wishlist.some((item) => item.slug === slug);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      toggleWishlist, 
      isInWishlist,
      wishlistCount: wishlist.length 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
