import {
Box,
Button,
Container,
Flex,
Heading,
HStack,
} from "@chakra-ui/react";

function Navbar({ setSource, setShowAdd }) {

// MongoDB Products
const handleMongoDB = () => {
setShowAdd(false);
setSource("mongodb");
};

// Fake Store Products
const handleFakeStore = () => {
setShowAdd(false);
setSource("fake");
};

// Add Product
const handleAddProduct = () => {
setShowAdd(true);
};

return ( <Box bg="blue.600" py={4}>

```
  <Container maxW="container.xl">

    <Flex
      justify="space-between"
      align="center"
      gap={4}
    >

      {/* LOGO */}

      <Heading
        color="white"
        size="lg"
      >
        Product Management
      </Heading>

      {/* BUTTONS */}

      <HStack gap={4}>

        {/* MONGODB PRODUCTS */}

        <Button
          bg="white"
          color="blue.600"
          onClick={handleMongoDB}
        >
          MongoDB Products
        </Button>

        {/* FAKE STORE PRODUCTS */}

        <Button
          colorPalette="teal"
          onClick={handleFakeStore}
        >
          Fake Store Products
        </Button>

        {/* ADD PRODUCT */}

        <Button
          colorPalette="orange"
          onClick={handleAddProduct}
        >
          + Add Item
        </Button>

      </HStack>

    </Flex>

  </Container>

</Box>


);
}

export default Navbar;
