import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { localizeErrors } from "../../libs/localizeStrings";
import FormInput from "../form/FormInput";

interface LoginProps {
  refresh?: () => void;
  closePopup?: () => void;
}

export const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const [error, setError] = React.useState<string>("");
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
      axios.post("/api/login", values).then(
        (ful) => {
          console.log(ful);
          if (ful.status == 200 && ful.data === "OK") {
            // setUser();
            props?.refresh?.();
            props?.closePopup?.();
          } else {
            // TODO: show error
            setError(ful.data);
          }
          // ful.status=200&&ful.statusText='OK'&&props?.refresh()&&props?.closePopup();
        },
        (rej) => {
          console.error(rej);
          setError("Błąd krytyczny"); //! ?
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
        <Text color="red.500" fontWeight="bold" mt="2">
          {localizeErrors(error)}
        </Text>
        <Button
          type="submit"
          mt="2"
          colorScheme="blue"
          // colorScheme={anyFormikError ? "red" : "blue"}
        >
          Zaloguj
        </Button>
      </Form>
    </Formik>
    //       {/* <label htmlFor="email" className="font-semibold ">
    //         Adres e-mail
    //       </label>
    //       <Field
    //         className={`${inputClassName} ${styleFormikError(
    //           errors.email,
    //           touched.email
    //         )}`}
    //         name="email"
    //         //   validate={validateEmail}
    //       ></Field> */}
    //       {/* {errors.email && touched.email && (
    //         <div className={errorDivClassName}>{errors.email}</div>
    //       )} */}

    //       <label htmlFor="password" className="font-semibold ">
    //         Hasło
    //       </label>
    //       <Field
    //         className={`${inputClassName} ${styleFormikError(
    //           errors.password,
    //           touched.password
    //         )}`}
    //         name="password"
    //         type="password"
    //         //   validate={validatePassword}
    //       ></Field>
    //       {/* {errors.password && touched.password && (
    //         <div className={errorDivClassName}>{errors.password}</div>
    //       )} */}
    //       <fieldset>
    //         <label htmlFor="rememberMe" className="font-semibold mr-2">
    //           Zapamiętaj na 30 dni
    //         </label>

    //         <Field name="rememberMe" type="checkbox"></Field>
    //       </fieldset>
    //       <Text color="red.500" fontWeight="bold">
    //         {error}
    //       </Text>
    //       <button
    //         type="submit"
    //         className={`rounded-md border-2 duration-150 font-semibold ${
    //           checkForAnyError(errors, touched)
    //             ? "border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500"
    //             : "border-blue-200 bg-blue-100 hover:bg-blue-400 hover:border-blue-500"
    //         }`}
    //       >
    //         Zaloguj
    //       </button>
    //     </Form>
    //   )}
    // </Formik>

    // <Formik initialValues={initialFormikValues} onSubmit={HandleOnSubmit}>
    //   {({ errors, touched }) => (
    //     <Form className="flex flex-col gap-1 justify-center w-full p-2">
    //       <label htmlFor="email" className="font-semibold ">
    //         Adres e-mail
    //       </label>
    //       <Field
    //         className={`${inputClassName} ${styleFormikError(
    //           errors.email,
    //           touched.email
    //         )}`}
    //         name="email"
    //         //   validate={validateEmail}
    //       ></Field>
    //       {/* {errors.email && touched.email && (
    //           <div className={errorDivClassName}>{errors.email}</div>
    //         )} */}

    //       <label htmlFor="password" className="font-semibold ">
    //         Hasło
    //       </label>
    //       <Field
    //         className={`${inputClassName} ${styleFormikError(
    //           errors.password,
    //           touched.password
    //         )}`}
    //         name="password"
    //         type="password"
    //         //   validate={validatePassword}
    //       ></Field>
    //       {/* {errors.password && touched.password && (
    //           <div className={errorDivClassName}>{errors.password}</div>
    //         )} */}
    //       <fieldset>
    //         <label htmlFor="rememberMe" className="font-semibold mr-2">
    //           Zapamiętaj na 30 dni
    //         </label>

    //         <Field name="rememberMe" type="checkbox"></Field>
    //       </fieldset>
    //       <Text color="red.500" fontWeight="bold">
    //         {error}
    //       </Text>
    //       <button
    //         type="submit"
    //         className={`rounded-md border-2 duration-150 font-semibold ${
    //           checkForAnyError(errors, touched)
    //             ? "border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500"
    //             : "border-blue-200 bg-blue-100 hover:bg-blue-400 hover:border-blue-500"
    //         }`}
    //       >
    //         Zaloguj
    //       </button>
    //     </Form>
    //   )}
    // </Formik>
  );
};
export default Login;
