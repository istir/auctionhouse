import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";
import React from "react";

interface FormDateProps {
  validator?: (value: string) => void | string;
  name: string;
  label: string;
  dateTime?: boolean;
  minToday?: boolean;
}

export default function FormDate(props: FormDateProps): JSX.Element {
  const [field, meta] = useField({
    name: props.name,
    validate: props.validator,
  });
  return (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input
        {...field}
        id={props.name}
        placeholder={props.label}
        type={props.dateTime ? "datetime-local" : "date"}
        min={
          props.minToday
            ? new Date(
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() + 1,
                  new Date().getHours(),
                  new Date().getMinutes()
                ).getTime() -
                  new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .replace(/:[0-9]{0,2}\..+$/, "")
            : "01-01-1850"
        }
        max={
          props.minToday
            ? new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate()
              )
                .toISOString()
                .replace(/:[0-9]{0,2}\..+$/, "")
            : new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .replace(/T.+$/, "")
        }
        pattern="\d{4}-\d{2}-\d{2}"
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
