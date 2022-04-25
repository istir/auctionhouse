import { Box } from "@chakra-ui/react";
import { Auction, User } from "@prisma/client";
import { Form, Formik } from "formik";
import React from "react";
import { validateName, validatePrice } from "../../libs/validator";
import FormCheckbox from "../form/FormCheckbox";
import FormInput from "../form/FormInput";

interface AddAuctionProps {
  user: User;
}

export default function AddAuction(props: AddAuctionProps): JSX.Element {
  const [error, setError] = React.useState<string>("");
  type FormikValues = Omit<Auction, "id" | "buyerId">;
  const initialValues: FormikValues = {
    bidding: false,
    categoryId: 0,
    dateEnd: Date.now().toString(),
    image: [],
    markdown: "",
    name: "",
    originalPrice: null,
    price: 0,
    sellerId: props.user.id,
    url: "",
    timesBought: 0,
    usersBought: 0,
  };
  function handleOnSubmit() {
    console.log("suuubmit");
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
      <Box>
        <Form>
          <FormInput
            validator={validateName}
            name={"name"}
            label={"Nazwa aukcji"}
          />
          <FormCheckbox label="Licytacja" name="bidding" />
          <FormInput validator={validatePrice} name={"price"} label={"Cena"} />
          <Box>obrazki...</Box>
          {/* <FormInput validator={} name={} label={}/> */}
        </Form>
      </Box>
    </Formik>
  );
}
