import styles from "./styles.module.css";
import { BsMusicNoteBeamed } from "react-icons/bs";
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
    <div className={styles.containerGrid}>
      {items.length > 0 &&
        album &&
        items.map((item, idx) => (
          <div key={idx} className={styles.gridItem}>
            <div className={styles.detailsSlider}>
              <BsMusicNoteBeamed className={styles.icons} />
              <h1>{item.name}</h1>
              <div className={styles.country}>
                <p>{album[item.album["@key"]]}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
