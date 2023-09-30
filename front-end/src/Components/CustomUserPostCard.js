import {
  Box,
  Input,
  useToast,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import AlertDialogBox from "./AlertDialog";
import { userContext } from "../userContext";
const CustomUserPostCard = ({
  name,
  imageDir,
  date,
  desc,
  userId,
  userName,
  id,
}) => {
  const [location, setLocation] = useState(name);
  const [description, setDescription] = useState(desc);
  const [edit, setEdit] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const user = useContext(userContext);

  const handleSave = async () => {
    console.log(location, description);
    if (!location || !description) {
      return toast({
        title: "Error",
        description: "Please check the fields",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    let name = location;
    let desc = description;
    let result = await axios.put(
      `http://localhost:5000/post/api/editpost/${id}`,
      {
        name,
        imageDir,
        date,
        desc,
        userId,
        userName,
      },
      { headers: { Authorization: `bearer ${user.tokenGen}` } }
    );
    console.log(result);
    setEdit(!edit);
    window.location.reload(false);
  };

  return (
    <Box
      margin={"0.5%"}
      boxShadow={"0px 0px 2px"}
      borderRadius={"3px"}
      padding={"1%"}
    >
      <AlertDialogBox
        id={id}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="fill"
          maxW={{ base: "100%", sm: "200px" }}
          src={imageDir}
          alt="Caffe Latte"
          padding={"1%"}
        />

        <Stack>
          <CardBody>
            {!edit ? (
              <Heading size="md">Location : {name}</Heading>
            ) : (
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                border={"1px solid #9b2c2c"}
              />
            )}
            <Heading size="xs" fontWeight={"380"} margin={!edit ? "1%" : "3%"}>
              Date {date}
            </Heading>

            {!edit ? (
              <Text py="2">Desc : {desc}</Text>
            ) : (
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                border={"1px solid #9b2c2c"}
              />
            )}
          </CardBody>

          <CardFooter>
            {!edit ? (
              <Button
                border={"2px solid  #9b2c2c"}
                borderRadius={"4px"}
                bg={"white"}
                _hover={{ bg: "black" }}
                color={" #9b2c2c"}
                fontWeight={"700"}
                margin={"1%"}
                onClick={() => setEdit(!edit)}
              >
                Edit Post
              </Button>
            ) : (
              <Button
                border={"2px solid  #9b2c2c"}
                borderRadius={"4px"}
                bg={"white"}
                _hover={{ bg: "black" }}
                color={" #9b2c2c"}
                fontWeight={"700"}
                margin={"1%"}
                onClick={handleSave}
              >
                Save Post
              </Button>
            )}
            <Button
              border={"2px solid  #9b2c2c"}
              borderRadius={"4px"}
              bg={"white"}
              _hover={{ bg: "black" }}
              color={" #9b2c2c"}
              fontWeight={"700"}
              margin={"1%"}
              onClick={onOpen}
            >
              Delete Post
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
};

export default CustomUserPostCard;
