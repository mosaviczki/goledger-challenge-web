import { BlockchainApi } from "@/app/apis/blockchain";
import { AssetsEnum } from "@/constants/assets_enum";
import { Dialog } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

interface DialogProps {
  openDialog: boolean;
  onClose: () => void;
  updateArtist: (updatedArtist: any) => void;
}

export default function DialogCreateArtist({
  openDialog,
  onClose,
  updateArtist
}: DialogProps) {
  const [country, setCountry] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      asset: [
        {
          "@assetType": AssetsEnum.artist,
          name: name,
          country: country,
        },
      ],
    };

    try {
      const result = await BlockchainApi.createAsset(payload);

      if (result.data) {
        toast.success("Artist create completed successfully");
        console.log(result.data[0])
        updateArtist(result.data[0]);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
      <h1>New Artist</h1>
      <form onSubmit={handleCreate} className={styles.formContainer}>
        <input
          placeholder="Name"
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Country"
          name="country"
          type="text"
          onChange={(e) => setCountry(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button onClick={onClose}>Cancel</button>
          <button type="submit">Ok</button>
        </div>
      </form>
    </Dialog>
  );
}
