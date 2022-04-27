import { Box, Button, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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

interface AdminLoginPageProps {
  token: string;
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
      return { props: { token: token.token } };
    } else {
      return { props: { token: "" } };
    }
    // if (token) {
    //   const user = await prisma.user.findUnique({
    //     where: { id: token.user.id },
    //     select: {
    //       avatar: true,
    //       firstName: true,
    //       lastName: true,
    //       cart: { include: { items: true } },
    //       id: true,
    //     },
    //   });
    //   if (user) {
    //     return {
    //       props: {
    //         token: token.token,
    //         user: user,
    //         auctions: auctions ? auctions : [],
    //       },
    //     };
    //   }
    //   return {
    //     props: {
    //       token: token.token,
    //       user: token.user,
    //       auctions: auctions ? auctions : [],
    //     },
    //   };
    // } else {
    //   return { props: { token: "", auctions: auctions ? auctions : [] } };
    // }
  }
);
export default function AdminLoginPage(
  props: AdminLoginPageProps
): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const initialValues = { password: "", email: "" };
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  function onSubmit(values: { password: string; email: string }) {
    try {
      setError("");
      setLoading(true);
      // props.setLoading?.(true);
      axios.post("/api/admin/login", values).then(
        (ful) => {
          console.log(ful);
          if (ful.status == 200 && ful.data.status === "OK") {
            router.push("/admin");
          } else {
            // TODO: show error
            setLoading(false);
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

  return (
    <Box>
      <Text>Logowanie do panelu administracyjnego</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Stack>
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
            <Text color="red.500" fontWeight="bold" mt="2">
              {localizeErrors(error)}
            </Text>
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
              Zaloguj
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
}
