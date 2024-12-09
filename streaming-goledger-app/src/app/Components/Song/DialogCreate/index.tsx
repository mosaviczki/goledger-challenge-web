import { BlockchainApi } from "@/app/apis/blockchain";
import { AssetsEnum } from "@/constants/assets_enum";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { AlbumType } from "@/types/albumType";

interface DialogProps {
  openDialog: boolean;
  onClose: () => void;
  updateSong: (updatedSong: any) => void;
}

export default function DialogCreateSong({
  openDialog,
  onClose,
  updateSong,
}: DialogProps) {
  const [name, setName] = useState<string>("");
  const [album, setAlbum] = useState<AlbumType[]>([]);
  const [albumSelect, setSelect] = useState<string>();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      asset: [
        {
          "@assetType": AssetsEnum.song,
          name: name,
          album: {
            "@assetType": AssetsEnum.album,
            "@key": albumSelect,
          },
        },
      ],
    };

    try {
      const result = await BlockchainApi.createAsset(payload);

      if (result.data) {
        toast.success("Song create completed successfully");
        console.log(result.data[0])
        updateSong(result.data[0]);
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
              "@assetType": AssetsEnum.album,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setAlbum(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
      <h1>New Song</h1>
      <form onSubmit={handleCreate} className={styles.formContainer}>
        <input
          placeholder="Name"
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <select
          id="album"
          value={albumSelect}
          onChange={(e) => setSelect(e.target.value)}
          required
        >
          <option value="" disabled>
            Select an album
          </option>
          {album?.length > 0 && album.map((album, index) => (
            <option key={index} value={album["@key"]}>
              {album.name}
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
