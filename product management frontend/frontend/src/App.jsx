import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import ProductTable from "./components/ProductTable";

import {
Box,
Input,
Button,
VStack,
Heading,
} from "@chakra-ui/react";

function App() {


const [source, setSource] = useState("mongodb");

const [showAdd, setShowAdd] = useState(false);

const [product, setProduct] = useState({
title: "",
price: "",
rating: "",
image: "",
});


const addProduct = async () => {
try {
await axios.post(
"http://localhost:3000/products",
{
title: product.title,
price: Number(product.price),
rating: Number(product.rating),
image: product.image,
}
);


  alert("Product Added Successfully");

  
  setProduct({
    title: "",
    price: "",
    rating: "",
    image: "",
  });

  setShowAdd(false);

  
  setSource("mongodb");

} catch (error) {
  console.log("Add Product Error:", error);

  if (error.response) {
    alert(
      error.response.data.message ||
      "Failed to add product"
    );
  } else {
    alert("Failed to connect to backend");
  }
}

};



const handleChange = (e) => {
const { name, value } = e.target;


setProduct({
  ...product,
  [name]: value,
});


};



const handleMongoDB = () => {
setShowAdd(false);
setSource("mongodb");
};



const handleFakeStore = () => {
setShowAdd(false);
setSource("fake");
};



const handleAddProduct = () => {
setShowAdd(true);
};



return ( <Box
   minH="100vh"
   bg="gray.50"
 >

  {/* NAVBAR */}

  <Navbar
    setSource={setSource}
    setShowAdd={setShowAdd}
  />

  {/* ADD PRODUCT PAGE */}

  {showAdd ? (

    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={8}
      bg="white"
      borderRadius="20px"
      boxShadow="lg"
    >

      <Heading
        mb={6}
        textAlign="center"
      >
        Add Product
      </Heading>

      <VStack gap={4}>

        {/* PRODUCT TITLE */}

        <Input
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
        />

        {/* PRICE */}

        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        {/* RATING */}

        <Input
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Rating (0 - 5)"
          value={product.rating}
          onChange={handleChange}
        />

        {/* IMAGE URL */}

        <Input
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        />

        {/* SAVE PRODUCT */}

        <Button
          width="100%"
          colorPalette="blue"
          onClick={addProduct}
        >
          Save Product
        </Button>

        {/* BACK TO MONGODB */}

        <Button
          width="100%"
          variant="outline"
          onClick={handleMongoDB}
        >
          Back to MongoDB Products
        </Button>

      </VStack>

    </Box>

  ) : (

    /* PRODUCT TABLE */

    <ProductTable
      source={source}
    />

  )}

</Box>

);
};

export default App;
