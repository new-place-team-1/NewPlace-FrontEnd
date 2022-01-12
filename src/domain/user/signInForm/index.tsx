import CustomModal from "src/components/MUI/customs/modal";

interface IProps {
  open: boolean;
  onClose: () => void;
}

function SignInForm({ open, onClose }: IProps) {
  return (
    <CustomModal id="sign-in-form" open={open} onClose={onClose} size="small">
      <div>hi</div>
    </CustomModal>
  );
}

export default SignInForm;
