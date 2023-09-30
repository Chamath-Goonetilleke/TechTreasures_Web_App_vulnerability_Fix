import React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function SnackbarComponent({
  vertical = "top",
  horizontal = "right",
  message,
  open,
  handleClose,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={2000}
    >
      {message}
    </Snackbar>
  );
}
