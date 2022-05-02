import { Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import React from "react";
import { validateEmail } from "../../libs/validator";
import FormInput from "../form/FormInput";

interface ForgotPasswordProps {}

export default function ForgotPassword(
  props: ForgotPasswordProps
): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const initialValues = { email: "" };
  function handleOnSubmit(values: FormikValues) {
    setError("");
    setLoading(true);

    axios.post("/api/forgotPassword", values).then(
      (ful) => {
        if (ful.status === 200) {
          setError("Wysłano link resetujący hasło.");
          setLoading(false);
        }
      },
      (rej) => {
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
          <Text color="red.500" fontWeight="bold" mt="2">
            {error}
          </Text>
        </Stack>
      </Form>
    </Formik>
  );
}
