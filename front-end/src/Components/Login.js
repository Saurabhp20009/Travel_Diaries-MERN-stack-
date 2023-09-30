import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    console.log(email, password);
    if (!email || !password) {
      return toast({
        title: "Invalid credentials",
        description: "Please check the fields",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    let result = await axios.post("http://localhost:5000/user/api/login", {
      email,
      password,
    });
    if (!result.data.resultDB._id) {
      return toast({
        title: "Invalid credentials",
        description: "user doesn't exist",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    toast({
      title: "Login Successful",
      description: "Success",
      status: "success",
      duration: 1000,
      isClosable: true,
    });

    localStorage.setItem("user", JSON.stringify(result.data));
    navigate("/");
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
            Login
          </Heading>

          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Email
            </FormLabel>
            <Input
              type="email"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              _placeholder={{ color: " #9b2c2c" }}
            />
          </Box>
          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Password
            </FormLabel>
            <Input
              type="text"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              placeholder="Enter the password"
              value={password}
              _placeholder={{ color: " #9b2c2c" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box margin={"2.5%"}>
            <Button
              type="submit"
              border={"2px solid  #9b2c2c"}
              borderRadius={"4px"}
              onClick={handleLogin}
              bg={"white"}
              color={" #9b2c2c"}
              fontWeight={"500"}
            >
              Login
            </Button>
          </Box>
          <Box textAlign={"right"} color={"blue"}>
            <Button
              type="button"
              border={"2px solid  #9b2c2c"}
              borderRadius={"4px"}
              onClick={handleChange}
              bg={"white"}
              _hover={{ bg: "black" }}
              color={" #9b2c2c"}
              fontWeight={"700"}
              width={"35%"}
            >
              Change to SignUp
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Login;
