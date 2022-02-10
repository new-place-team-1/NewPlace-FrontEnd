import { Formik, Form } from "formik";
import { useCallback } from "react";

import { isDevelopmentMode } from "src/utils/lib/is";
import Spinner from "src/UI/MUI/customs/spinner";

interface IProps {
  initialValues: object;
  validationSchema?: object;
  handleSubmit: (values: IFormValues, actions: any) => any;
  children: React.ReactNode;
  style?: object;
}

function CustomForm({ initialValues, validationSchema, handleSubmit, children, style }: IProps) {
  const onSubmit = useCallback(
    (values, actions) => {
      if (isDevelopmentMode()) {
        console.log("[CustomForm] values on submit: ", values);
      }

      handleSubmit(values, actions)
        .then(() => {
          actions.resetForm({
            values: initialValues,
          });
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
    [initialValues, handleSubmit],
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => {
        return (
          <Form style={style}>
            {isSubmitting && <Spinner />}
            {children}
          </Form>
        );
      }}
    </Formik>
  );
}

export default CustomForm;
