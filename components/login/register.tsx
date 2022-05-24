import { Button } from "@chakra-ui/button";
import { Grid } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import {
  validateAddress,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateZipCode,
} from "../../libs/validator";
import FormDate from "../form/FormDate";
import FormInput from "../form/FormInput";
import FormMessage from "../form/FormMessage";

interface RegisterProps {
  refresh?: () => void;
  closePopup?: () => void;
  setLoading?: (isLoading: boolean) => void;
  setUser?: (user: User | undefined) => void;
}

export const Register: React.FC<RegisterProps> = (props) => {
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  type FormikValues = {
    firstName: string;
    lastName: string;
    street: string;
    zipCode: string;
    city: string;
    phoneNumber: string;
    birthDate: string;
    password: string;
    email: string;
    rememberMe: boolean;
  };

  const initialFormikValues: FormikValues = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    street: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
    birthDate: "",
    rememberMe: false,
  };

  function HandleOnSubmit(values: FormikValues) {
    setError("");
    props.setLoading?.(true);
    setLoading(true);
    axios({ url: "/api/register", method: "post", data: values }).then(
      (ful) => {
        console.log(ful.data);
        if (ful.status === 200) {
          if (ful.data === "OK" || ful.data === "OK + Address") {
            props?.setUser?.(ful.data as User);
            setSuccess(
              "Wysłano maila weryfikującego. Sprawdź swoją skrzynkę pocztową"
            );
            setLoading(false);
            return props.setLoading?.(false);
          }
          if (ful.data === "email already exists") {
            setLoading(false);
            return setError("Email już istnieje");
          }
        } else {
          setLoading(false);
          setError(ful.data);
        }
      },
      (rej) => {
        setLoading(false);
        props.setLoading?.(false);
        setError(rej);
      }
    );
  }
  return (
    <Formik initialValues={initialFormikValues} onSubmit={HandleOnSubmit}>
      <>
        <Form style={{ width: "inherit" }}>
          <Grid templateColumns="auto auto" gridGap="3" mt="8">
            <FormInput
              validator={validateName}
              name="firstName"
              label="Imię*"
            />
            <FormInput
              validator={validateName}
              name="lastName"
              label="Nazwisko*"
            />
            <FormInput
              validator={validateEmail}
              name="email"
              label="Adres e-mail*"
            />
            <FormInput
              validator={validatePhoneNumber}
              name="phoneNumber"
              label="Numer Telefonu*"
            />
            <FormInput
              validator={validatePassword}
              name="password"
              isPassword
              label="Hasło*"
            />
            <FormDate
              name="birthDate"
              validator={validateDate}
              label="Data urodzenia*"
            />
            <FormInput
              name="street"
              label="Ulica*"
              validator={validateAddress}
            />
            <FormInput
              name="zipCode"
              label="Kod Pocztowy*"
              validator={validateZipCode}
            />
            <FormInput name="city" label="Miasto*" validator={validateName} />
          </Grid>
          <Button
            isLoading={loading}
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
            Zarejestruj
          </Button>
        </Form>
        <FormMessage success={success} error={error} />
      </>
    </Formik>
  );
};
export default Register;
