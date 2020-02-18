import { Box } from "@chakra-ui/core";
import React from "react";
import Title from "./title";
import FeaturedCats from "../cats/featured";

const Body: React.FC = () => {
  return (
    <Box>
      <Title />
      <FeaturedCats />
    </Box>
  );
};

export default Body;
