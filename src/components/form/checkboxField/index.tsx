import { useField, useFormikContext } from "formik";
import { cloneDeep, omit } from "lodash";

import { Checkbox, Typography } from "src/components/MUI";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

function CheckboxField(props: any) {
  const { label, handleChange } = props;
  const [field, meta] = useField(props);
  const { isSubmitting, values, setValues, validateForm } = useFormikContext();

  return (
    <div className="checkbox-field">
      <label>
        <Checkbox
          {...field}
          {...omit(cloneDeep(props), ["handleChange"])}
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
    </div>
  );
}

export default CheckboxField;
