import { Dialog } from "@mui/material";

interface DialogProps{
    open: boolean,
    onClose: () => void;
}
export default function DialogSong({open, onClose}: DialogProps){
    return(
        <Dialog open={open} onClose={onClose}>

        </Dialog>
    )
}