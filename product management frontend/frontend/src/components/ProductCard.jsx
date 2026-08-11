import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Badge,
  Flex,
  Spinner,
  Center,
  Heading,
} from "@chakra-ui/react";

function ProductCards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={10} px={8}>
      <Heading
        textAlign="center"
        mb={10}
        fontSize="4xl"
        color="gray.800"
      >
        Premium Products
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={8}
      >
        {products.map((product) => (
          <Box
            key={product._id}
            bg="white"
            borderRadius="20px"
            overflow="hidden"
            boxShadow="lg"
            transition="0.3s"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "2xl",
            }}
          >
            <Image
              src={product.image}
              alt={product.title}
              h="250px"
              w="100%"
              objectFit="cover"
            />

            <Box p={5}>
              <Badge
                colorScheme="green"
                borderRadius="full"
                px={3}
                py={1}
                mb={3}
              >
                In Stock
              </Badge>

              <Text
                fontWeight="bold"
                fontSize="xl"
                noOfLines={2}
              >
                {product.title}
              </Text>

              <Flex
                justify="space-between"
                align="center"
                mt={5}
              >
                <Text
                  color="blue.600"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  ₹{product.price}
                </Text>

                <Badge
                  colorScheme="yellow"
                  fontSize="md"
                  p={2}
                  borderRadius="md"
                >
                  ⭐ {product.rating}
                </Badge>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProductCards;