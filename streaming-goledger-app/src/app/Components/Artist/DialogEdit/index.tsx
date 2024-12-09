import { BlockchainApi } from "@/app/apis/blockchain";
import { AssetsEnum } from "@/constants/assets_enum";
import { Dialog } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

interface DialogProps {
  openDialog: boolean;
  onClose: () => void;
  artist: string;
  updateArtist: (updatedArtist: any) => void;
}

export default function DialogEdit({
  openDialog,
  onClose,
  artist,
  updateArtist,
}: DialogProps) {
  const [country, setCountry] = useState<string>("");

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      update: {
        "@assetType": AssetsEnum.artist,
        name: artist,
        country: country,
      },
    };

    try {
      const result = await BlockchainApi.updateApi(payload);
      console.log(result);
      if (result.data) {
        toast.success("Artist update completed successfully");
        updateArtist(result.data);
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
        },
      }}
    >
      <form onSubmit={handleEdit} className={styles.formContainer}>
        <input
          placeholder="Country"
          name="country"
          type="text"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </Dialog>
  );
}
