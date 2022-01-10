import { useState } from "react";
import { useField, useFormikContext } from "formik";
import dayjs from "dayjs";

import { DatePicker, TextField } from "src/components/MUI";
import StyledErrorMessage from "src/components/form/shared/ErrorMessage.styled";

interface IProps {
  label: string;
  inputFormat: string;
  InputProps: any;
  textFieldProps: any;
}

function DateField({ label, inputFormat, InputProps, textFieldProps }: IProps) {
  const [field, meta] = useField(textFieldProps);
  const { isSubmitting, setFieldValue } = useFormikContext();
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="date-field">
      <DatePicker
        label={label}
        value={value}
        onChange={newValue => {
          setValue(newValue);
          setFieldValue(field.name, dayjs(newValue).format(inputFormat));
        }}
        renderInput={params => (
          <TextField {...field} {...params} {...textFieldProps} type="date" disabled={isSubmitting} />
        )}
        inputFormat={inputFormat}
        InputProps={InputProps}
      />
      {meta.touched && meta.error && <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>}
    </div>
  );
}

export default DateField;
