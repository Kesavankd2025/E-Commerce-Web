import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import Icon from "./components/Icon";

const App = () => {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "collection" || hash === "shop") return "shop";
    if (hash === "product") return "product";
    if (hash === "login") return "login";
    if (hash === "cart") return "cart";
    if (hash === "wishlist") return "wishlist";
    if (hash === "register") return "register";
    if (hash === "forgot") return "forgot";
    if (hash === "profile") return "profile";
    return "home";
  });

  const [cartItems, setCartItems] = useState([
    { 
      name: "Iris Silk Atelier Scarf", 
      price: "₹15,400", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgQvVSEZa9GQduWEo5NXFqnEa8eOVBt4M1BZKnwXXDfOZoOb_xGlPwfcCW7S7gZo1PkyinElT01tpprDpKKkOg5SRsElUz1ZXS7d8gqgQkkX00579-nYrqPqtzhs6fOURIVRkRzSHYVWGYbzb6awXiXw23GOZRoqbF4VkiaBnzFIBx3oHki1vI6lbunJhzkoX-oHkseZEJxUTbW0c1IN-Z_q1BhSN_TaQxF-5CLlQvRw6O6ZMPQz5X6Q_dvhEONXXRY3RaE2mqjYM",
      size: "One Size",
      quantity: 1
    }
  ]);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "collection" || hash === "shop") setPage("shop");
      else if (hash === "product") setPage("product");
      else if (hash === "login") setPage("login");
      else if (hash === "cart") setPage("cart");
      else if (hash === "wishlist") setPage("wishlist");
      else if (hash === "register") setPage("register");
      else if (hash === "forgot") setPage("forgot");
      else if (hash === "profile") setPage("profile");
      else if (hash === "") setPage("home");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.name === product.name && p.size === product.size);
      if (exists) {
        return prev.map(p => 
          (p.name === product.name && p.size === product.size) 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast({
      title: "Atelier Addition",
      message: `${product.name} joined your collection.`,
      img: product.img
    });
    setTimeout(() => setToast(null), 4000);
  };

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(p => p.name === product.name);
      if (exists) return prev;
      return [...prev, product];
    });
    setToast({
      title: "Wishlist Updated",
      message: `${product.name} saved for later discovery.`,
      img: product.img
    });
    setTimeout(() => setToast(null), 4000);
  };

  const changePage = (newPage) => {
    setPage(newPage);
    if (newPage === "shop") window.location.hash = "collection";
    else if (newPage === "product") window.location.hash = "product";
    else if (newPage === "login") window.location.hash = "login";
    else if (newPage === "cart") window.location.hash = "cart";
    else if (newPage === "wishlist") window.location.hash = "wishlist";
    else if (newPage === "register") window.location.hash = "register";
    else if (newPage === "forgot") window.location.hash = "forgot";
    else if (newPage === "profile") window.location.hash = "profile";
    else window.location.hash = "";
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#fbf9fb",
        color: "#313236",
        minHeight: "100vh",
      }}
    >
      {/* Announcement Banner - Home Only */}
      {page === "home" && (
        <div className="announcement-bar">
          <div className="announcement-track">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="announcement-item">
                <Icon name="local_shipping" style={{ fontSize: 16 }} />
                <span>Complimentary Atelier Delivery on all primary orders above Rs. 2000/-</span>
                <span className="announcement-dot">•</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prime Toast Alert */}
      {toast && (
        <div className="prime-toast">
          <div className="toast-media">
            <img src={toast.img} alt="" />
          </div>
          <div className="toast-content">
            <h4 className="toast-title">{toast.title}</h4>
            <p className="toast-message">{toast.message}</p>
          </div>
          <button className="toast-close" onClick={() => setToast(null)}>
            <Icon name="close" />
          </button>
        </div>
      )}

      {page !== "login" && (
        <Navbar 
          activePage={page} 
          setPage={changePage} 
          cartCount={cartItems.length} 
          hasAnnouncement={page === "home"} 
        />
      )}
      
      {page === "home" && <HomePage setPage={changePage} />}
      {page === "shop" && <ShopPage setPage={changePage} />}
      {page === "product" && (
        <ProductPage 
          setPage={changePage} 
          addToCart={addToCart} 
          addToWishlist={addToWishlist}
        />
      )}
      {page === "login" && <LoginPage setPage={changePage} onLogin={(userData) => setUser(userData)} />}
      {page === "register" && <RegisterPage setPage={changePage} />}
      {page === "forgot" && <ForgotPasswordPage setPage={changePage} />}
      {page === "profile" && <ProfilePage setPage={changePage} user={user} onUpdateUser={setUser} />}
      {page === "cart" && (
        <CartPage 
          setPage={changePage} 
          cartItems={cartItems}
          updateQuantity={(idx, delta) => {
            const next = [...cartItems];
            next[idx].quantity += delta;
            setCartItems(next);
          }}
          removeItem={(idx) => {
            setCartItems(cartItems.filter((_, i) => i !== idx));
          }}
        />
      )}

      {page === "wishlist" && (
        <WishlistPage 
          setPage={changePage} 
          wishlistItems={wishlistItems}
          removeFromWishlist={(idx) => {
            setWishlistItems(wishlistItems.filter((_, i) => i !== idx));
          }}
          moveToCart={(idx) => {
            const item = wishlistItems[idx];
            addToCart({ ...item, quantity: 1 });
            setWishlistItems(wishlistItems.filter((_, i) => i !== idx));
          }}
        />
      )}

      {page !== "login" && <Footer />}
    </div>
  );
};

export default App;
