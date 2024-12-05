import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import { ArtistType } from "@/types/artistType";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { Pagination, Navigation } from 'swiper/modules';

type SliderArtistProps = {
  items: Array<ArtistType>;
};

export default function SliderArtist({
  items,
}: SliderArtistProps): JSX.Element {
  return (
    <div className={styles.containerSwiper}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {items.length > 0 &&
          items.map((item, idx) => (
            <SwiperSlide key={idx} className={styles.containerSlide}>
              <div className={styles.detailsSlider}>
                <BsFillPersonFill className={styles.icons} />
                <h1>{item.name}</h1>
                <div className={styles.country}>
                  <BsFillHouseDoorFill className={styles.iconsSmall} />
                  <p>{item.country}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
