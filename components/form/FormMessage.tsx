import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface FormMessageProps {
  success?: string;
  error?: string;
}

export default function FormMessage(props: FormMessageProps): JSX.Element {
  const successColor = useColorModeValue("green.500", "green.300");
  const errorColor = useColorModeValue("red.500", "red.300");

  return (
    <Stack>
      {props.success && (
        <Text color={successColor} fontWeight="bold" mt="2">
          {props.success}
        </Text>
      )}
      {props.error && (
        <Text color={errorColor} fontWeight="bold" mt="2">
          {props.error}
        </Text>
      )}
    </Stack>
  );
}
