import { Modal, Paper } from "src/UI/MUI";

export type ModalSize = "small" | "medium" | "large";

interface IProps {
  open: boolean;
  onClose: () => void;
  size: ModalSize;
  children: React.ReactElement;
  id?: string;
}

function CustomModal({ open, onClose, size, children, id }: IProps) {
  const paperWidth = size === "small" ? 320 : size === "medium" ? 460 : size === "large" ? 800 : 0;

  return (
    <Modal id={id} open={open} onClose={onClose}>
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: paperWidth,
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}

export default CustomModal;
