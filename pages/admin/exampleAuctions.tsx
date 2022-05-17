import { Box, Button, Text } from "@chakra-ui/react";
import { Admin } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import React from "react";
import AdminHeader from "../../components/AdminHeader";
import FormMessage from "../../components/form/FormMessage";
import { exampleAuctions } from "../../example-auctions";

import withAdminSession from "../../libs/admin/adminIronSession";
import checkIfAdminTokenValidAndRefresh from "../../libs/admin/checkIfAdminTokenValidAndRefresh";
import prisma from "../../prisma/prisma";

interface AdminAddAdminPageProps {
  token: string;
  admin: Admin;
  currentExampleAuctions: number;
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
    const currentExampleAuctions = await prisma.auction.findMany({
      where: {
        sellerId: 79,
        OR: [
          { dateEnd: { gt: Date.now().toString() } },
          { buyerId: { not: null } },
        ],
      },
    });
    if (token) {
      return {
        props: {
          token: token.token,
          admin: token.user,
          currentExampleAuctions: currentExampleAuctions.length,
        },
      };
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
  const [deleted, setDeleted] = React.useState<boolean>(
    props.currentExampleAuctions < 1
  );
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
  function onSubmit() {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      // props.setLoading?.(true);
      axios.post("/api/admin/addExampleAuctions").then(
        (ful) => {
          console.log(ful.data);

          if (ful.status == 200) {
            if (ful.data === "Success") {
              setSuccess("Dodano aukcje");
              setLoading(false);
            } else if (ful.data === "Some failed") {
              setSuccess("Dodano aukcje, ale niektóre nie zostały dodane");
              setError("Niektóre aukcje nie zostały dodane");
              setLoading(false);
            } else if (ful.data === "Error") {
              setLoading(false);
              setError("Błąd dodawania aukcji");
            } else {
              setLoading(false);
              setError(`Coś poszło nie tak`);

              // ful.data?.status ? setError(ful.data.status) : setError(ful.data);
            }
          }
          // ful.status=200&&ful.statusText='OK'&&props?.refresh()&&props?.closePopup();
        },
        (rej) => {
          console.error(rej);
          setError(
            "Ups, coś poszło nie tak! Sprawdź dane logowania i spróbuj ponownie."
          );
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  function onSubmitEnd() {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      // props.setLoading?.(true);
      axios.post("/api/admin/endExampleAuctions").then(
        (ful) => {
          console.log(ful.data);

          if (ful.status == 200) {
            setSuccess("Usunięto aukcje");
            setDeleted(true);
            setLoading(false);

            // ful.data?.status ? setError(ful.data.status) : setError(ful.data);
          }
          // ful.status=200&&ful.statusText='OK'&&props?.refresh()&&props?.closePopup();
        },
        (rej) => {
          console.error(rej);
          setError(
            "Ups, coś poszło nie tak! Sprawdź dane logowania i spróbuj ponownie."
          );
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
      <Box>
        {props.currentExampleAuctions > 0 && !deleted ? (
          <Box>
            <Text>Zakończyć {props.currentExampleAuctions} aukcji?</Text>
            <Button onClick={onSubmitEnd}>Zakończ aukcje</Button>
          </Box>
        ) : deleted ? (
          <Box>
            <Text>Dodać {exampleAuctions.length} aukcji?</Text>
            <Button onClick={onSubmit}>Dodaj aukcje</Button>
          </Box>
        ) : null}
        <FormMessage success={success} error={error} />
      </Box>
    </Box>
  );
}
