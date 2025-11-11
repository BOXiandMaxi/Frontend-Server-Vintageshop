import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlidermini.css"

const ImageSlidermini = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,    // แสดง 10 รูปพร้อมกัน
    slidesToScroll: 1,   // เลื่อนทีละ 1 รูป
    autoplay: true,
    autoplaySpeed: 2000, // เลื่อนอัตโนมัติทุก 2 วิ
    arrows: false,
  };


  return (
    <div className="slidermini-container">
      <Slider {...settings}>
        <div>
          <img src ="/Imagebandlogo/redhot_1.png" alt = "band1"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/nirvana_2.png" alt = "band2"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/queen_3.png" alt = "band3"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/meta_4.png" alt = "band4"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/oasis_5.png" alt = "band5"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/kiss_6.png" alt = "band6"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/gun_7.png" alt = "band7"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/eminem_8.png" alt = "band8"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/greenday_9.png" alt = "band9"/>
        </div>
        <div>
          <img src ="/Imagebandlogo/acdc_10.png" alt = "band10"/>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlidermini