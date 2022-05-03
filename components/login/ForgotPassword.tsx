import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import React from "react";
import { validateEmail } from "../../libs/validator";
import FormInput from "../form/FormInput";
import FormMessage from "../form/FormMessage";

export default function ForgotPassword(): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const initialValues = { email: "" };
  function handleOnSubmit(values: FormikValues) {
    setError("");
    setLoading(true);

    axios.post("/api/forgotPassword", values).then(
      (ful) => {
        if (ful.status === 200) {
          setSuccess("Wysłano link resetujący hasło.");
          setLoading(false);
        }
      },
      () => {
        setError("Coś poszło nie tak. Spróbuj ponownie później.");
        setLoading(false);
      }
    );
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
      <Form>
        <Stack>
          <FormInput
            label="Adres e-mail"
            name="email"
            validator={validateEmail}
          />
          <Button type="submit" isLoading={loading}>
            Zapomniałem hasła!
          </Button>
          <FormMessage success={success} error={error} />
        </Stack>
      </Form>
    </Formik>
  );
}
