import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";          // ← เพิ่มไฟล์สไตล์

export default function CheckoutPage() {
  const { id } = useParams();
  const nav    = useNavigate();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    address:   "",
    phone:     ""
  });

  /* ── โหลดสินค้า ─────────────────────────── */
  useEffect(() => {
    fetch(`https://vintage-shop-backend.infinityfree.me/item_shop/get_product_detail.php?id=${id}`)
      .then(r => {
        if (!r.ok) throw new Error("ไม่พบข้อมูลสินค้า");
        return r.json();
      })
      .then(setProduct)
      .catch(err => {
        alert("โหลดข้อมูลสินค้าไม่สำเร็จ: " + err.message);
        nav("/");
      });
  }, [id, nav]);

  /* ── handle input ───────────────────────── */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ── ส่งคำสั่งซื้อ ─────────────────────── */
  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await fetch("https://vintage-shop-backend.infinityfree.me/item_shop/submit_order.php",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          product_id: Number(id),
          qty: 1,                       // ส่งค่า 1 ตายตัว
          ...form
        })
      });
      const data = await res.json();
      if(!res.ok || !data.success){
        throw new Error(data.error || "สั่งซื้อไม่สำเร็จ");
      }
      // ===== ใส่ 2 บรรทัดนี้ =====
      alert(`สั่งซื้อสำเร็จ! หมายเลขออเดอร์ #${data.order_id}`);
      nav(`/payment/${data.order_id}`);
    }catch(err){
      alert("เกิดข้อผิดพลาด: "+err.message);
    }
  };

  if (!product) return <p className="loading">กำลังโหลดข้อมูลสินค้า…</p>;

  return (
    <section className="checkout-wrapper">
      <h1 className="co-title">ยืนยันการสั่งซื้อ</h1>

      <div className="co-product-card">
      <img
      src={product.image_url.startsWith("/")
        ? product.image_url               // /imagestshirt/xxx.jpg  ⇒ ใช้ dev-server 3000
        : `https://frontend-server-vintageshop-v776.vercel.app/${product.image_url}`}
          alt={product.name}
          className="co-product-img"     /* ← ใส่ class ตรงกับ CSS */
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