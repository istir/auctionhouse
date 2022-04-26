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
import { useRouter } from "next/router";
const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface AddAuctionProps {
  user: User;
}

export default function AddAuction(props: AddAuctionProps): JSX.Element {
  const maxImages = 10;
  const router = useRouter();
  const [error, setError] = React.useState<string>("");
  const [sending, setSending] = React.useState<boolean[]>(
    new Array(maxImages).fill(false)
  );
  const [imagesUri, setImagesUri] = React.useState<string[]>(
    new Array(maxImages).fill("")
  );
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
        new Date().getTimezoneOffset() * 60000 +
        600000
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
    console.log(imagesUri);
    const imgs = imagesUri.filter((i) => i !== "");
    // return;
    axios({
      url: "/api/addAuction",
      method: "post",
      data: { ...values, markdown: md, image: imgs },
    }).then((ful) => {
      router.push(`/auction/${ful.data.url}`);
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
          <FormImages
            name="images"
            label="Zdjęcia"
            setImagesUri={setImagesUri}
            imagesUri={imagesUri}
            maxImages={maxImages}
            setSending={setSending}
            sending={sending}
          />
          <Box>Kategoria!!!</Box>
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
            isLoading={sending.some((s) => s)}
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
