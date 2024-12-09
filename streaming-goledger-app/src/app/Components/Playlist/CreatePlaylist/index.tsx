import { BlockchainApi } from "@/app/apis/blockchain";
import { AssetsEnum } from "@/constants/assets_enum";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { SongType } from "@/types/songType";

interface DialogProps {
  openDialog: boolean;
  onClose: () => void;
  updatePlaylist: (updatedSong: any) => void;
}

export default function DialogCreatePlaylist({
  openDialog,
  onClose,
  updatePlaylist,
}: DialogProps) {
  const [name, setName] = useState<string>("");
  const [song, setSong] = useState<SongType[]>([]);
  const [songSelect, setSelect] = useState<string[]>();
  const [privated, setPrivate] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      asset: [
        {
          "@assetType": AssetsEnum.playlist,
          name: name,
          songs: [{
            "@assetType": AssetsEnum.song,
            "@key": songSelect,
          }],
          private: privated,
        },
      ],
    };

    try {
      const result = await BlockchainApi.createAsset(payload);

      if (result.data) {
        toast.success("Playlist create completed successfully");
        console.log(result.data[0])
        updatePlaylist(result.data[0]);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          query: {
            selector: {
              "@assetType": AssetsEnum.song,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setSong(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelect(selectedOptions);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "500px",
          height: "auto",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <h1>New Playlist</h1>
      <form onSubmit={handleCreate} className={styles.formContainer}>
        <input
          placeholder="Name"
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <select
          id="song"
          multiple
          value={songSelect}
          onChange={handleSelectChange}
          required
        >
          <option value="" disabled>
            Select an song
          </option>
          {song?.length > 0 && song.map((song, index) => (
            <option key={index} value={song["@key"]}>
              {song.name}
            </option>
          ))}
        </select>
        <div className={styles.buttonContainer}>
          <button onClick={onClose}>Cancel</button>
          <button type="submit">Ok</button>
        </div>
      </form>
    </Dialog>
  );
}
