import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "collection" || hash === "shop") return "shop";
    if (hash === "product") return "product";
    return "home";
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "collection" || hash === "shop") setPage("shop");
      else if (hash === "product") setPage("product");
      else if (hash === "") setPage("home");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const changePage = (newPage) => {
    setPage(newPage);
    if (newPage === "shop") window.location.hash = "collection";
    else if (newPage === "product") window.location.hash = "product";
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
      <Navbar activePage={page} setPage={changePage} />

      {page === "home" && <HomePage setPage={changePage} />}
      {page === "shop" && <ShopPage setPage={changePage} />}
      {page === "product" && <ProductPage setPage={changePage} />}

      <Footer />
    </div>
  );
};

export default App;
