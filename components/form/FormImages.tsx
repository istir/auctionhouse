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
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import ReactImageUploading, { ImageListType } from "react-images-uploading";

interface FormImagesProps {
  name: string;
  label: string;
}

export default function FormImages(props: FormImagesProps): JSX.Element {
  const [images, setImages] = React.useState<ImageListType>([]);
  const bgColor = useColorModeValue("light.primary1", "dark.primary1");

  return (
    <Box>
      <ReactImageUploading
        multiple
        value={images}
        // onChange={onChange}
        onChange={(
          value: ImageListType,
          addUpdatedIndex?: number[] | undefined
        ) => {
          console.log(value, addUpdatedIndex);
          setImages(value);
        }}
        maxNumber={5}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <Box>
            <Button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Button>
            <Button onClick={onImageRemoveAll}>Usuń wszystkie</Button>
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
                        //   border="1px solid #fff "

                        borderRadius={"full"}
                      >
                        <FaTimesCircle size="20px" />
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent width={"max-content"}>
                      <PopoverArrow /> <PopoverBody>Usuń</PopoverBody>
                    </PopoverContent>
                  </Popover>

                  <Image src={image["dataURL"]} alt="" objectFit={"contain"} />
                </Flex>
              ))}
            </Grid>
          </Box>
        )}
      </ReactImageUploading>
    </Box>
  );
  // const [field, meta, helpers] = useField({
  //     name: props.name,

  //   });
  // return ( <FormControl isInvalid={meta.error && meta.touched ? true : false}>
  //     <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
  //     <Input
  //       {...field}
  //       // {...props}
  //       id={props.name}
  //       placeholder={props.label}
  //       type={
  //         props.isPassword ? "password" : props.isNumeric ? "number" : "text"
  //       }
  //     />
  //     <FormErrorMessage>{meta.error}</FormErrorMessage>
  //   </FormControl>);
}
