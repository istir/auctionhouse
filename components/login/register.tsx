import { Button } from "@chakra-ui/button";
import { Grid } from "@chakra-ui/layout";
import axios from "axios";
import { Field, Form, Formik, FormikTouched } from "formik";
import React from "react";
import {
  validateAddress,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateUserName,
  validateZipCode,
} from "../../libs/validator";
import FormDate from "../form/FormDate";
import FormInput from "../form/FormInput";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = (props) => {
  const [error, setError] = React.useState<string>("");

  // function checkForAnyError(error: any, touched: any) {
  //   const keys = Object.keys(error);
  //   for (let i = 0; i < keys.length; i += 1) {
  //     if (error[keys[i]].length > 0 && touched[keys[i]]) return true;
  //   }
  //   return false;
  // }

  // function styleFormikError(
  //   error: any,
  //   touched?: boolean | FormikTouched<Date> | undefined | boolean[]
  // ) {
  //   if (Array.isArray(error) && Array.isArray(touched)) {
  //     if (touched.some((element) => element === true)) {
  //       for (let i = 0; i < error.length; i += 1) {
  //         if (error[i] !== undefined && touched[i]) return "border-red-400";
  //       }
  //       return "border-blue-400";
  //     }
  //     return "border-gray-400";
  //   }
  //   if (touched) {
  //     if (error !== undefined) return "border-red-400";
  //     // if (touched)
  //     return "border-blue-400";
  //   }
  //   return "border-gray-400";
  // }
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
  };

  function HandleOnSubmit(values: FormikValues) {
    try {
      setError("");
      axios.post("/api/login", values).then(
        (ful) => {
          console.log(ful);
          if (ful.status == 200 && ful.data === "OK") {
            // props?.refresh?.();
            // props?.closePopup?.();
          } else {
            // TODO: show error
            setError(ful.data);
          }
          // ful.status=200&&ful.statusText='OK'&&props?.refresh()&&props?.closePopup();
        },
        (rej) => {
          console.error(rej);
          setError(rej); //! ?
          // TODO: show error
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Formik initialValues={initialFormikValues} onSubmit={HandleOnSubmit}>
      <Form>
        <Grid templateColumns="auto auto" gridGap="3" mt="8">
          <FormInput validator={validateName} name="firstName" label="Imię*" />
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
            label="Hasło*"
          />
          <FormDate
            name="birthDate"
            validator={validateDate}
            label="Data urodzenia*"
          />
          <FormInput name="street" label="Ulica*" validator={validateAddress} />
          <FormInput
            name="zipCode"
            label="Kod Pocztowy*"
            validator={validateZipCode}
          />
          <FormInput name="city" label="Miasto*" validator={validateName} />
        </Grid>
        <Button
          type="submit"
          mt="2"
          colorScheme="blue"
          // colorScheme={anyFormikError ? "red" : "blue"}
        >
          Zarejestruj
        </Button>
      </Form>
    </Formik>
  );
};
export default Register;
