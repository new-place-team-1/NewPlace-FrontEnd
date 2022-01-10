import { useField, useFormikContext } from "formik";

import { TextField as Field } from "src/components/MUI";
import StyledErrorMessage from "src/components/formik/shared/ErrorMessage.styled";

function TextField(props: any) {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <div className="text-field">
      <Field {...field} {...props} disabled={isSubmitting} />
      {meta.touched && meta.error && <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>}
    </div>
  );
}

export default TextField;
