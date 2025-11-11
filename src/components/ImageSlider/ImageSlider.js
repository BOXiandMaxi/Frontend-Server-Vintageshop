import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css"; // สำหรับใส่สไตล์เพิ่มเติม

const ImageSlider = () => {
  const settings = {
    dots: true,            // แสดงจุดด้านล่าง
    infinite: true,        // วนลูปได้
    speed: 500,            // ความเร็วในการเลื่อน
    slidesToShow: 1,       // แสดงทีละ 1 รูป
    slidesToScroll: 1,     // เลื่อนทีละ 1 รูป
    autoplay: true,        // ให้เลื่อนอัตโนมัติ
    autoplaySpeed: 3000,   // ทุก ๆ 3 วินาที
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="/Imagetour/pic1.jpg" alt="Banner 1" />
        </div>
        <div>
          <img src="/Imagetour/slider2.webp" alt="Banner 2" />
        </div>
        <div>
          <img src="/Imagetour/slider3.webp" alt="Banner 3" />
        </div>
        <div>
          <img src="/Imagetour/slider4.jpg" alt="Banner 4" />
        </div>
        <div>
          <img src="/Imagetour/pic5.webp" alt="Banner 5" />
        </div>
        <div>
          <img src="/Imagetour/slider6.jpg" alt="Banner 6" />
        </div>
        <div>
          <img src="/Imagetour/slider7.jpg" alt="Banner 7" />
        </div>
        <div>
          <img src="/Imagetour/slider8.jpg" alt="Banner 8" />
        </div>
        <div>
          <img src="/Imagetour/slider9.jpg" alt="Banner 9" />
        </div>
        <div>
          <img src="/Imagetour/slider10.jpg" alt="Banner 10" />
        </div>
        <div>
          <img src="/Imagetour/slider11.jpg" alt="Banner 11" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
