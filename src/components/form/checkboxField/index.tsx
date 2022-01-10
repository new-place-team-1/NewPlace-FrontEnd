import { useField, useFormikContext } from "formik";

import { Checkbox } from "src/components/MUI";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

function CheckboxField(props: any) {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <div className="field">
      <Checkbox {...field} {...props} disabled={isSubmitting} />
      <span>{props.value}</span>
      {meta.touched && meta.error && <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>}
    </div>
  );
}

export default CheckboxField;
