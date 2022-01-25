import { useField, useFormikContext } from "formik";

import { Select, MenuItem } from "src/components/MUI";
import { FormControl, InputLabel } from "src/components/MUI/api";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

type Option = {
  id: string;
  value: string;
  label: string;
};

function SelectField(props: any) {
  const { label, labelId, size, color, options, handleChange, ...otherProps } = props;
  const [field, meta] = useField(otherProps);
  const { isSubmitting, values, setValues, validateForm } = useFormikContext();

  return (
    // issue: FormControl api 인데 UI랑 종속성을 가짐... 없으면 라벨이 셀렉트 안에 안들어감..
    <FormControl className="select-field" size={size} color={color} style={{ margin: 8 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        sx={{ minWidth: 120 }}
        labelId={labelId}
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
      >
        {options.map((option: Option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <StyledErrorMessage className="error" style={{ marginLeft: 12 }}>
          {meta.error}
        </StyledErrorMessage>
      )}
    </FormControl>
  );
}

export default SelectField;
