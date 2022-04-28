import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useBreakpoint,
  useColorModeValue,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { validateName, validatePassword } from "../../libs/validator";
import FormInput from "../form/FormInput";
import FormImages from "../form/FormImages";
interface SettingsProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  user: User;
}

export default function Settings(props: SettingsProps): JSX.Element {
  const maxImages = 1;
  const [sending, setSending] = React.useState<boolean[]>(
    new Array(maxImages).fill(false)
  );
  const [imagesUri, setImagesUri] = React.useState<string[]>(
    new Array(maxImages).fill("")
  );
  const breakpoint = useBreakpoint();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const initialValues = {
    password: "",
    previousPassword: "",
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    avatar: [props.user.avatar],
  };
  function modalSize() {
    switch (breakpoint) {
      case "base":
        return "full";
      default:
        return "xl";
    }
  }

  function submitChangeInfo(values: FormikValues) {
    setLoading(true);
    const imgs = imagesUri.filter((i) => i !== "");

    axios({
      method: "POST",
      url: "/api/changeAccountInfo",

      data: {
        id: props.user.id,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        avatar: imgs[0],
      },
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
  function submitChangePassword(values: FormikValues) {
    setLoading(true);
    axios({
      method: "POST",
      url: "/api/changePassword",

      data: {
        id: props.user.id,
        password: values.password,
        previousPassword: values.previousPassword,
      },
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
      <ModalContent
        backgroundColor={useColorModeValue("light.primary1", "dark.primary1")}
      >
        <ModalHeader>
          Ustawienia konta {props.user.firstName} {props.user.lastName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gap="5" templateRows={"auto auto"} justifyContent="stretch">
            <Box
              boxShadow={"md"}
              padding="3"
              borderRadius={"lg"}
              backgroundColor={useColorModeValue(
                "light.primary3",
                "dark.primary3"
              )}
            >
              <Text fontSize={{ base: "xl", md: "2xl" }} mb="2">
                Zmień hasło
              </Text>
              <Flex justifyContent={"center"}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitChangePassword}
                >
                  <Form>
                    <Flex flexDir={"column"} gap="2">
                      <FormInput
                        name="previousPassword"
                        label="Podaj obecne hasło"
                        isPassword
                      />
                      <FormInput
                        name="password"
                        label="Podaj nowe hasło"
                        validator={validatePassword}
                        isPassword
                      />

                      <Button
                        colorScheme={"red"}
                        type="submit"
                        isLoading={loading}
                      >
                        Zmień hasło
                      </Button>
                    </Flex>
                  </Form>
                </Formik>
              </Flex>
            </Box>
            <Box
              boxShadow={"md"}
              padding="3"
              borderRadius={"lg"}
              backgroundColor={useColorModeValue(
                "light.primary3",
                "dark.primary3"
              )}
            >
              <Text fontSize={{ base: "xl", md: "2xl" }} mb="2">
                Zmień dane
              </Text>
              <Flex justifyContent={"center"}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitChangeInfo}
                >
                  <Form>
                    <Flex flexDir={"column"} gap="2">
                      <FormInput
                        name="firstName"
                        label="Imię"
                        validator={validateName}
                      />
                      <FormInput
                        name="lastName"
                        label="Nazwisko"
                        validator={validateName}
                      />
                      <FormImages
                        name="avatar"
                        label="Zdjęcie profilowe"
                        imagesUri={imagesUri}
                        setImagesUri={setImagesUri}
                        maxImages={maxImages}
                        setSending={setSending}
                        sending={sending}
                      />

                      <FormInput
                        name="password"
                        label="Podaj obecne hasło"
                        isPassword
                      />
                      <Button
                        colorScheme={"red"}
                        type="submit"
                        isLoading={loading}
                      >
                        Zmień dane
                      </Button>
                    </Flex>
                  </Form>
                </Formik>
              </Flex>
            </Box>
            <Box
              boxShadow={"md"}
              padding="3"
              borderRadius={"lg"}
              backgroundColor={useColorModeValue(
                "light.primary3",
                "dark.primary3"
              )}
            >
              <Text fontSize={{ base: "xl", md: "2xl" }} mb="2">
                Usuń konto
              </Text>
              <Flex justifyContent={"center"}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitDeleteAccount}
                >
                  <Form>
                    <Flex flexDir={"column"} gap="2">
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
                    </Flex>
                  </Form>
                </Formik>
              </Flex>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
