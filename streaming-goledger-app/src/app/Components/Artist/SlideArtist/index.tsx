import { AssetsEnum } from "@/constants/assets_enum";
import styles from "./styles.module.css";
import { ArtistType } from "@/types/artistType";
import { BsFillHouseDoorFill, BsPencil, BsTrash } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BlockchainApi } from "@/app/apis/blockchain";
import { toast } from "react-toastify";
import { useState } from "react";
import DialogEdit from "../DialogEdit";

type SliderArtistProps = {
  items: Array<ArtistType>;
};

export default function SliderArtist({
  items,
}: SliderArtistProps): JSX.Element {
  const [artists, setArtists] = useState<ArtistType[]>(items);
  const [open, setOpen] = useState(false);
  const [artistName, setArtistName] = useState("");

  const handleDelete = async (name: string) => {
    const params = {
      key: {
        "@assetType": AssetsEnum.artist,
        name: name,
      },
    };
    try {
      const result = await BlockchainApi.deleteApi(params);
      if (result.data) {
        setArtists((prevItems) =>
          prevItems.filter((item) => item.name !== name)
        );
        toast.success("Artist successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateArtist = (updatedArtist: ArtistType) => {
    console.log(updateArtist)
    setArtists((prevItems) =>
      prevItems.map((artist) =>
        artist.name === updatedArtist.name ? updatedArtist : artist
      )
    );
  };

  return (
    <div className={styles.containerGrid}>
      {artists.length > 0 &&
        artists.map((item, idx) => (
          <div className={styles.gridItem} key={idx}>
            <div className={styles.detailsSlider}>
              <div className={styles.editContainer}>
                <button
                  onClick={() => {
                    setOpen(true);
                    setArtistName(item.name);
                  }}
                >
                  <BsPencil className={styles.iconsSmall} />
                </button>
                <button onClick={() => handleDelete(item.name)}>
                  <BsTrash className={styles.iconsSmall} />
                </button>
              </div>
              <a href={`/artist/${item["@key"].split("artist:")[1]}`} key={idx}>
                <BsFillPersonFill className={styles.icons} />
                <h1>{item.name}</h1>
                <div className={styles.country}>
                  <BsFillHouseDoorFill className={styles.iconsSmall} />
                  <p>{item.country}</p>
                </div>
              </a>
            </div>
          </div>
        ))}
      <DialogEdit
        openDialog={open}
        onClose={() => setOpen(false)}
        artist={artistName}
        updateArtist={updateArtist}
      />
    </div>
  );
}
