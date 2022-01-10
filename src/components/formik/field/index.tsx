import { useField, useFormikContext } from "formik";

import { TextField } from "src/components/MUI";
import StyledErrorMessage from "src/components/formik/shared/ErrorMessage.styled";

function Field(props: any) {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <div className="field">
      <TextField {...field} {...props} disabled={isSubmitting} />
      {meta.touched && meta.error && <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>}
    </div>
  );
}

export default Field;
