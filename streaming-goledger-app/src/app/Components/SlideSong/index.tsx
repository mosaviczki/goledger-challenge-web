import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import { Pagination } from "swiper/modules";
import { BsDiscFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BlockchainApi } from "@/app/apis/blockchain";
import { SongType } from "@/types/songType";

type SliderSongProps = {
  items: Array<SongType>;
};

export default function SliderSong({ items }: SliderSongProps): JSX.Element {
  const [album, setAlbum] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const AlbumIds = Array.from(
          new Set(items.map((item) => item.album["@key"]))
        );

        const promises = AlbumIds.map(async (albumId) => {
          const payload = {
            key: {
              "@assetType": "artist",
              "@key": albumId,
            },
          };
          try {
            const result = await BlockchainApi.readAsset(payload);
            return { id: albumId, name: result.data.name };
          } catch (error) {
            console.error(`Erro ao buscar artista com ID ${albumId}:`, error);
            return { id: albumId, name: null };
          }
        });

        const artistData = await Promise.all(promises);
        const artistMap = artistData.reduce((acc, { id, name }) => {
          acc[id] = name;
          return acc;
        }, {} as { [key: string]: string });

        setAlbum(artistMap);
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
          album &&
          items.map((item, idx) => (
            <SwiperSlide key={idx} className={styles.containerSlide}>
              <div className={styles.detailsSlider}>
                <BsDiscFill className={styles.icons} />
                <h1>{item.name}</h1>
                <div className={styles.country}>
                  <p>{album[item.album["@key"]]}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
