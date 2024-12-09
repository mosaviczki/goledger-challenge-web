import { AssetsEnum } from "@/constants/assets_enum";
import styles from "./styles.module.css";
import { AlbumType } from "@/types/albumType";
import { useState } from "react";
import { BsDiscFill, BsTrash } from "react-icons/bs";
import { BlockchainApi } from "@/app/apis/blockchain";
import { toast } from "react-toastify";

type SliderAlbumProps = {
  items: Array<AlbumType>;
};

export default function SliderAlbum({ items }: SliderAlbumProps): JSX.Element {
  const [album, setAlbum] = useState<AlbumType[]>(items);

  const handleDelete = async (name: string, key: string) => {
    const params = {
      key: {
        "@assetType": AssetsEnum.album,
        name: name,
        artist: {
          "@assetType": AssetsEnum.artist,
          "@key": key,
        },
      },
    };
    try {
      const result = await BlockchainApi.deleteApi(params);
      if (result.data) {
        setAlbum((prevItems) => prevItems.filter((item) => item.name !== name));
        toast.success("Album successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.containerGrid}>
      {album.length > 0 &&
        album.map((item, idx) => (
          <div key={idx} className={styles.gridItem}>
            <div className={styles.detailsSlider}>
              <div className={styles.editContainer}>
                <button
                  onClick={() => handleDelete(item.name, item.artist["@key"])}
                >
                  <BsTrash className={styles.iconsSmall} />
                </button>
              </div>
              <a href={`/album/${item["@key"].split("album:")[1]}`} className={styles.detailsSlider}>
                <BsDiscFill className={styles.icons} />
                <h1>{item.name}</h1>
                <div className={styles.country}>
                  <p>{item.year}</p>
                </div>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}
