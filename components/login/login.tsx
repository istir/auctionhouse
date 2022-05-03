import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { localizeErrors } from "../../libs/localizeStrings";
import FormCheckbox from "../form/FormCheckbox";
import FormInput from "../form/FormInput";
import FormMessage from "../form/FormMessage";

interface LoginProps {
  refresh?: () => void;
  setLoading?: (isLoading: boolean) => void;
  closePopup?: () => void;
  setUser?: (user: User | undefined) => void;
}

export default function Login(props: LoginProps): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [erroredEmail, setErroredEmail] = React.useState<string>("");
  type FormikValues = {
    password: string;
    email: string;
    rememberMe: boolean;
  };
  const initialFormikValues: FormikValues = {
    password: "",
    email: "",
    rememberMe: false,
  };

  function HandleOnSubmit(values: FormikValues) {
    try {
      setError("");
      props.setLoading?.(true);
      axios.post("/api/login", values).then(
        (ful) => {
          console.log(ful);
          if (
            ful.status == 200 &&
            ful.data.status === "OK" &&
            props?.setUser !== undefined
          ) {
            props?.setUser?.(ful.data.user as User);
            props?.closePopup?.();
          } else if (
            (ful.status == 200 && ful.data.status === "refresh") ||
            (ful.data.status === "OK" && props?.setUser === undefined)
          ) {
            props?.refresh?.();
            props?.closePopup?.();
          } else {
            props.setLoading?.(false);
            ful.data?.status ? setError(ful.data.status) : setError(ful.data);
            setErroredEmail(values.email);
          }
        },
        () => {
          setError(
            "Ups, coś poszło nie tak! Sprawdź dane logowania i spróbuj ponownie."
          );
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Formik initialValues={initialFormikValues} onSubmit={HandleOnSubmit}>
      <Form style={{ width: "inherit" }}>
        <Stack>
          <FormInput label="Adres e-mail" name="email" />

          <FormInput label="Hasło" name="password" isPassword />
          <FormCheckbox label="Zapamiętaj mnie" name="rememberMe" />
          <FormMessage error={localizeErrors(error)} success={success} />
          {error === "User not verified" && (
            <Button
              onClick={() => {
                axios({
                  url: `/api/sendVerificationEmail?email=${erroredEmail}`,
                }).then((ful) => {
                  setSuccess("Wysłano email weryfikacyjny");
                });
              }}
            >
              Wyślij maila weryfikującego
            </Button>
          )}
          <Button
            type="submit"
            mt="2"
            bg={useColorModeValue(
              "light.primaryContainer",
              "dark.primaryContainer"
            )}
            _hover={{
              backgroundColor: useColorModeValue(
                "light.tertiaryContainer",
                "dark.tertiaryContainer"
              ),
            }}
          >
            Zaloguj
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}
