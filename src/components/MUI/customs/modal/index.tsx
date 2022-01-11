import { Modal, Paper } from "src/components/MUI";

interface IProps {
  open: boolean;
  onClose: () => void;
  size: "small" | "big";
  children: React.ReactElement;
  id?: string;
}

function CustomModal({ open, onClose, size, children, id }: IProps) {
  const paperWidth = size === "small" ? 280 : size === "big" ? 800 : 0;

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
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}

export default CustomModal;
