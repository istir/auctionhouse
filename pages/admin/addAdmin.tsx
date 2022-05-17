/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import axios from "axios";
import { Form, Formik } from "formik";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import FormInput from "../../components/form/FormInput";
import withAdminSession from "../../libs/admin/adminIronSession";
import checkIfAdminTokenValidAndRefresh from "../../libs/admin/checkIfAdminTokenValidAndRefresh";
import { localizeErrors } from "../../libs/localizeStrings";
import AdminHeader from "../../components/AdminHeader";
import FormMessage from "../../components/form/FormMessage";

interface AdminAddAdminPageProps {
  token: string;
  admin?: Admin;
}

export const getServerSideProps: GetServerSideProps = withAdminSession(
  async function ({ req }: { req: NextApiRequest & { session: Session } }) {
    // return await getUserFromSession(req);
    // const auctions = await prisma.auction.findMany({
    //   where: { dateEnd: "" },
    //   take: 100,
    //   include: { bids: true },
    // });
    // const auctions = (await getRandomAuctions(100, 100)) || [];
    // console.log(auctions);
    const token = await checkIfAdminTokenValidAndRefresh(req.session);

    if (token) {
      return { props: { token: token.token, admin: token.user } };
    } else {
      return { props: { token: "" } };
    }
  }
);
export default function AdminAddAdminPage(
  props: AdminAddAdminPageProps
): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const initialValues = { password: "", email: "" };
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!props.admin) {
      router.push("/admin");
    }
    return () => {
      //cleanup - ComponentWillUnmount
    };
  });
  function onSubmit(values: { password: string; email: string }) {
    try {
      setError("");
      setLoading(true);
      // props.setLoading?.(true);
      axios.post("/api/admin/addAdmin", values).then(
        (ful) => {
          console.log(ful);
          if (ful.status == 200 && ful.data.status === "OK") {
            router.push("/admin");
          } else {
            // TODO: show error
            setLoading(false);
            setSuccess(`Dodano nowego administratora: ${ful.data}`);
            console.log(ful.data);
            // ful.data?.status ? setError(ful.data.status) : setError(ful.data);
          }
          // ful.status=200&&ful.statusText='OK'&&props?.refresh()&&props?.closePopup();
        },
        (rej) => {
          console.error(rej);
          setError(
            "Ups, coś poszło nie tak! Sprawdź dane logowania i spróbuj ponownie."
          ); //! ?
          // TODO: show error
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  if (!props.admin) {
    return <Box></Box>;
  }
  return (
    <Box>
      <AdminHeader admin={props.admin} />
      <Box mx="2">
        <Text
          fontWeight={"bold"}
          fontSize="2xl"
          color="red.500"
          textAlign={"center"}
        >
          Dodawanie nowego administratora
        </Text>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Stack
              maxW={{ base: "100%", md: "70vw" }}
              justifyContent="center"
              alignItems={"center"}
              margin="auto"
            >
              <FormInput
                // validator={validateEmail}
                label="Adres e-mail"
                name="email"
                // isError={setAnyFormikError}
              />

              <FormInput
                // validator={validatePassword}
                label="Hasło"
                name="password"
                isPassword
                // isError={setAnyFormikError}
              />
              <FormMessage
                success={localizeErrors(success)}
                error={localizeErrors(error)}
              />
              <Button
                type="submit"
                mt="2"
                isLoading={loading}
                // colorScheme="blue"
                bg={useColorModeValue(
                  "light.primaryContainer",
                  "dark.primaryContainer"
                )}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "light.tertiaryContainer",
                    "dark.tertiaryContainer"
                  ),
                }}
                // colorScheme={anyFormikError ? "red" : "blue"}
              >
                Dodaj administratora
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}
