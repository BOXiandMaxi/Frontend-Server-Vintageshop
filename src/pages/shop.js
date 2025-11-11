// import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Sidebar from "../components/Sidebar/Sidebar";
import "./shop.css";

const Shop = () => {
  const { category } = useParams();  // ใช้ useParams เพื่อลาก category จาก URL

  return (
    <div className="shop-container">
      <Sidebar />
      <FeaturedProducts category={category} isInShopPage={true} />  {/* ส่ง category ที่ได้จาก URL ไปให้ FeaturedProducts */}
    </div>
  );
};

export default Shop;
