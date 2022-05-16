/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Auction, User } from "@prisma/client";
import { MDEditorProps } from "@uiw/react-md-editor";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import {
  validateName,
  validatePrice,
  validateSelect,
} from "../../libs/validator";
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
import NextButton from "../NextButton";
const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface AddAuctionProps {
  user: User;

  modify?: Auction;
  admin?: boolean;
}

export default function AddAuction(props: AddAuctionProps): JSX.Element {
  const maxImages = 10;
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
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
  const [ending, setEnding] = React.useState<boolean>(false);
  const [endingSuccess, setEndingSuccess] = React.useState<string>("");
  const [endingError, setEndingError] = React.useState<string>("");

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
  const modifyValues: FormikValues = {
    bidding: props.modify?.bidding || false,
    categoryId: props.modify?.categoryId || 0,
    dateEnd: props.modify?.dateEnd
      ? new Date(parseInt(props.modify?.dateEnd))
          .toISOString()
          .replace(/:[0-9]{0,2}\..+$/, "")
      : new Date(
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
    image: props.modify?.image || [],
    markdown: props.modify?.markdown || "",
    name: props.modify?.name || "",
    originalPrice: props.modify?.originalPrice || null,
    price: (props.modify?.price as any) || ("" as any),
    sellerId: props.modify?.sellerId || props.user.id,
    url: props.modify?.url || "",
    timesBought: props.modify?.timesBought || 0,
    usersBought: props.modify?.usersBought || 0,
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
    function add() {
      setLoading(true);
      const imgs = imagesUri.filter((i) => i !== "");
      axios({
        url: "/api/addAuction",
        method: "post",
        data: { ...values, markdown: md, image: imgs },
      }).then(
        (ful) => {
          router.push(`/auction/${ful.data.url}`);
          setLoading(false);
        },
        (_rej) => {
          setError("Coś poszło nie tak, spróbuj ponownie");
          setLoading(false);
        }
      );
    }
    function modify() {
      setLoading(true);
      axios({
        url: "/api/modifyAuction",
        method: "post",
        data: { ...values, markdown: md, id: props.modify?.id },
      }).then(
        (ful) => {
          router.push(`/auction/${ful.data.url}`);
          setLoading(false);
        },
        (_rej) => {
          setError("Coś poszło nie tak, spróbuj ponownie");
          setLoading(false);
        }
      );
    }
    function admin() {
      setLoading(true);
      axios({
        url: "/api/admin/modifyAuction",
        method: "post",
        data: { ...values, markdown: md, id: props.modify?.id },
      }).then(
        (ful) => {
          router.push(`/auction/${ful.data.url}`);
          setLoading(false);
        },
        (_rej) => {
          setError("Coś poszło nie tak, spróbuj ponownie");
          setLoading(false);
        }
      );
    }
    props.modify ? (props.admin ? admin() : modify()) : add();
  }

  return (
    <Formik
      initialValues={props.modify ? modifyValues : initialValues}
      onSubmit={handleOnSubmit}
    >
      <Flex margin="5" justifyContent={"center"} alignItems="center">
        <Stack minW={{ base: "full", md: "50vw" }}>
          {props.modify && parseInt(props.modify.dateEnd) > Date.now() ? (
            endingSuccess ? (
              <NextButton href="/">Wróć do strony głównej</NextButton>
            ) : (
              <Button
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  setEnding(true);
                  axios({
                    url: "/api/endAuction",
                    method: "post",
                    data: { id: props.modify?.id },
                  }).then(
                    (res) => {
                      if (res.status === 200) {
                        setEndingSuccess("Aukcja została zakończona");
                      } else {
                        setEndingError("Coś poszło nie tak, spróbuj ponownie");
                      }
                    },
                    (rej) => {
                      setEndingError("Coś poszło nie tak, spróbuj ponownie");
                    }
                  );

                  setLoading(false);
                }}
              >
                Zakończ aukcję
              </Button>
            )
          ) : null}
          {ending ? (
            endingSuccess || endingError ? (
              <FormMessage success={endingSuccess} error={endingError} />
            ) : (
              <Flex justifyContent={"center"} alignItems="center">
                <Spinner />
              </Flex>
            )
          ) : (
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
              {props.modify ? null : (
                <FormImages
                  name="images"
                  label="Zdjęcia"
                  setImagesUri={setImagesUri}
                  imagesUri={imagesUri}
                  maxImages={maxImages}
                  setSending={setSending}
                  sending={sending}
                />
              )}
              {/* <Box>Kategoria!!!</Box> */}
              <FormSelect
                name="categoryId"
                label="Kategoria"
                categories={categories}
                validator={validateSelect}
              />
              <Text fontWeight={"semibold"} py="2">
                Opis
              </Text>
              <Box borderRadius={"md"} overflow="hidden" shadow={"md"}>
                <div
                  data-color-mode={useColorModeValue("light", "dark")}
                  style={{ overflow: "hidden" }}
                >
                  <div className="wmde-markdown-var"> </div>
                  <MDEditor
                    height={400}
                    value={md}
                    onChange={(value = "") => {
                      setMd(value);
                    }}
                  />
                </div>
              </Box>
              <FormDate
                name="dateEnd"
                label="Koniec aukcji"
                dateTime
                minToday
              />
              <FormMessage error={error} />
              <Button
                type="submit"
                mt="2"
                isLoading={loading || sending.some((s) => s)}
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
                {props.modify ? "Edytuj aukcję" : "Dodaj aukcję"}
              </Button>
            </Form>
          )}
        </Stack>
      </Flex>
    </Formik>
  );
}
