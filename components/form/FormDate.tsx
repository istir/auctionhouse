import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";
import React from "react";

interface FormDateProps {
  // children: JSX.Element;
  validator?: (value: string) => void | string;
  name: string;
  label: string;

  // isError?: (arg: boolean) => void;
}

export default function FormDate(props: FormDateProps): JSX.Element {
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
        type="date"
        min="01-01-1850"
        max={new Date().toISOString().replace(/T.+$/, "")}
        pattern="\d{4}-\d{2}-\d{2}"
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
    //   )}
    // </Field>
  );
}
