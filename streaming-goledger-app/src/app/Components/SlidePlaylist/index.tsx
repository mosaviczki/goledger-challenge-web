import styles from "./styles.module.css";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { PlaylistType } from "@/types/playlistType";

type SliderPlaylistProps = {
  items: Array<PlaylistType>;
};

export default function SliderPlaylist({
  items,
}: SliderPlaylistProps): JSX.Element {
  return (
    <div className={styles.containerGrid}>
      {items.length > 0 &&
        items.map((item, idx) => (
          <div key={idx} className={styles.gridItem}>
            <div className={styles.detailsSlider}>
              <BsFillMusicPlayerFill className={styles.icons} />
              <h1>{item.name}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}
