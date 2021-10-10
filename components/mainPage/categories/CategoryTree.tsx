import { Category } from ".prisma/client";
import { Box, Grid, VStack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

interface CategoryTreeProps {
  categoryId?: number;
}

export default function CategoryTree(props: CategoryTreeProps): JSX.Element {
  // const [state, setstate] = React.useState<>(initialState);
  async function getCategoryById() {
    axios({
      url: "/api/getCategories",
      method: "POST",
      data: { categoryId: props.categoryId },
    }).then(
      (res) => console.log(res),
      (rej) => console.error(rej)
    );
  }
  React.useEffect(() => {
    if (props.categoryId) getCategoryById();
    //   //effect - ComponentDidUpdate
    //   return () => {
    //       //cleanup - ComponentWillUnmount
    //   };
  });
  //   getCategoryById();
  return <Grid>A</Grid>;
}
