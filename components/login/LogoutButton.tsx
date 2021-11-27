import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

interface LogoutButtonProps {
  refresh?: () => void;
  closePopup?: () => void;
}

export default function LogoutButton(props: LogoutButtonProps): JSX.Element {
  return (
    <Button
      onClick={() => {
        axios.post("/api/logout").then(() => {
          // router.reload();
          props.refresh?.();
          props.closePopup?.();
        });
      }}
    >
      Wyloguj
    </Button>
  );
}
