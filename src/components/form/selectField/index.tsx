import { useField, useFormikContext } from "formik";
import { cloneDeep, omit } from "lodash";

import { Select, MenuItem, InputLabel } from "src/components/MUI";
import { FormControl } from "src/components/MUI/api";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

type Option = {
  id: string;
  value: string;
  label: string;
};

function SelectField(props: any) {
  const { label, labelId, options, handleChange } = props;
  const [field, meta] = useField(props);
  const { isSubmitting, values, setValues, validateForm } = useFormikContext();

  return (
    // issue: FormControl api 인데 UI랑 종속성을 가짐... 없으면 라벨이 셀렉트 안에 안들어감..
    <FormControl className="select-field" color={props.color}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        sx={{ width: 120 }}
        labelId={labelId}
        {...field}
        {...omit(cloneDeep(props), ["options", "handleChange"])}
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
