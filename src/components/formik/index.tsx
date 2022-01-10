import { Formik, Form } from "formik";
import { useCallback } from "react";

interface IProps {
  initialValues: object;
  validationSchema?: object;
  handleSubmit: (values: object) => Promise<any>;
  children: React.ReactNode;
}

function CustomForm({ initialValues, validationSchema, handleSubmit, children }: IProps) {
  const onSubmit = useCallback(
    (values, actions) => {
      handleSubmit(values)
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
      <Form>{children}</Form>
    </Formik>
  );
}

export default CustomForm;
