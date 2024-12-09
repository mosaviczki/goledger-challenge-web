import { BlockchainApi } from "@/app/apis/blockchain";
import { AssetsEnum } from "@/constants/assets_enum";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { ArtistType } from "@/types/artistType";

interface DialogProps {
  openDialog: boolean;
  onClose: () => void;
  updateAlbum: (updatedAlbum: any) => void;
}

export default function DialogCreateAlbum({
  openDialog,
  onClose,
  updateAlbum,
}: DialogProps) {
  const [year, setYear] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<ArtistType[]>([]);
  const [artistSelect, setSelect] = useState<string>();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      asset: [
        {
          "@assetType": AssetsEnum.album,
          name: name,
          artist: {
            "@assetType": AssetsEnum.artist,
            "@key": artistSelect,
          },
          year: year,
        },
      ],
    };

    try {
      const result = await BlockchainApi.createAsset(payload);

      if (result.data) {
        toast.success("Album create completed successfully");
        console.log(result.data[0])
        updateAlbum(result.data[0]);
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
              "@assetType": AssetsEnum.artist,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setArtist(result);
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
      <h1>New Album</h1>
      <form onSubmit={handleCreate} className={styles.formContainer}>
        <input
          placeholder="Name"
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <select
          id="artist"
          value={artistSelect}
          onChange={(e) => setSelect(e.target.value)}
          required
        >
          <option value="" disabled>
            Select an artist
          </option>
          {artist?.length > 0 && artist.map((artist, index) => (
            <option key={index} value={artist["@key"]}>
              {artist.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Year"
          name="year"
          type="text"
          onChange={(e) => setYear(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button onClick={onClose}>Cancel</button>
          <button type="submit">Ok</button>
        </div>
      </form>
    </Dialog>
  );
}
