import Slider from "react-slick";
import banner1 from '@/assets/banner-1.png'
import banner2 from '@/assets/banner-2.png'
import banner3 from '@/assets/banner-3.png'
import Image from "next/image";

import s from './imagecarousel.module.scss'

const ImageCarousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 700,
  };

  return (
    <div className={s.carouselContainer}>
      <Slider {...settings}>
        <Image src={banner1} alt="Image 1" />
        <Image src={banner2} alt="Image 2" />
        <Image src={banner3} alt="Image 3" />
      </Slider>
    </div>
  );
};

export default ImageCarousel;
