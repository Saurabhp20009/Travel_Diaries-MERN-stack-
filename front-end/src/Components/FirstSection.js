import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

const FirstSection = () => {
  return (
    <Box>
      <Box
        style={{
          backgroundImage:
            "url('https://www.wallpapertip.com/wmimgs/9-90686_desktop-backgrounds-hd-travel.jpg')",
          height: "90vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "brightness(90%)",
        }}
        textAlign={"center"}
      >
        <Heading
          as="h3"
          size="2xl"
          color={"white"}
          fontWeight={"500"}
          padding={"15% 0 0 0"}
        >
          EXPLORE.DREAM.DISCOVER
        </Heading>
        <br></br>
        <Heading as="h6" size="xl" color={"white"} fontWeight={"300"}>
          This is a world travel blog featuring beautiful destinations, new
          experiences, <br></br> and hidden places around the world.
        </Heading>

        <Box padding={"5% 0 0 0"}>
          <Button
            border={"1px solid white"}
            bg={"transparent"}
            colorScheme="white"
            _hover={{bg:"red.700"}}
            
          >
            START EXPLORING
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FirstSection;
