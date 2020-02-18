import { Flex, Badge, Text, Heading } from "@chakra-ui/core";
import React from "react";

const Title: React.FC = () => {
  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt={4}
    >
      <Flex
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Heading
          size="xl"
          as="h2"
          lineHeight="shorter"
          fontWeight="bold"
          fontFamily="heading"
        >
          Cat collection
        </Heading>
        <Badge variant="subtle" variantColor="pink" ml={1}>
          BETA
        </Badge>
      </Flex>
      <Text color="gray.500">Like pokemon but for your pets</Text>
    </Flex>
  );
};

export default Title;
