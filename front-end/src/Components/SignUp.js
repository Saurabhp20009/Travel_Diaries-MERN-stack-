import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ handleChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async () => {
    console.log(name, email, password, confirmPassword);
    if (!name || !email || !password || !confirmPassword) {
      return toast({
        title: "Invalid credentials",
        description: "Please check the fields",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else if (password !== confirmPassword) {
      return toast({
        title: "Invalid credentials",
        description: "Password doesn't match",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    let result = await axios.post("http://localhost:5000/user/api/signup", {
      name,
      email,
      password,
    });
    if (!result.data.resultDB._id) {
      return toast({
        title: "Invalid credentials",
        description: result.data,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    toast({
      title: "Signup Successful",
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
        padding={"0%"}
      >
        <FormControl display={"flex"} flexDirection={"column"} padding={"3%"}>
          <Heading size={"md"} color={"#9b2c2c"}>
            SignUp
          </Heading>
          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Name
            </FormLabel>
            <Input
              type="text"
              border={"1px solid #9b2c2c"}
              borderRadius={"2px"}
              fontSize={"14px"}
              placeholder="Enter the name"
              value={name}
              _placeholder={{ color: " #9b2c2c" }}
              color={"9b2c2c"}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
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
          <Box margin={"1%"}>
            <FormLabel fontWeight={"500"} color={"#9b2c2c"}>
              Confirm Password
            </FormLabel>
            <InputGroup>
              {" "}
              <Input
                type={!show ? "password" : "text"}
                border={"1px solid #9b2c2c"}
                borderRadius={"2px"}
                placeholder="Enter the confirm password"
                value={confirmPassword}
                _placeholder={{ color: " #9b2c2c" }}
                color={"#9b2c2c"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  size={"sm"}
                  h="1.75rem"
                  border={"1px solid #9b2c2c"}
                  borderRadius={"2px"}
                  bg={"white"}
                  onClick={handleClick}
                  color={"#9b2c2c"}
                >
                  {!show ? "Show" : "Hide"}{" "}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box margin={"2.5%"}>
            <Button
              type="submit"
              border={"2px solid  #9b2c2c"}
              borderRadius={"4px"}
              onClick={handleSubmit}
              bg={"white"}
              color={" #9b2c2c"}
              fontWeight={"500"}
            >
              Submit
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
              width={"30%"}
            >
              Change to Login
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SignUp;
