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
  const [field, meta, helpers] = useField({
    name: props.name,
    validate: props.validator,
  });
  // props.isError && props.isError(meta.error && meta.touched ? true : false);
  return (
    // <Field name={props.name} validate={props.validator}>
    //   {({ field, form }: { field: FieldInputProps<> }) => (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <HStack>
        <Checkbox
          id={props.name}
          name={props.name}
          onChange={field.onChange}
          isChecked={field.value}
          //  onChange={formik.handleChange}
          //  isChecked={formik.values.rememberMe}
        ></Checkbox>
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      </HStack>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
  //   )}
  // </Field>
}
