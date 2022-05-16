import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  useColorModeValue,
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
  const optionBGColor = useColorModeValue(
    "var(--chakra-colors-light-primary1)",
    "var(--chakra-colors-dark-primary1)"
  );
  const optgroupBGColor = useColorModeValue(
    "var(--chakra-colors-light-primary4)",
    "var(--chakra-colors-dark-primary4)"
  );
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
                  <optgroup
                    key={index}
                    label={option.groupLabel}
                    style={{ backgroundColor: optgroupBGColor }}
                  >
                    {option.groupItems.map((item, index) => (
                      <option
                        key={index}
                        value={item.value}
                        style={{ backgroundColor: optionBGColor }}
                      >
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                )
            )
          : props.categories?.map(
              (option, index) =>
                option.categories.length > 0 && (
                  <optgroup
                    key={index}
                    label={option.name}
                    style={{ backgroundColor: optgroupBGColor }}
                  >
                    {option.categories.map((item, index) => (
                      <option
                        key={index}
                        value={item.id}
                        style={{ backgroundColor: optionBGColor }}
                      >
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
