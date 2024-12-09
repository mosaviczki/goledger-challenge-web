import { AssetsEnum } from "@/constants/assets_enum";
import Blocs from "./Components/Blocs";
import styles from "./page.module.css";
import {
  BsDiscFill,
  BsFillMusicPlayerFill,
  BsFillPersonFill,
  BsMusicNoteBeamed,
} from "react-icons/bs";

export default function Home() {
  return (
    <div className={styles.page}>
      <a href="/artist">
        <Blocs
          title={AssetsEnum.artist}
          icon={<BsFillPersonFill />}
          background={
            "linear-gradient(90deg,rgba(0, 47, 57, 1) 0%,rgba(131, 58, 180, 1) 55%,rgb(72, 191, 193) 85%, rgb(76, 255, 157) 100%)"
          }
        />
      </a>
      <a href="/album">
        <Blocs
          title={AssetsEnum.album}
          icon={<BsDiscFill />}
          background={
            "linear-gradient(90deg,rgb(10, 0, 57) 0%,rgb(68, 58, 180) 55%,rgb(72, 167, 193) 85%,rgb(76, 255, 189) 100%);"
          }
        />
      </a>
      <a href="/playlist">
        <Blocs
          title={AssetsEnum.playlist}
          icon={<BsFillMusicPlayerFill />}
          background={
            "linear-gradient(90deg,#003923 0%,#3ab442 55%,rgb(143, 193, 72) 85%, rgb(255, 222, 76) 100%)"
          }
        />
      </a>
      <a href="/song">
        <Blocs
          title={AssetsEnum.song}
          icon={<BsMusicNoteBeamed />}
          background={
            "linear-gradient(90deg,rgb(57, 0, 55) 0%,rgb(180, 58, 178) 55%,rgb(193, 110, 72) 85%,rgb(255, 219, 76) 100%"
          }
        />
      </a>
    </div>
  );
}
