import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ImageGallery.css"; // นำเข้า CSS ใหม่

const ImageGallery = ({ images, onImageClick, selectedImage }) => {
  return (
    <div className="image-gallery-container">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}  // เพิ่มระยะห่างระหว่างภาพ
        slidesPerView={3.20}  // ปรับจำนวนภาพที่แสดงต่อหน้า
        loop={true}
        className="swiper-container"
        breakpoints={{
          1024: { slidesPerView: 3 },  // สำหรับหน้าจอใหญ่ขึ้น (1024px ขึ้นไป)
          768: { slidesPerView: 2 },   // สำหรับหน้าจอขนาดกลาง (768px - 1023px)
          480: { slidesPerView: 1 },   // สำหรับหน้าจอเล็ก (ต่ำกว่า 480px)
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Detail ${index + 1}`}
              className={`swiper-slide-img ${img === selectedImage ? "selected" : ""}`}
              onClick={() => onImageClick(img)} // ส่งภาพที่คลิกไปยังฟังก์ชันที่ได้รับ
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
