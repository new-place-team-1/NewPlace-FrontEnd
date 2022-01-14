import { CircularProgress } from "src/components/MUI";

function Spinner() {
  return (
    <CircularProgress
      className="spinner"
      sx={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)" }}
    />
  );
}

export default Spinner;
