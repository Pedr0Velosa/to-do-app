import React from "react";
import { Box, Modal } from "@mui/material";

type ModalProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ isOpen, open, close, children }: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={close} sx={{ margin: 2 }}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
