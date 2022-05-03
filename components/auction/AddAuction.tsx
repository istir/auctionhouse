import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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
import FormMessage from "../form/FormMessage";
import FormSelect from "../form/FormSelect";
const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface AddAuctionProps {
  user: User;
}

export default function AddAuction(props: AddAuctionProps): JSX.Element {
  const maxImages = 10;
  const router = useRouter();
  const [categories, setCategories] = React.useState<
    {
      id: number;
      name: string;
      categories: {
        id: number;
        name: string;
      }[];
    }[]
  >([]);
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
    categoryId: 0,
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

  React.useEffect(() => {
    axios({ url: "/api/getCategories" }).then((ful) => {
      if (Array.isArray(ful.data) && ful.data.length > 0) {
        setCategories(ful.data);
      }
    });
    return () => {
      //cleanup - ComponentWillUnmount
    };
  }, []);

  function handleOnSubmit(values: FormikValues) {
    const imgs = imagesUri.filter((i) => i !== "");
    axios({
      url: "/api/addAuction",
      method: "post",
      data: { ...values, markdown: md, image: imgs },
    }).then(
      (ful) => {
        router.push(`/auction/${ful.data.url}`);
      },
      (_rej) => {
        setError("Coś poszło nie tak, spróbuj ponownie");
      }
    );
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
      <Flex margin="5" justifyContent={"center"} alignItems="center">
        <Stack minW={{ base: "full", md: "50vw" }}>
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
            {/* <Box>Kategoria!!!</Box> */}
            <FormSelect
              name="categoryId"
              label="Kategoria"
              categories={categories}
            />
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
            <FormMessage error={error} />
            <Button
              type="submit"
              mt="2"
              isLoading={sending.some((s) => s)}
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
            >
              Dodaj aukcję
            </Button>
          </Form>
        </Stack>
      </Flex>
    </Formik>
  );
}
