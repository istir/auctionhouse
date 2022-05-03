import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface FormSelectProps {
  validator?: (value: string) => void | string;
  name: string;
  label: string;
  //   options: { value: string; label: string }[];
  options?: {
    groupLabel: string;
    groupItems: { value: string; label: string }[];
  }[];
  categories?: {
    id: number;
    name: string;
    categories: {
      id: number;
      name: string;
    }[];
  }[];
}

export default function FormSelect(props: FormSelectProps): JSX.Element {
  const [field, meta] = useField({
    name: props.name,
    validate: props.validator,
  });
  return (
    <FormControl isInvalid={meta.error && meta.touched ? true : false}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>

      <Select {...field} id={props.name} placeholder={props.label}>
        {props.options
          ? props.options?.map(
              (option, index) =>
                option.groupItems.length > 0 && (
                  <optgroup key={index} label={option.groupLabel}>
                    {option.groupItems.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                )
            )
          : props.categories?.map(
              (option, index) =>
                option.categories.length > 0 && (
                  <optgroup key={index} label={option.name}>
                    {option.categories.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                )
            )}
      </Select>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
