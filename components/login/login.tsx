import { Button } from "@chakra-ui/button";
import { Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { localizeErrors } from "../../libs/localizeStrings";
import FormCheckbox from "../form/FormCheckbox";
import FormInput from "../form/FormInput";

interface LoginProps {
  refresh?: () => void;
  setLoading?: (isLoading: boolean) => void;
  closePopup?: () => void;
  setUser?: (user: User | undefined) => void;
}

export const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const [error, setError] = React.useState<string>("");
  const [erroredEmail, setErroredEmail] = React.useState<string>("");
  // const [anyFormikError, setAnyFormikError] = React.useState<boolean[]>([
  //   false,
  // ]);
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
    // const [{ data, loading, error }, refetch] = useAxios({
    //   url: "/api/login",
    //   method: "POST",
    //   params: values,
    // });
    // console.log(data, loading, error, refetch);
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
            // setUser();
            // console.log(ful.data.user);
            // console.log("LOLW");
            // props?.setLoading?.(false);
            props?.setUser?.(ful.data.user as User);
            // props?.refresh?.();
            props?.closePopup?.();
          } else if (
            (ful.status == 200 && ful.data.status === "refresh") ||
            (ful.data.status === "OK" && props?.setUser === undefined)
          ) {
            props?.refresh?.();
            props?.closePopup?.();
          } else {
            // TODO: show error
            props.setLoading?.(false);
            ful.data?.status ? setError(ful.data.status) : setError(ful.data);
            setErroredEmail(values.email);
          }
          // ful.status=200&&ful.statusText='OK'&&props?.refresh()&&props?.closePopup();
        },
        (rej) => {
          console.error(rej);
          setError(
            "Ups, coś poszło nie tak! Sprawdź dane logowania i spróbuj ponownie."
          ); //! ?
          // TODO: show error
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  function checkForAnyError(error: any, touched: any) {
    const keys = Object.keys(error);
    for (let i = 0; i < keys.length; i += 1) {
      if (error[keys[i]].length > 0 && touched[keys[i]]) return true;
    }
    return false;
  }

  return (
    <Formik initialValues={initialFormikValues} onSubmit={HandleOnSubmit}>
      <Form style={{ width: "inherit" }}>
        <Stack>
          <FormInput
            // validator={validateEmail}
            label="Adres e-mail"
            name="email"
            // isError={setAnyFormikError}
          />

          <FormInput
            // validator={validatePassword}
            label="Hasło"
            name="password"
            isPassword
            // isError={setAnyFormikError}
          />
          <FormCheckbox label="Zapamiętaj mnie" name="rememberMe" />
          <Text color="red.500" fontWeight="bold" mt="2">
            {localizeErrors(error)}
          </Text>
          {error === "User not verified" && (
            <Button
              onClick={() => {
                axios({
                  url: `/api/sendVerificationEmail?email=${erroredEmail}`,
                }).then((ful) => {
                  setError("Wysłano email weryfikacyjny");
                });
                // sendVerificationEmail(erroredEmail);
              }}
            >
              Wyślij maila weryfikującego
            </Button>
          )}
          <Button
            type="submit"
            mt="2"
            // colorScheme="blue"
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
            // colorScheme={anyFormikError ? "red" : "blue"}
          >
            Zaloguj
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};
export default Login;
