import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import { Pagination } from "swiper/modules";
import { AlbumType } from "@/types/albumType";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BlockchainApi } from "@/app/apis/blockchain";

type SliderAlbumProps = {
  items: Array<AlbumType>;
};

export default function SliderAlbum({ items }: SliderAlbumProps): JSX.Element {
  const [artists, setArtists] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistIds = Array.from(
          new Set(items.map((item) => item.artist["@key"]))
        );

        const promises = artistIds.map(async (artistId) => {
          const payload = {
            key: {
              "@assetType": "artist",
              "@key": artistId,
            },
          };
          try {
            const result = await BlockchainApi.readAsset(payload);
            return { id: artistId, name: result.data.name };
          } catch (error) {
            console.error(`Erro ao buscar artista com ID ${artistId}:`, error);
            return { id: artistId, name: null };
          }
        });

        const artistData = await Promise.all(promises);
        const artistMap = artistData.reduce((acc, { id, name }) => {
          acc[id] = name;
          return acc;
        }, {} as { [key: string]: string });

        setArtists(artistMap);
      } catch (error) {
        console.error("Erro ao buscar dados dos artistas:", error);
      }
    };

    fetchArtists();
  }, [items]);

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
          artists &&
          items.map((item, idx) => (
            <SwiperSlide key={idx} className={styles.containerSlide}>
              <div className={styles.detailsSlider}>
                <BsFillMusicPlayerFill className={styles.icons} />
                <h1>{item.name}</h1>
                <div className={styles.country}>
                  <p>{artists[item.artist["@key"]]}</p>
                  <p>{item.year}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
