import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";
import React from "react";

interface FormFieldProps {
  // children: JSX.Element;
  validator?: (value: string) => void | string;
  name: string;
  label: string;
  isPassword?: boolean;
  isNumeric?: boolean;
  // isError?: (arg: boolean) => void;
}

export default function FormInput(props: FormFieldProps): JSX.Element {
  const [field, meta, helpers] = useField({
    name: props.name,
    validate: props.validator,
  });
  // props.isError && props.isError(meta.error && meta.touched ? true : false);
  return (
    // <Field name={props.name} validate={props.validator}>
    //   {({ field, form }: { field: FieldInputProps<> }) => (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input
        {...field}
        // {...props}
        id={props.name}
        placeholder={props.label}
        type={
          props.isPassword ? "password" : props.isNumeric ? "number" : "text"
        }
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
    //   )}
    // </Field>
  );
}
