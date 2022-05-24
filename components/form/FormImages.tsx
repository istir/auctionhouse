import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import getConfig from "next/config";
interface FormImagesProps {
  name: string;
  label: string;
  imagesUri: string[];
  maxImages: number;
  setImagesUri: (imagesUri: string[]) => void;
  setSending: (prevSending: boolean[]) => void;
  sending: boolean[];
}

export default function FormImages(props: FormImagesProps): JSX.Element {
  const [images, setImages] = React.useState<ImageListType>([]);
  const bgColor = useColorModeValue("light.primary1", "dark.primary1");
  return (
    <Box>
      <Text fontWeight={"semibold"} py="2">
        {props.label}
      </Text>
      <ReactImageUploading
        multiple
        value={images}
        onChange={(
          value: ImageListType,
          addUpdatedIndex?: number[] | undefined
        ) => {
          // console.log(value, addUpdatedIndex);
          setImages(value);
          if (!addUpdatedIndex) return;
          const dataUri = value[addUpdatedIndex?.[0]].dataURL;
          if (!dataUri) return;
          const formData = new FormData();

          formData.append("image", dataUri.replace(/^.+base64,/, ""));
          // @ts-ignore because prevSending gave errors when it shouldn't
          props.setSending((prevSending: boolean[]) => {
            prevSending[addUpdatedIndex?.[0]] = true;
            return [...prevSending];
          });
          axios({
            url: getConfig().publicRuntimeConfig.IBB_UPLOAD_URL,
            method: "POST",
            data: formData,
          }).then(
            (ful) => {
              if (ful.status === 200 && ful.data.success === true) {
                // @ts-ignore because prevSending gave errors when it shouldn't
                props.setSending((prevSending: boolean[]) => {
                  prevSending[addUpdatedIndex?.[0]] = false;
                  return [...prevSending];
                });

                //@ts-ignore
                props.setImagesUri((prev) => {
                  prev[addUpdatedIndex?.[0]] = ful.data.data.display_url;
                  return [...prev];
                });
              }
            },
            (rej) => {
              // console.log(rej, rej.data);
            }
          );
        }}
        maxNumber={props.maxImages}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <Box>
            <Button
              mb="2"
              colorScheme={isDragging ? "red" : "blue"}
              onClick={onImageUpload}
              {...dragProps}
            >
              Dodaj lub upuść zdjęcie
            </Button>

            <Grid
              templateColumns={
                "repeat(auto-fill,minmax(var(--chakra-sizes-48),1fr))"
              }
            >
              {imageList.map((image, index) => (
                <Flex
                  key={index}
                  borderRadius="lg"
                  overflow={"hidden"}
                  width="48"
                  boxShadow={"md"}
                  pos="relative"
                  backgroundColor={bgColor}
                >
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <Box
                        onClick={() => {
                          //@ts-ignore
                          props.setImagesUri((prev) => {
                            prev[index] = "";
                            return [...prev];
                          });
                          onImageRemove(index);
                        }}
                        pos="absolute"
                        right={"0"}
                        aria-label="Usuń"
                        cursor={"pointer"}
                        color="red.600"
                        transitionDuration={"0.2s"}
                        _hover={{
                          color: "white",
                          boxShadow:
                            "inset 0 0 2px 20px var(--chakra-colors-red-600)",
                        }}
                        borderRadius={"full"}
                      >
                        <FaTimesCircle size="20px" />
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent width={"max-content"}>
                      <PopoverArrow /> <PopoverBody>Usuń</PopoverBody>
                    </PopoverContent>
                  </Popover>
                  {props.sending[index] && (
                    <Flex
                      pos="absolute"
                      left="0"
                      top="0"
                      bottom="0"
                      right="0"
                      justifyContent={"center"}
                      alignItems="center"
                      bg="blackAlpha.600"
                    >
                      <Spinner size={"xl"} />
                    </Flex>
                  )}
                  <Image src={image["dataURL"]} alt="" objectFit={"contain"} />
                </Flex>
              ))}
            </Grid>
          </Box>
        )}
      </ReactImageUploading>
    </Box>
  );
}
