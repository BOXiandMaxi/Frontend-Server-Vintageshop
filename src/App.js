import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/Context/UserContext";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import ImageSlidermini from "./components/ImageSlidermini/ImageSlidermini";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import About from "./components/About/About";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Shop from "./pages/shop";
// import Login from "./components/Login/Login";
import "./App.css";
// เพิ่มเข้าไป
import SessionLoader from "./components/SessionLoader/SessionLoader";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import ChatWidget from "./components/ChatWidget/ChatWidget";




const Home = () => (
  <div className="content">
    <ImageSlider />
    <ImageSlidermini />
    <Hero />
    <FeaturedProducts isInShopPage={false} />
    <About />
    <ChatWidget />
  </div>
);

const App = () => {
// eslint-disable-next-line no-unused-vars
const [selectedCategory, setSelectedCategory] = useState("");

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
};

  return (
    <UserProvider>
      <Router>
        <SessionLoader>
        <div className="app">
          <Header />
          <Sidebar onCategoryChange={handleCategoryChange} />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/ProductDetail/:id" element={<ProductDetail />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/payment/:oid" element={<PaymentPage />} />
          </Routes>
        </div>
        </SessionLoader>
      </Router>
    </UserProvider>
  );
};

export default App;
