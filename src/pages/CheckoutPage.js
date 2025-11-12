// src/pages/CheckoutPage.js
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { id } = useParams(); // product id
  const nav = useNavigate();
  const location = useLocation();

  const initialProduct = location.state?.product || null;
  const [product, setProduct] = useState(initialProduct);
  const [form, setForm] = useState({
    full_name: "",
    address: "",
    phone: ""
  });

  // แปลง path เป็น URL เต็ม
  const fixImageUrl = (img) => {
    if (!img) return "https://placehold.co/200x200?text=No+Image";
    return img.startsWith("http")
      ? img
      : `https://vintage-shop-backend.infinityfree.me/item_shop${img}`;
  };

  // โหลดสินค้า
  useEffect(() => {
    if (product) {
      setProduct({
        ...product,
        image: fixImageUrl(product.image),
        gallery: product.gallery?.map(fixImageUrl) || []
      });
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://vintage-shop-backend.infinityfree.me/item_shop/get_product_detail.php?id=${id}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("ไม่พบข้อมูลสินค้า");
        const data = await res.json();

        setProduct({
          ...data,
          image: fixImageUrl(data.image_url),
          gallery: data.gallery?.map(fixImageUrl) || []
        });
      } catch (err) {
        alert("โหลดข้อมูลสินค้าไม่สำเร็จ: " + err.message);
        nav("/");
      }
    };

    fetchProduct();
  }, [id, nav, product]);

  // handle input
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // submit order
  const handleSubmit = async e => {
    e.preventDefault();

    // debug: เช็คข้อมูลก่อนส่ง
    console.log("Submitting order:", {
      product_id: Number(id),
      qty: 1,
      ...form
    });

    try {
      const res = await fetch(
        "https://vintage-shop-backend.infinityfree.me/item_shop/submit_order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            product_id: Number(id),
            qty: 1,
            ...form
          })
        }
      );

      const data = await res.json();
      console.log("Response from backend:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "สั่งซื้อไม่สำเร็จ");
      }

      alert(`สั่งซื้อสำเร็จ! หมายเลขออเดอร์ #${data.order_id}`);
      nav(`/payment/${data.order_id}`);
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  if (!product) return <p className="loading">กำลังโหลดข้อมูลสินค้า…</p>;

  return (
    <section className="checkout-wrapper">
      <h1 className="co-title">ยืนยันการสั่งซื้อ</h1>

      <div className="co-product-card">
        <img
          src={product.image}
          alt={product.name || "Product"}
          className="co-product-img"
        />
        <div className="co-product-info">
          <h2>{product.name}</h2>
          <p className="co-price">{product.price_text || product.price}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="co-form">
        <div className="co-group">
          <label>ชื่อ–นามสกุล</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="เช่น สมชาย ใจดี"
            required
          />
        </div>

        <div className="co-group">
          <label>ที่อยู่จัดส่ง</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="บ้านเลขที่ / หมู่ / ถนน / ตำบล / อำเภอ / จังหวัด / รหัสไปรษณีย์"
            required
          />
        </div>

        <div className="co-group">
          <label>เบอร์โทร</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxx"
            required
          />
        </div>

        <button type="submit" className="co-btn">
          ✔ ยืนยันสั่งซื้อ
        </button>
      </form>
    </section>
  );
}
