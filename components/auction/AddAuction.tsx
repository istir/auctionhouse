import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { Auction, User } from "@prisma/client";
import { MDEditorProps } from "@uiw/react-md-editor";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import { validateName, validatePrice } from "../../libs/validator";
import FormCheckbox from "../form/FormCheckbox";
import FormInput from "../form/FormInput";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import FormDate from "../form/FormDate";
import axios from "axios";
import FormImages from "../form/FormImages";
const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface AddAuctionProps {
  user: User;
}

export default function AddAuction(props: AddAuctionProps): JSX.Element {
  const [error, setError] = React.useState<string>("");

  const [md, setMd] = React.useState<string>("**Podaj opis**");
  type FormikValues = Omit<Auction, "id" | "buyerId">;
  const initialValues: FormikValues = {
    bidding: false,
    categoryId: 1,
    dateEnd: new Date(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
        new Date().getHours(),
        new Date().getMinutes()
      ).getTime() -
        new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace(/:[0-9]{0,2}\..+$/, ""),
    image: [],
    markdown: "",
    name: "",
    originalPrice: null,
    price: "" as any,
    sellerId: props.user.id,
    url: "",
    timesBought: 0,
    usersBought: 0,
  };
  function handleOnSubmit(values: FormikValues) {
    // console.log("suuubmit");
    // console.log({ ...initialValues, markdown: md });
    // console.log(md);

    axios({
      url: "/api/addAuction",
      method: "post",
      data: { ...values, markdown: md },
    }).then((ful) => {
      console.log(ful.data);
    });
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
          <FormInput
            validator={validatePrice}
            name={"price"}
            label={"Cena"}
            isNumeric
          />
          <Box>obrazki...</Box>
          <FormImages name="images" label="Obrazki" />
          {/* <FormInput validator={} name={} label={}/> */}
          <Text fontWeight={"semibold"} py="2">
            Opis
          </Text>
          <MDEditor
            value={md}
            onChange={(value = "") => {
              setMd(value);
            }}
          />

          <FormDate name="dateEnd" label="Koniec aukcji" dateTime minToday />
          <Button
            type="submit"
            mt="2"
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
            Dodaj aukcję
          </Button>
        </Form>
      </Box>
    </Formik>
  );
}
