import styles from "./styles.module.css";
import { AlbumType } from "@/types/albumType";
import { BsDiscFill } from "react-icons/bs";

type SliderAlbumProps = {
  items: Array<AlbumType>;
};

export default function SliderAlbum({
  items,
}: SliderAlbumProps): JSX.Element {
  return (
    <div className={styles.containerGrid}>
      {items.length > 0 &&
        items.map((item, idx) => (
          <div key={idx} className={styles.gridItem}>
            <div className={styles.detailsSlider}>
              <BsDiscFill className={styles.icons} />
              <h1>{item.name}</h1>
              <div className={styles.country}>
                <p>{item.year}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
