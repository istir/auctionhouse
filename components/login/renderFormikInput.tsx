import { Field } from "formik";
import React from "react";

interface FormOptions {
  value: string;
  label: string;
}
export interface RenderFormikInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  validate?: (value: string) => void | string;
  type?: string;
  as?: "dropdown" | "radio" | "textarea";
  options?: FormOptions[];
  size?: "xs" | "sm" | "lg" | "md";
  date?: string;
}

export const RenderFormikInput: React.FC<RenderFormikInputProps> = (props) => {
  return <Field name={props.name} validate={props.validate}></Field>;
};
export default RenderFormikInput;
