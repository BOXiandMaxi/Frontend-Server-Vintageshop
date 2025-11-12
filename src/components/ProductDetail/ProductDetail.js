import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "../ImageGallery/ImageGallery"; // นำเข้า ImageGallery
import "./ProductDetail.css"; // ใช้สไตล์ของตัวเอง
import ReactImageMagnify from 'react-image-magnify';


const products = {
  1: {
    name: "Nirvana Come Ass You Are",
    image: "/imagestshirt/Nirvana-come-ass-you-are.jpg", // รูปหลัก
    price: "15,500 THB (USD 460)",
    details:
      "Come as You Are เป็นเพลงของวง Nirvana เขียนโดย Kurt Cobain จากอัลบั้ม Nevermind วางจำหน่ายในเดือนมีนาคม 1992 และเป็นซิงเกิลที่ 2 ของอัลบั้ม เพลงนี้ติดท็อป 40 บน Billboard Hot 100 อันดับที่ 32 และติดท็อป 10 ใน UK Singles Chart อันดับที่ 9 รวมถึงขึ้นท็อป 10 ใน 8 ประเทศ.",
    features: [
      "Size: 23x30 XL",
      "Tag: Giant by Teejay",
      "Detail: ไม่พอเจอรูตามตัว สีเสื้อดรอปออกเฟด",
    ],
    gallery: [
      "/DetailNirvana/nir1.jpg",
      "/DetailNirvana/nir2.jpg",
      "/DetailNirvana/nir3.jpg",
      "/DetailNirvana/nir4.jpg",
      "/DetailNirvana/nir5.jpg",
    ],
  },
  2: {
    name: "Nirvana Silver",
    image: "/imagestshirt/nirvanasilver.jpg", // รูปหลัก
    price: "55,000THB (USD 460)",
    details:
      "Sliverเป็นเพลงของวง Nirvana เขียนโดย Kurt Cobain และ Krist Novoselic วางจำหน่ายครั้งแรกในรูปแบบซิงเกิลโดย Sub Pop ในสหรัฐอเมริกาเดือนกันยายน 1990 และโดย Tupelo ในอังกฤษเดือนมกราคม 1991 ต่อมาเพลงนี้ถูกรวมในอัลบั้มรวมเพลง Incesticide ในเดือนธันวาคม 1992 และมีมิวสิควิดีโอใหม่ที่กำกับโดย Kevin Kerslake เผยแพร่ในเดือนพฤษภาคม 1993.",
    features: [
      "Size: 23x30 XL",
      "Tag: Giant by Teejay",
      "Detail: ไม่พอเจอรูตามตัว สีเสื้อดรอปออกเฟด",
    ],
    gallery: [
      "/DetailNirvana/Silver/1nirvanasilver.jpg",
      "/DetailNirvana/Silver/2nirvanasilver.jpg",
      "/DetailNirvana/Silver/3nirvanasilver.jpg",
      "/DetailNirvana/Silver/4nirvanasilver.jpg",
    ],
  },
/////////////////////////////////////////////////////////////////nirvana//////////////////////////////////////////////////////////////////

  3: {
    name: "QueenNews of the World",
    image: "/imagestshirt/Queen.jpg", // รูปหลัก
    price: "8,000 THB (USD 1,300)",
    details:
      "News of the Worldเป็นอัลบั้มสตูดิโอชุดที่ 6 ของวงดนตรีร็อกสัญชาติ อังกฤษ Queenออกจำหน่ายเมื่อวันที่ 28 ตุลาคม 1977 โดยค่ายเพลง EMI Recordsในสหราชอาณาจักร และค่ายเพลง Elektra Recordsในสหรัฐอเมริกา News of the Worldเป็นอัลบั้มชุดที่ 2 ของวงที่บันทึกเสียงที่ Sarm and Wessex Sound Studiosในลอนดอน โดยมี Mike Stone เป็นวิศวกรเสียง และวงและ Stone ร่วมกันผลิต",
    features: [
      "Size: 24x30 XL",
      "Tag: U.S T'S 707",
      "Detial: ไม่มีตำหนิสีเสื้อดำๆ ใส่สวย",
      
    ],
    gallery: [
      "/DetailQueen/Queennewoftheworld/Queennew2.1.jpg",
      "/DetailQueen/Queennewoftheworld/Queennew2.2.jpg",
      "/DetailQueen/Queennewoftheworld/Queennew2.3.jpg",
      "/DetailQueen/Queennewoftheworld/Queennew2.4.jpg",
      "/DetailQueen/Queennewoftheworld/Queennew2.5.jpg",
    ],
  },
////////////////////////////////////////////////////////////////Queen/////////////////////////////////////////////////////////////////////
  4:{
    name: "Green Day Dookie",
    image: "/imagestshirt/Green-Day.jpg",
    price: "18,500 THB (USD 549)",
    details: 
    "Dookie เป็นอัลบั้มสตูดิโอชุดที่ 3 ของวง Green Day วางจำหน่ายเมื่อวันที่ 1 กุมภาพันธ์ 1994 โดย Reprise Records และเป็นการทำงานร่วมกับโปรดิวเซอร์ Rob Cavallo เพลงส่วนใหญ่เขียนโดย Billie Joe Armstrong โดยมีธีมเกี่ยวกับความเบื่อหน่าย ความวิตกกังวล ความสัมพันธ์ และเรื่องเพศ อัลบั้มนี้รวมถึงซิงเกิลฮิต เช่น Longview, Basket Case, Welcome to Paradise (เวอร์ชันใหม่), และ When I Come AroundDookie ถือเป็นอัลบั้มที่สำคัญในยุค 90 และเป็นหนึ่งในอัลบั้มพังก์ร็อกที่ยิ่งใหญ่ที่สุด ช่วยให้ Green Day โด่งดังและนำแนวเพลงร็อคที่มีชีวิตชีวามากขึ้นมาสู่กระแสหลัก .",
    features: [
      "Size: 23x30.5 XL",
      "Tag: Brockum",
      "Detail: สีเสื้อดรอปประมาณ 1 เบอร์ มี1รูมด ตัวนี้ได้หลังทัวร์ กำลังแรงช่วงนี้",
    ],
    gallery:[
      "/DetailGreen-Day/Greendaydookie3/Green-Daydookie3.1.jpg",
      "/DetailGreen-Day/Greendaydookie3/Green-Daydookie3.2.jpg",
      "/DetailGreen-Day/Greendaydookie3/Green-Daydookie3.3.jpg",
      "/DetailGreen-Day/Greendaydookie3/Green-Daydookie3.4.jpg",
      "/DetailGreen-Day/Greendaydookie3/Green-Daydookie3.5.jpg",
      "/DetailGreen-Day/Greendaydookie3/Green-Daydookie3.6.jpg",
    ],
  },

  5:{
    name: "Green Day Kerplunk",
    image: "/imagestshirt/Green-Day-kerplunk-ID3.1.jpg",
    price: "12,000 THB (USD 347)",
    details: 
    "Kerplunk! เป็นอัลบั้มสตูดิโอชุดที่ 2 ของวง Green Day วางจำหน่ายเมื่อวันที่ 17 ธันวาคม 1991 โดย Lookout! Records หลังจากทัวร์โปรโมตอัลบั้มแรก 39/Smooth (1990) มือกลอง John Kiffmeyer ออกจากวงและถูกแทนที่ด้วย Tré Cool อดีตสมาชิกวง Lookouts ช่วงเวลานั้น Green Day ได้ขยายกลุ่มผู้ฟังไปยังวัยรุ่นในเมืองชานเมือง วงได้บันทึกอัลบั้มที่ Art of Ears Studios ในซานฟรานซิสโกกับโปรดิวเซอร์ Andy Ernst โดยเริ่มบันทึกในเดือนพฤษภาคม 1991 และเสร็จสมบูรณ์ในเดือนกันยายน 1991 ",
    features: [
      "Size: 23x30 XL",
      "Tag: Brockum",
      "Detail: The condition of the shirt is still good. The shirt color is still white. Not enough to find holes in the body 9.5/10",
    ],
    gallery:[
      "/DetailGreen-Day/Greendaykerplunk3.1/Green-Day-kerplunk-3.1.jpg",
      "/DetailGreen-Day/Greendaykerplunk3.1/Green-Day-kerplunk-3.2.jpg",
      "/DetailGreen-Day/Greendaykerplunk3.1/Green-Day-kerplunk-3.3.jpg",
      "/DetailGreen-Day/Greendaykerplunk3.1/Green-Day-kerplunk-3.4.jpg",
      "/DetailGreen-Day/Greendaykerplunk3.1/Green-Day-kerplunk-3.5.jpg",
      "/DetailGreen-Day/Greendaykerplunk3.1/Green-Day-kerplunk-3.6.jpg",
    ],
  },
////////////////////////////////////////////////////////////////Green Day/////////////////////////////////////////////////////////////////////
  6:{
    name: "Silverchair",
    image: "/imagestshirt/silverchair.jpg",
    price: "5,000 THB (USD 147)",
    details: 
    "Freak Show is the second studio album by Australian rock band Silverchair. It was released on 4 February 1997 by record labels Murmur and Epic. It was nominated for the 1997 ARIA Music Award for Best Group, but lost to Savage Garden.",
    features: [
      "Size: 23x30 XL",
      "Tag: WILD OATS",
      "Detail: 1ชุน ตรงสายต้องเข้าแล้ว ก่อนส่งซักให้ครับ",
    ],
    gallery:[
      "/DetailSilverchair/silverchairfreak4/silverchairid4.1.jpg",
      "/DetailSilverchair/silverchairfreak4/silverchairid4.2.jpg",
      "/DetailSilverchair/silverchairfreak4/silverchairid4.3.jpg",
      "/DetailSilverchair/silverchairfreak4/silverchairid4.4.jpg",
    ],
  },

  7:{
    name: "SilverchairRed",
    image: "/imagestshirt/silverchairred.jpg",
    price: "6,500 THB (USD 191)",
    details: 
    "อัลบั้ม Freak Show โปรดิวซ์โดย Nick Launay (เคยทำงานกับ Midnight Oil, Models, The Birthday Party)ในเดือนธันวาคม 1996 มือกลอง Ben Gillies กล่าวว่าการทำอัลบั้มนี้ สนุกกว่าทำ Frogstompส่วนมือเบส Chris Joannou กล่าวในเดือนกุมภาพันธ์ 1997 ว่าพวกเขาอยากลองทำอะไรที่ต่างออกไป แม้สุดท้ายมันจะเกิดขึ้นอย่างเป็นธรรมชาติ และเขาชอบ Freak Show มากกว่า Frogstomp เพราะเนื้อเพลงกับดนตรีดีกว่า และเสียงเบสก็ดังขึ้นด้วย ซึ่งเขาพอใจมาก",
    features: [
      "Size: 24x31 XL",
      "Tag: WILD OATS",
      "Detail: ไม่มีตำหนิขาดข้างรู สภาพสวยน่าเก็บ",
    ],
    gallery:[
      "/DetailSilverchair/silverchairfreak4.1/silverchairred4.1.1.jpg",
      "/DetailSilverchair/silverchairfreak4.1/silverchairred4.1.2.jpg",
      "/DetailSilverchair/silverchairfreak4.1/silverchairred4.1.3.jpg",
      "/DetailSilverchair/silverchairfreak4.1/silverchairred4.1.4.jpg",
      "/DetailSilverchair/silverchairfreak4.1/silverchairred4.1.5.jpg",
    ],
  },
////////////////////////////////////////////////////////////////Silverchair/////////////////////////////////////////////////////////////////////

  8:{
    name: "Alice in Chains",
    image: "/imagestshirt/AliceinChainsid1.jpg",
    price: "25,000 THB (USD 724)",
    details: 
    "Alice in Chains (AIC) เป็นวงร็อกจากซีแอตเทิล ก่อตั้งในปี 1987 ปัจจุบันประกอบด้วย Jerry Cantrell, William DuVall, Mike Inez และ Sean Kinney อดีตสมาชิกคือ Layne Staley และ Mike Starr ชื่อวงมาจากวงเก่าของ Staley ชื่อ Alice N' Chains วงมีแนวเสียงที่ผสมระหว่างกรันจ์และเฮฟวีเมทัล โดดเด่นด้วยเสียงร้องประสานของสมาชิก เช่น Staley กับ Cantrell และภายหลังคือ Cantrell กับ DuVall",
    features: [
      "Size: 23x30 XL",
      "Tag: Hanes",
      "Detail: There are no flaws, holes, the color of the shirt has faded.",
    ],
    gallery:[
      "/DetailAlice-in-Chains/AliceinChainsid5/AliceinChainsid5.1.jpg",
      "/DetailAlice-in-Chains/AliceinChainsid5/AliceinChainsid5.2.jpg",
      "/DetailAlice-in-Chains/AliceinChainsid5/AliceinChainsid5.3.jpg",
      "/DetailAlice-in-Chains/AliceinChainsid5/AliceinChainsid5.4.jpg",
      "/DetailAlice-in-Chains/AliceinChainsid5/AliceinChainsid5.5.jpg",
      "/DetailAlice-in-Chains/AliceinChainsid5/AliceinChainsid5.6.jpg",
    ],
  },
////////////////////////////////////////////////////////////////Alice in Chains/////////////////////////////////////////////////////////////////////

  9:{
    name: "Eminem Shady",
    image: "/imagestshirt/Eminemshadyid6.jpg",
    price: "18,000 THB (USD 521)",
    details: 
    "The Slim Shady LP เป็นอัลบั้มสตูดิโอชุดที่ 2 ของ Eminem วางจำหน่ายเมื่อวันที่ 23 กุมภาพันธ์ 1999 ผ่าน Aftermath, WEB Entertainment และ Interscope Records ผลิตโดย Eminem, Dr. Dre และ Bass Brothers มีสไตล์เพลงแบบ West Coast hip-hop, G-funk และ horrorcore เนื้อเพลงส่วนใหญ่เล่าผ่านตัวตน Slim Shady ซึ่งเป็นอัตตาลวงของ Eminem ที่เคยเปิดตัวใน EP ปี 1997 และจบบทบาทในอัลบั้มปี 2024 เพลงในอัลบั้มมีความรุนแรงแบบการ์ตูน ใช้คำหยาบมาก และได้รับแรงบันดาลใจจากหนังสยองขวัญเพื่อความบันเทิง พร้อมทั้งสะท้อนปัญหาความยากจนที่เขาเคยเผชิญ.",
    features: [
      "Size: 23x28 XL",
      "Tag: 100 cotton",
      "Detail: There are no complaints about holes, color fade, or fading.",
    ],
    gallery:[
      "/DetailEminem/eminemshadyid6/Eminemshadyid6.1.jpg",
      "/DetailEminem/eminemshadyid6/Eminemshadyid6.2.jpg",
      "/DetailEminem/eminemshadyid6/Eminemshadyid6.3.jpg",
      "/DetailEminem/eminemshadyid6/Eminemshadyid6.4.jpg",
      "/DetailEminem/eminemshadyid6/Eminemshadyid6.5.jpg",
      "/DetailEminem/eminemshadyid6/Eminemshadyid6.6.jpg",
    ],
  },
////////////////////////////////////////////////////////////////Eminem/////////////////////////////////////////////////////////////////////
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();  // สร้างตัว navigate สำหรับเปลี่ยนหน้า
  const product = products[id];
  const [selectedImage, setSelectedImage] = useState(product?.image || ""); 

  if (!product) return <p>Product not found.</p>;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // ฟังก์ชันกดปุ่ม ซื้อเลย ให้ไปหน้า /checkout/:id
  const handleBuyNow = () => {
    navigate(`/checkout/${id}`, { state: { product } });
  };

  return (
    <div className="product-detail-container">
      
      <div className="product-detail-main">
        <div className="product-image-container">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: false,
                width: 400,
                height: 500,
                src: selectedImage,
              },
              largeImage: {
                src: selectedImage,
                width: 800,
                height: 1000,
              },
              enlargedImagePosition: 'over',
              lensStyle: {
                backgroundColor: 'rgba(0,0,0,.3)',
                border: '1px solid #ccc',
                borderRadius: '50%',
              },
              enlargedImageContainerStyle: { zIndex: 9 },
              style: {
                cursor: 'zoom-in',
              },
            }}
          />
          <h2 className="add-text">Add a Picture</h2>
          <ImageGallery
            images={product.gallery}
            onImageClick={handleImageClick}
            selectedImage={selectedImage}
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>History ProDuct Vintage</h2>
          <p>{product.details}</p>

          <h3>DetailProDuct:</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="price-text">฿{product.price}</p>

          {/* ปุ่ม "ซื้อเลย" เพิ่ม onClick */}
          <button className="add-button" onClick={handleBuyNow}>ซื้อเลย</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;