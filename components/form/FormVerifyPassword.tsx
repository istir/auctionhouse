import { Button, FormControl, FormErrorMessage, Stack } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { validateConfirmPassword } from "../../libs/validator";
import FormInput from "./FormInput";

interface FormVerifyPasswordProps {
  validator?: (value: string) => void | string;
  name: string;
  label: string;
}

export default function FormVerifyPassword(
  props: FormVerifyPasswordProps
): JSX.Element {
  const [field, meta, helpers] = useField({
    name: props.name,
    validate: props.validator,
  });
  return (
    <Stack>
      <FormControl isInvalid={meta.error && meta.touched ? true : false}>
        <FormInput
          validator={props.validator}
          name={props.name}
          label={props.label}
        />
        <FormInput
          label={`Powtórz ${props.label.toLowerCase()}`}
          name="verifyPassword"
          validator={(value) => {
            validateConfirmPassword(value, field.value);
          }}
        />
        <Button
          onClick={() => {
            console.log(field.value);
          }}
        >
          a
        </Button>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
