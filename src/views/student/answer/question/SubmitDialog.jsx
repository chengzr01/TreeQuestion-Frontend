import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function SubmitDialog({ open, setOpen, handleSubmit }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        sx={{ width: "100%" }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Submit
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
          >
            {" "}
            Confirm{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
