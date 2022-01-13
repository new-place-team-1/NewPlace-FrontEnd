import { useField, useFormikContext } from "formik";
import { cloneDeep, omit } from "lodash";

import { TextField } from "src/components/MUI";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

function Field(props: any) {
  const { handleChange } = props;
  const [field, meta] = useField(props);
  const { isSubmitting, values, setValues, validateForm } = useFormikContext();

  return (
    <div className="field" style={{ margin: 8 }}>
      <TextField
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
      {meta.touched && meta.error && <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>}
    </div>
  );
}

export default Field;
