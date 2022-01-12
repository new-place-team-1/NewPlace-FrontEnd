import { useField, useFormikContext } from "formik";

import { Checkbox, Typography } from "src/components/MUI";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

function CheckboxField(props: any) {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <div className="checkbox-field">
      <label>
        <Checkbox {...field} {...props} disabled={isSubmitting} />
        <Typography variant="caption" component="span">
          {props.value}
        </Typography>
      </label>
      {meta.touched && meta.error && (
        <StyledErrorMessage className="error" style={{ marginLeft: 12 }}>
          {meta.error}
        </StyledErrorMessage>
      )}
    </div>
  );
}

export default CheckboxField;
