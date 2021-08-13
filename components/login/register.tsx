import { Formik } from "formik";
import React from "react";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const inputClassName =
    "duration-150 border-2  rounded-md p-1 font-semibold focus:border-blue-200 outline-none";

  function AJAX() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/", true);
    // xhttp.send(JSON.stringify());
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
        }
      }
    };
  }

  function styleFormikError(
    error: string | undefined,
    touched: boolean | undefined
  ) {
    if (error) return "border-red-400";
    if (touched) return "border-blue-400";
    return "border-gray-400";
  }
  return (
    <div>
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
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
          // return {};
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* <input
              type="text"
              name="userName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
            />
            {errors.userName && touched.userName && errors.userName} */}
            <input
              type="text"
              name="firstName"
              className={`${inputClassName} ${styleFormikError(
                errors.firstName,
                touched.firstName
              )}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <input
              type="text"
              name="lastName"
              className={`${inputClassName} ${styleFormikError(
                errors.lastName,
                touched.lastName
              )}`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && errors.lastName}
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className={`${inputClassName} ${styleFormikError(
                errors.email,
                touched.email
              )}`}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className={`${inputClassName} ${styleFormikError(
                errors.password,
                touched.password
              )}`}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
