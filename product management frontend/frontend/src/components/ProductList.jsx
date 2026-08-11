import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Badge,
  Spinner,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";

function ProductList({ source }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [source]);

  const fetchProducts = async () => {
    try {
      let response;

      if (source === "mongodb") {
        response = await axios.get("http://localhost:3000/products");
      } else {
        response = await axios.get("https://fakestoreapi.com/products");
      }

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box bg="gray.100" minH="100vh" py={10} px={8}>
      <Heading
        textAlign="center"
        mb={10}
        fontSize="4xl"
        color="blue.700"
      >
        Product Collection
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
        {products.map((product) => (
          <Box
            key={product._id || product.id}
            bg="white"
            borderRadius="20px"
            overflow="hidden"
            boxShadow="lg"
            transition="0.3s"
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "2xl",
            }}
          >
            <Image
              src={product.image}
              alt={product.title}
              h="250px"
              w="100%"
              objectFit="contain"
              p={5}
            />

            <Box p={5}>
              <Text
                fontWeight="bold"
                fontSize="lg"
                noOfLines={2}
                minH="55px"
              >
                {product.title}
              </Text>

              <Flex
                justify="space-between"
                align="center"
                mt={4}
              >
                <Text
                  color="green.600"
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  ₹{product.price}
                </Text>

                <Badge
                  colorScheme="yellow"
                  fontSize="15px"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  ⭐{" "}
                  {source === "mongodb"
                    ? product.rating
                    : product.rating.rate}
                </Badge>
              </Flex>

              <Button
                mt={5}
                colorScheme="blue"
                w="100%"
                size="md"
              >
                View Details
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProductList;