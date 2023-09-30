import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";



const PostCard = ({ name, imageDir, date, desc, id,userName }) => {
  return (
    <Box borderWidth={"3px"} display={"inline-grid"} width={"33.3%"} height={"90vh"}>
      <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar size={"sm"} name={userName} src='https://bit.ly/broken-link'/>

              <Box>
                <Heading size="sm" fontWeight={"580"} >{userName}</Heading>
                <Text fontWeight={"thin"} >{date}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        
        <CardBody>
        
            <Text fontFamily={"fantasy"} fontSize={"lg"} fontWeight={"500"} >
            <img src="https://s.tmimgcdn.com/scr/1200x627/284700/location-point-icon-vector-illustration-v4_284781-original.jpg" height={"40px"} width={"40px"} padding={"0px"} alt="location icon" style={{display:"inline"}}  />  Location    :  <Text display={"inline-block"}  >{name}</Text>  
            </Text>
           
          <Text marginTop={"5%"} fontSize={"md"} >
             Description:  {desc}
          </Text>
        </CardBody>
       
       <Box padding={"4%"} >
       <Image
          objectFit="fill"
          src={imageDir}
          width={"200px"}
          height={"200px"}
          marginLeft={"auto"}
          marginRight={"auto"}
          boxShadow={"0px 0px 5px"}
          alt="Chakra UI"
        />
       </Box>
      </Card>
    </Box>
  );
};

export default PostCard;
