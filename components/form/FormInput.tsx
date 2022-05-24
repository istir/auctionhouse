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
  validator?: (value: string) => void | string;
  name: string;
  label: string;
  isPassword?: boolean;
  isNumeric?: boolean;
  tabindex?: number;
}

export default function FormInput(props: FormFieldProps): JSX.Element {
  const [field, meta, helpers] = useField({
    name: props.name,
    validate: props.validator,
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <InputGroup>
        <Input
          {...field}
          id={props.name}
          placeholder={props.label}
          tabIndex={props.tabindex}
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
              tabIndex={-1}
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </InputRightAddon>
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
