import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Text,
  Heading,
  Badge,
  Spinner,
  Center,
} from "@chakra-ui/react";


function ProductTable({ source }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchProducts();

  }, [source]);



  const fetchProducts = async () => {

    try {

      setLoading(true);

      let response;


      if(source === "mongodb"){

        response = await axios.get(
          "http://localhost:3000/products"
        );

      }
      else{

        response = await axios.get(
          "https://fakestoreapi.com/products"
        );

      }


      setProducts(response.data);


    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };




  if(loading){

    return(
      <Center h="100vh">
        <Spinner size="xl"/>
      </Center>
    );

  }



  return (

    <Box
      bg="gray.100"
      minH="100vh"
      p={10}
    >


      <Heading
        textAlign="center"
        mb={8}
        color="blue.700"
      >

        {
          source === "mongodb"
          ? "MongoDB Products"
          : "Fake Store Products"
        }

      </Heading>



      <Box
        bg="white"
        p={6}
        borderRadius="20px"
        boxShadow="2xl"
      >


        <TableContainer>

          <Table>


            <Thead bg="blue.600">

              <Tr>

                <Th color="white">
                  Image
                </Th>


                <Th color="white">
                  Title
                </Th>


                <Th color="white">
                  Price
                </Th>


                <Th color="white">
                  Rating
                </Th>

              </Tr>

            </Thead>



            <Tbody>


              {
                products.map((product)=>(


                  <Tr
                    key={product._id || product.id}
                  >


                    <Td>

                      <Image

                        src={product.image}

                        boxSize="80px"

                        objectFit="contain"

                      />

                    </Td>



                    <Td>

                      <Text
                        fontWeight="bold"
                      >

                        {product.title}

                      </Text>

                    </Td>




                    <Td>

                      <Text
                        color="green.600"
                        fontWeight="bold"
                      >

                        ₹ {product.price}

                      </Text>

                    </Td>




                    <Td>

                      <Badge
                        colorScheme="yellow"
                        p={2}
                      >

                        ⭐ {
                          typeof product.rating === "object"
                          ?
                          product.rating.rate
                          :
                          product.rating
                        }

                      </Badge>

                    </Td>



                  </Tr>


                ))
              }



            </Tbody>


          </Table>


        </TableContainer>


      </Box>


    </Box>

  );

}


export default ProductTable;