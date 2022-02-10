import { useField, useFormikContext } from "formik";

import StyledCheckboxField from "./CheckboxField.styled";
import { Checkbox, Typography } from "src/UI/MUI";
import StyledErrorMessage from "src/UI/form/shared/ErrorMessage.styled";

function CheckboxField(props: any) {
  const { label, handleChange, ...otherProps } = props;
  const [field, meta] = useField(otherProps);
  const { isSubmitting, values, setValues, validateForm } = useFormikContext();

  return (
    <StyledCheckboxField className="checkbox-field">
      <label>
        <Checkbox
          {...field}
          {...otherProps}
          onChange={async event => {
            if (handleChange) {
              await handleChange(event, values, setValues);
              validateForm();
            } else {
              field.onChange(event);
            }
          }}
          disabled={isSubmitting}
        />
        <Typography variant="caption" component="span">
          {label}
        </Typography>
      </label>
      {meta.touched && meta.error && (
        <StyledErrorMessage className="error" style={{ marginLeft: 12 }}>
          {meta.error}
        </StyledErrorMessage>
      )}
    </StyledCheckboxField>
  );
}

export default CheckboxField;
