import { Box } from "@chakra-ui/react";
import { User } from "@prisma/client";
import React from "react";

interface AddAuctionProps {
  user?: User;
}

export default function AddAuction(props: AddAuctionProps): JSX.Element {
  console.log(props.user);
  return <Box>Formik...</Box>;
}
