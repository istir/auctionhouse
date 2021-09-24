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

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const inputClassName =
    "duration-150 border-2  rounded-md p-1 font-semibold focus:border-blue-200 outline-none";
  const errorDivClassName = "font-semibold text-red-500";

  function checkForAnyError(error: any, touched: any) {
    const keys = Object.keys(error);
    for (let i = 0; i < keys.length; i += 1) {
      if (error[keys[i]].length > 0 && touched[keys[i]]) return true;
    }
    return false;
  }

  function styleFormikError(
    error: any,
    touched?: boolean | FormikTouched<Date> | undefined | boolean[]
  ) {
    if (Array.isArray(error) && Array.isArray(touched)) {
      if (touched.some((element) => element === true)) {
        for (let i = 0; i < error.length; i += 1) {
          if (error[i] !== undefined && touched[i]) return "border-red-400";
        }
        return "border-blue-400";
      }
      return "border-gray-400";
    }
    if (touched) {
      if (error !== undefined) return "border-red-400";
      // if (touched)
      return "border-blue-400";
    }
    return "border-gray-400";
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
        email: "",

        street: "",
        zipCode: "",
        city: "",

        phoneNumber: "",
        birthDate: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/api/register", true);
        xhttp.send(JSON.stringify(values));
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            console.log(xhttp.responseText);
            if (xhttp.status === 200) {
              setSubmitting(false);
            }
          }
        };
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-1 justify-center w-max sm:w-full p-2">
          <label htmlFor="firstName" className="font-semibold ">
            Imię*
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.firstName,
              touched.firstName
            )}`}
            name="firstName"
            validate={validateName}
          ></Field>
          {errors.firstName && touched.firstName && (
            <div className={errorDivClassName}>{errors.firstName}</div>
          )}
          <label htmlFor="lastName" className="font-semibold ">
            Nazwisko*
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.lastName,
              touched.lastName
            )}`}
            name="lastName"
            validate={validateName}
          ></Field>
          {errors.lastName && touched.lastName && (
            <div className={errorDivClassName}>{errors.lastName}</div>
          )}
          <label htmlFor="email" className="font-semibold ">
            Adres e-mail*
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.email,
              touched.email
            )}`}
            name="email"
            validate={validateEmail}
          ></Field>
          {errors.email && touched.email && (
            <div className={errorDivClassName}>{errors.email}</div>
          )}
          <label htmlFor="phoneNumber" className="font-semibold ">
            Numer telefonu*
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.phoneNumber,
              touched.phoneNumber
            )}`}
            name="phoneNumber"
            validate={validatePhoneNumber}
          ></Field>
          {errors.phoneNumber && touched.phoneNumber && (
            <div className={errorDivClassName}>{errors.phoneNumber}</div>
          )}
          <label htmlFor="password" className="font-semibold ">
            Hasło*
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.password,
              touched.password
            )}`}
            name="password"
            type="password"
            validate={validatePassword}
          ></Field>
          <label htmlFor="birthDate" className="font-semibold ">
            Data urodzenia*
          </label>

          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.birthDate,
              touched.birthDate
            )}`}
            name="birthDate"
            type="date"
            min="01-01-1850"
            max={new Date().toISOString().replace(/T.+$/, "")}
            // max={`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`}
            validate={validateDate}
            pattern="\d{4}-\d{2}-\d{2}"
          ></Field>
          {errors.birthDate && touched.birthDate && (
            <div className={errorDivClassName}>{errors.birthDate}</div>
          )}

          <fieldset
            className={`border-2 rounded-md p-2 flex flex-col ${styleFormikError(
              [errors.street, errors.zipCode, errors.city],
              [touched.street, touched.zipCode, touched.city]
            )}`}
          >
            <legend className="font-semibold ">Adres*:</legend>
            <label htmlFor="street" className="font-semibold ">
              Ulica*
            </label>
            <Field
              className={`${inputClassName} ${styleFormikError(
                errors.street,
                touched.street
              )}`}
              name="street"
              validate={validateAddress}
            ></Field>
            {errors.street && touched.street && (
              <div className={errorDivClassName}>{errors.street}</div>
            )}

            <label htmlFor="zipCode" className="font-semibold ">
              Kod pocztowy*
            </label>
            <Field
              className={`${inputClassName} ${styleFormikError(
                errors.zipCode,
                touched.zipCode
              )}`}
              name="zipCode"
              validate={validateZipCode}
            ></Field>
            {errors.zipCode && touched.zipCode && (
              <div className={errorDivClassName}>{errors.zipCode}</div>
            )}

            <label htmlFor="city" className="font-semibold ">
              Miasto*
            </label>
            <Field
              className={`${inputClassName} ${styleFormikError(
                errors.city,
                touched.city
              )}`}
              name="city"
              validate={validateName}
            ></Field>
            {errors.city && touched.city && (
              <div className={errorDivClassName}>{errors.city}</div>
            )}
          </fieldset>

          <button
            type="submit"
            className={`rounded-md border-2 duration-150 font-semibold ${
              checkForAnyError(errors, touched)
                ? "border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500"
                : "border-blue-200 bg-blue-100  hover:bg-blue-400 hover:border-blue-500"
            }`}
          >
            Zarejestruj
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Register;
