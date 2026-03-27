import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "collection" || hash === "shop") return "shop";
    if (hash === "product") return "product";
    if (hash === "cart") return "cart";
    if (hash === "checkout") return "checkout";
    return "home";
  });

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.name === product.name);
      if (exists) {
        return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, size: product.size || "M" }];
    });
  };

  const updateQuantity = (index, delta) => {
    const newItems = [...cartItems];
    newItems[index].quantity += delta;
    if (newItems[index].quantity < 1) newItems[index].quantity = 1;
    setCartItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "collection" || hash === "shop") setPage("shop");
      else if (hash === "product") setPage("product");
      else if (hash === "cart") setPage("cart");
      else if (hash === "checkout") setPage("checkout");
      else if (hash === "") setPage("home");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const changePage = (newPage) => {
    setPage(newPage);
    if (newPage === "shop") window.location.hash = "collection";
    else if (newPage === "product") window.location.hash = "product";
    else if (newPage === "cart") window.location.hash = "cart";
    else if (newPage === "checkout") window.location.hash = "checkout";
    else window.location.hash = "";
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#fbf9fb",
        color: "#313236",
        minHeight: "100vh",
      }}
    >
      <Navbar activePage={page} setPage={changePage} cartCount={cartCount} />

      {page === "home" && <HomePage setPage={changePage} addToCart={addToCart} />}
      {page === "shop" && <ShopPage setPage={changePage} addToCart={addToCart} />}
      {page === "product" && <ProductPage setPage={changePage} addToCart={addToCart} />}
      {page === "cart" && <CartPage setPage={changePage} cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />}
      {page === "checkout" && <CheckoutPage setPage={changePage} cartItems={cartItems} />}

      <Footer />
    </div>
  );
};


export default App;
