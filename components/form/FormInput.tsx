import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { IconButton } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  // props.isError && props.isError(meta.error && meta.touched ? true : false);
  return (
    // <Field name={props.name} validate={props.validator}>
    //   {({ field, form }: { field: FieldInputProps<> }) => (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <InputGroup>
        <Input
          {...field}
          // {...props}
          id={props.name}
          placeholder={props.label}
          type={
            props.isPassword
              ? showPassword
                ? "text"
                : "password"
              : props.isNumeric
              ? "number"
              : "text"
          }
        />
        {props.isPassword && (
          <InputRightAddon paddingInlineStart={"0"} paddingInlineEnd={"0"}>
            <IconButton
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              aria-label="Show password"
              variant={"ghost"}
              m="0"
              borderLeftRadius={"0"}
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </InputRightAddon>
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
    //   )}
    // </Field>
  );
}
