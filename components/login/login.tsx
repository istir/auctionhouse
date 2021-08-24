import { Field, Form, Formik, FormikTouched } from "formik";
import React from "react";

interface LoginProps {
  refresh: () => void;
  closePopup: () => void;
}

export const Login: React.FC<LoginProps> = (props: LoginProps) => {
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
        password: "",
        email: "",
        rememberMe: false,
      }}
      onSubmit={(values, { setSubmitting }) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/api/login", true);
        xhttp.send(JSON.stringify(values));
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            console.log(xhttp.responseText);
            if (xhttp.status === 200) {
              setSubmitting(false);

              props.refresh();
            }
          }
        };
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-1 justify-center w-full p-2">
          <label htmlFor="email" className="font-semibold ">
            Adres e-mail
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.email,
              touched.email
            )}`}
            name="email"
            //   validate={validateEmail}
          ></Field>
          {/* {errors.email && touched.email && (
              <div className={errorDivClassName}>{errors.email}</div>
            )} */}

          <label htmlFor="password" className="font-semibold ">
            Hasło
          </label>
          <Field
            className={`${inputClassName} ${styleFormikError(
              errors.password,
              touched.password
            )}`}
            name="password"
            type="password"
            //   validate={validatePassword}
          ></Field>
          {/* {errors.password && touched.password && (
              <div className={errorDivClassName}>{errors.password}</div>
            )} */}
          <fieldset>
            <label htmlFor="rememberMe" className="font-semibold mr-2">
              Zapamiętaj na 30 dni
            </label>

            <Field name="rememberMe" type="checkbox"></Field>
          </fieldset>
          <button
            type="submit"
            className={`rounded-md border-2 duration-150 font-semibold ${
              checkForAnyError(errors, touched)
                ? "border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500"
                : "border-blue-200 bg-blue-100 hover:bg-blue-400 hover:border-blue-500"
            }`}
          >
            Zaloguj
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
