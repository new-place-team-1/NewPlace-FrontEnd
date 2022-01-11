import CustomModal from "src/components/MUI/customs/modal";

interface IProps {
  open: boolean;
  onClose: () => void;
}

function SignUpForm({ open, onClose }: IProps) {
  return (
    <CustomModal id="sign-up-form" open={open} onClose={onClose} size="small">
      <div>hi</div>
    </CustomModal>
  );
}

export default SignUpForm;
