// src/pages/PaymentPage.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PaymentPage.css";

export default function PaymentPage() {
  const { oid } = useParams();                 //  oid = order_id

  /* ---------- state ---------- */
  const [order,     setOrder]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [err,       setErr]       = useState(null);

  const [slip,      setSlip]      = useState(null);   // ไฟล์สลิป
  const [uploadMsg, setMsg]       = useState("");     // ข้อความหลังอัปโหลด

  /* ---------- โหลดข้อมูลคำสั่งซื้อ ---------- */
  useEffect(() => {
    fetch(`https://vintage-shop-backend.infinityfree.me/item_shop/get_order.php?id=${oid}`)
      .then(r => {
        if (!r.ok) throw new Error("ไม่พบคำสั่งซื้อ");
        return r.json();
      })
      .then(data => { setOrder(data); setLoading(false); })
      .catch(e => { setErr(e.message); setLoading(false); });
  }, [oid]);

  /* ---------- อัปโหลดสลิป ---------- */
  const handleUpload = async e => {
    e.preventDefault();
    if (!slip) return;

    const fd = new FormData();
    fd.append("order_id", order.id);
    fd.append("slip",     slip);

    const res  = await fetch("https://vintage-shop-backend.infinityfree.me/item_shop/upload_slip.php",{
      method:"POST",
      body: fd
    });
    const data = await res.json();

    if (data.success){
      setMsg("✔ ส่งสลิปเรียบร้อย! กรุณารอการตรวจสอบ");
      setOrder({ ...order, pay_status:"waiting_verify", slip_path:data.path });
    }else{
      setMsg("ส่งสลิปไม่สำเร็จ");
    }
  };

  /* ---------- UI เงื่อนไข ---------- */
  if (loading) return <p className="pay-loading">กำลังโหลด…</p>;
  if (err)     return <p className="pay-error">{err}</p>;

  return (
    <div className="pay-page">
      <main className="pay-container">

        {/* -------- header -------- */}
        <header className="pay-head">
          <img src="/banklogo/icons/sssss.png" alt="" className="pay-lock"/>
          <h1>ยืนยันการชำระเงิน</h1>
          <p className="pay-sub">
            กรุณาตรวจสอบยอดและโอนเงินตามรายละเอียดด้านล่าง
          </p>
        </header>

        {/* -------- สรุปออเดอร์ -------- */}
        <section className="pay-summary">
          <h2>ข้อมูลคำสั่งซื้อ</h2>
          <div className="pay-order-grid">
            <span>เลขที่คำสั่งซื้อ :</span> <b>#{order.id}</b>
            <span>สินค้า :</span>             <span>{order.product_name}</span>
            <span>จำนวน :</span>              <span>{order.qty}</span>
            <span>ยอดชำระ :</span>
            <span className="pay-amount">
              {Number(order.total).toLocaleString()} ฿
            </span>
          </div>
        </section>

        {/* -------- ช่องทางชำระเงิน -------- */}
        <section className="pay-bank">
          <h2>ช่องทางชำระเงิน</h2>

          {/* รูปบัญชีเต็มใบ */}
          <img
            src="/banklogo/Bank_logo.jpg"
            alt="รายละเอียดบัญชี"
            className="bank-fullimg"
          />

          <p className="pay-or">หรือสแกน QR เพื่อชำระทันที</p>
          <img
            src="/banklogo/Qr_logo.jpg"
            alt="QR PromptPay"
            className="pay-qr"
          />

          {/* -------- ฟอร์มอัปโหลดสลิป -------- */}
          {order.pay_status === "unpaid" && (
            <form onSubmit={handleUpload} className="pay-slip-form">
              <input
                type="file"
                accept="image/*"
                onChange={e => setSlip(e.target.files[0])}
                required
              />
              <button type="submit" className="btn-upload">ส่งสลิป</button>
            </form>
          )}

          {!!uploadMsg && <p className="pay-msg">{uploadMsg}</p>}

          {order.pay_status === "waiting_verify" && (
            <p className="pay-msg">📥 ร้านได้รับสลิปแล้ว – กรุณารอการตรวจสอบ</p>
          )}
          {order.pay_status === "paid" && (
            <p className="pay-msg ok">✅ ร้านยืนยันการชำระเงินแล้ว ขอบคุณค่ะ!</p>
          )}
        </section>

        {/* -------- footer -------- */}
        <footer className="pay-footer">
          หลังโอนเงิน กรุณาเก็บสลิปไว้เป็นหลักฐาน&nbsp;
          หากมีคำถามติดต่อ&nbsp;
          <a href="tel:0980136166">098 - 013 - 6166</a>
        </footer>
            
      </main>
    </div>
  );
}
