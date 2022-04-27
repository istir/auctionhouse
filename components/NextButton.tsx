import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface NextButtonProps {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
}

export default function NextButton(
  props: NextButtonProps & ButtonProps
): JSX.Element {
  return (
    <Link href={props.href} passHref prefetch={props.prefetch || false}>
      <Button as="a" {...props}>
        {props.children}
      </Button>
    </Link>
  );
}
