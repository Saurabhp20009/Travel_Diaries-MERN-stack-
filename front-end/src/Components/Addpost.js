import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../userContext";

const Addpost = () => {
  const [name, setName] = useState("");
  const [imageDir, setImageDir] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const user = useContext(userContext);

  const handleAddPost = async () => {
    console.log();
    if (!name || !imageDir || !date || !desc) {
      return toast({
        title: "Invalid credentials",
        description: "Please check the fields",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    let result = await axios.post(
      `http://localhost:5000/post/api/addpost/${user._id}`,
      {
        name,
        imageDir,
        date,
        desc,
      },
      { headers: { Authorization: `bearer ${user.tokenGen}` } }
    );
    if (!result.data) {
      return toast({
        title: "Invalid credentials",
        description: "user doesn't exist",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    toast({
      title: "Successful",
      description: "Added to your posts",
      status: "success",
      duration: 1000,
      isClosable: true,
    });

    navigate("/posts");
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box
        border={"2.5px solid #9b2c2c"}
        borderRadius={"3px"}
        margin={"3% 0 0 0"}
        textAlign={"center"}
        width={"40%"}
        padding={"1%"}
      >
        <FormControl display={"flex"} flexDirection={"column"} padding={"3%"}>
          <Heading size={"md"} color={"#9b2c2c"}>
            Add Post
          </Heading>

          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Location
            </FormLabel>
            <Input
              type="text"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              placeholder="Enter the location"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _placeholder={{ color: " #9b2c2c" }}
            />
          </Box>
          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              imageDir
            </FormLabel>
            <Input
              type="text"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              placeholder="Enter the image source"
              value={imageDir}
              _placeholder={{ color: " #9b2c2c" }}
              onChange={(e) => setImageDir(e.target.value)}
            />
          </Box>

          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Date
            </FormLabel>
            <Input
              type="text"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              placeholder="Enter the date"
              value={date}
              _placeholder={{ color: " #9b2c2c" }}
              onChange={(e) => setDate(e.target.value)}
            />
          </Box>

          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Desc (Not more than 3-4 lines)
            </FormLabel>
            <Input
              type="text"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              placeholder="Enter the description"
              value={desc}
              _placeholder={{ color: " #9b2c2c" }}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Box>

          <Box margin={"2.5%"}>
            <Button
              type="submit"
              border={"2px solid  #9b2c2c"}
              borderRadius={"4px"}
              onClick={handleAddPost}
              bg={"white"}
              color={" #9b2c2c"}
              fontWeight={"500"}
            >
              Add Post
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Addpost;
