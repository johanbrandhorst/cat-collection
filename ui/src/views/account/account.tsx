import React from "react";
import {
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
  Heading,
  SimpleGrid,
  InputLeftAddon,
  Button
} from "@chakra-ui/core";

const Account = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="flex-start"
    p={5}
    textAlign="left"
  >
    <Box>
      <Box>
        <Heading
          size="xl"
          as="h2"
          lineHeight="shorter"
          fontWeight="bold"
          fontFamily="heading"
        >
          My account
        </Heading>
      </Box>
    </Box>
    <SimpleGrid
      spacingX={2}
      spacingY={2}
      minChildWidth={120}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Avatar size="lg" />
      <Box>
        <InputGroup>
          <InputLeftAddon>Email</InputLeftAddon>
          <Input
            size="md"
            as="input"
            variant="outline"
            isFullWidth
            focusBorderColor="blue.500"
            errorBorderColor="red.500"
          />
          <InputRightElement>
            <Icon name="email" />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Button variant="solid" backgroundColor="gray.300">
        Save changes
      </Button>
    </SimpleGrid>
  </Box>
);

export default Account;
