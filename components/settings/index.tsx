import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useBreakpoint,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/router";
import React from "react";
import FormInput from "../form/FormInput";

interface SettingsProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  user: User;
}

export default function Settings(props: SettingsProps): JSX.Element {
  console.log(props.user);
  const breakpoint = useBreakpoint();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const initialValues = { password: "", previousPassword: "" };
  function modalSize() {
    switch (breakpoint) {
      case "base":
        return "full";
      default:
        return "xl";
    }
  }

  function submitDeleteAccount(values: FormikValues) {
    setLoading(true);
    axios({
      method: "POST",
      url: "/api/deleteAccount",

      data: { id: props.user.id, password: values.password },
    }).then(
      (ful) => {
        setLoading(false);
        console.log(ful.data);
        router.reload();
        // console.log(ful.data);
      },
      (rej) => {
        setLoading(false);
        // console.log(rej);
        // if (rej.data !== "Wrong password")
        // router.reload();
        // console.log(rej.data);
      }
    );
  }
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={modalSize()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Ustawienia konta {props.user.firstName} {props.user.lastName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontSize={{ base: "xl", md: "2xl" }}>Usuń konto</Text>
            <Box>
              <Formik
                initialValues={initialValues}
                onSubmit={submitDeleteAccount}
              >
                <Form>
                  <FormInput
                    name="password"
                    label="Podaj obecne hasło"
                    isPassword
                  />
                  <Popover>
                    {({ onClose }) => (
                      <>
                        <PopoverTrigger>
                          <Button colorScheme={"red"} isLoading={loading}>
                            Usuń konto
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverBody>
                            <Text>Czy na pewno chcesz usunąć konto?</Text>
                            <Text fontWeight={"bold"}>
                              Tej operacji nie da się cofnąć.
                            </Text>
                          </PopoverBody>
                          <PopoverFooter
                            display={"flex"}
                            justifyContent="space-between"
                          >
                            <Button
                              colorScheme={"red"}
                              type="submit"
                              isLoading={loading}
                            >
                              Usuń konto
                            </Button>
                            <Button
                              colorScheme={"blue"}
                              onClick={onClose}
                              //   isLoading={loading}
                            >
                              Nie usuwaj
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                </Form>
              </Formik>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
