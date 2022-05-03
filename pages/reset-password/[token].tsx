import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import FormInput from "../../components/form/FormInput";
import FormMessage from "../../components/form/FormMessage";
import Header from "../../components/header/header";
import withSession from "../../libs/ironSession";
import { validatePassword } from "../../libs/validator";
import prisma from "../../prisma/prisma";

interface ResetPasswordPageProps {
  user?: User;
}
export const getServerSideProps: GetServerSideProps = withSession(
  async function ({
    req,
    params,
  }: {
    req: NextApiRequest & { session: Session };
    params: { token: string };
  }) {
    const user = await prisma.user.findUnique({
      where: { verificationToken: params.token },
      select: { verificationToken: true },
    });
    if (user) {
      // const user = await prisma.user.update({
      //   where: { verificationToken: params.token },
      //   data: { verificationToken: null, verified: true },
      // });
      return {
        props: {
          user: user,
        },
      };
    }
    return {
      props: {
        user: null,
      },
    };
  }
);
export default function ResetPasswordPage(
  props: ResetPasswordPageProps
): JSX.Element {
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const initialValues = { password: "", verifyPassword: "" };
  function onSubmit(values: FormikValues) {
    console.log(values);
    setError("");
    setSuccess("");
    setLoading(true);
    if (values.password.length < 3 || values.verifyPassword.length < 3)
      return setError("Hasło musi mieć conajmniej 3 znaki");
    if (values.password !== values.verifyPassword)
      return setError("Hasła nie są identyczne");
    if (!props.user) {
      return setError("Nieprawidłowy token");
    }
    axios({
      url: "/api/resetPassword",
      method: "POST",
      data: { password: values.password, token: props.user.verificationToken },
    }).then(
      (ful) => {
        setSuccess("Hasło zresetowane poprawnie!");
        router.push("/");
      },
      (err) => {
        setError("Coś poszło nie tak, sprawdź dane i spróbuj ponownie później");
      }
    );
    setLoading(false);
  }
  return (
    <Box>
      <Header />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Flex margin="5" justifyContent={"center"} alignItems="center">
            <Stack minW={{ base: "full", md: "50vw" }}>
              <FormInput
                label="Hasło"
                name="password"
                isPassword
                validator={validatePassword}
              />
              <FormInput
                label="Powtórz hasło"
                name="verifyPassword"
                isPassword
              />
              <FormMessage success={success} error={error} />
              <Flex justifyContent={"center"}>
                <Button type="submit">Zresetuj hasło!</Button>
              </Flex>
            </Stack>
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
}
