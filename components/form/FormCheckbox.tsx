import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Checkbox, HStack } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
interface FormCheckboxProps {
  validator?: (value: string) => void | string;
  name: string;
  label: string;
}

export default function FormCheckbox(props: FormCheckboxProps): JSX.Element {
  const [field, meta] = useField({
    name: props.name,
    validate: props.validator,
  });
  return (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <HStack>
        <Checkbox
          colorScheme={"red"}
          id={props.name}
          name={props.name}
          onChange={field.onChange}
          isChecked={field.value}
        ></Checkbox>
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      </HStack>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
