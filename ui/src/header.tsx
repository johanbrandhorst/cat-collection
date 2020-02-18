import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import { useAuth0 } from "./utils/auth0";

const Header: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const { loginWithPopup, logout, isAuthenticated } = useAuth0();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.300"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="lg">
            Cat collection
          </Heading>
        </Link>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{
          base: show ? "block" : "none",
          md: "flex"
        }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Box mt={{ base: 4, md: 0 }} mr={6} display="block">
          <Link to="/cats">
            <Text>My Cats</Text>
          </Link>
        </Box>
        <Box mt={{ base: 4, md: 0 }} mr={6} display="block">
          <Link to="/account">
            <Text>My account</Text>
          </Link>
        </Box>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          bg="transparent"
          border="1px"
          onClick={async () => await loginWithPopup()}
          display={isAuthenticated ? "none" : "block"}
        >
          Sign in
        </Button>
        <Button
          bg="transparent"
          border="1px"
          onClick={() => logout()}
          display={isAuthenticated ? "block" : "none"}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
