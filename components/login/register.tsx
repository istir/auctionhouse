import { Field, Form, Formik } from "formik";
import React from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUserName,
} from "../../libs/validator";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const inputClassName =
    "duration-150 border-2  rounded-md p-1 font-semibold focus:border-blue-200 outline-none";
  const errorDivClassName = "font-semibold text-red-500";

  function checkForAnyError(error, touched) {
    const keys = Object.keys(error);
    for (let i = 0; i < keys.length; i += 1) {
      if (error[keys[i]].length > 0 && touched[keys[i]]) return true;
    }
    return false;
  }

  function styleFormikError(
    error: string | undefined,
    touched: boolean | undefined
  ) {
    if (touched) {
      if (error !== undefined) return "border-red-400";
      // if (touched)
      return "border-blue-400";
    }
    return "border-gray-400";
  }
  return (
    //! temp class
    <div className="w-1/3">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          email: "",
          address: "",
          phoneNumer: "",
          birthDate: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          const xhttp = new XMLHttpRequest();
          xhttp.open("POST", "/api/register", true);
          xhttp.send(JSON.stringify(values));
          xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
              if (xhttp.status === 200) {
                setSubmitting(false);
              }
            }
          };
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValidating,
          /* and other goodies */
        }) => (
          <Form className="flex flex-col gap-1">
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
            {errors.password && touched.password && (
              <div className={errorDivClassName}>{errors.password}</div>
            )}
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
    </div>
  );
};
export default Register;
