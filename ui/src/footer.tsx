import { Box, Link } from "@chakra-ui/core";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      backgroundColor="gray.400"
      display="flex"
      flexDirection="row-reverse"
      alignItems="flex-start"
      justifyContent="flex-start"
      borderRadius="sm"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        m={2}
      >
        <Link href="https://twitter.com/JohanBrandhorst" isExternal>
          @JohanBrandhorst
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
