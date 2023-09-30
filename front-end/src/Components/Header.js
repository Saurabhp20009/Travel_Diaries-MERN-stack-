import React from "react";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuHead from "./Menu";
const Header = () => {
   
  let user= localStorage.getItem("user")
  user= JSON.parse(user)
  const navigate=useNavigate()
  const toast=useToast()
  const handleLogout=()=>{
    localStorage.removeItem("user")
    toast({
      title: 'Logout',
      description: "User Logout successfully",
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    navigate('/')
  
  }

  return (
    <Box>
      <Box bg={"red.700"} display={"flex"} justifyContent={"space-between"}>
        <Box
          borderWidth={"2px red.700"}
          color={"white"}
          bg={"red.700"}
          padding={"1%"}
          display={"flex"}
          width={"15%"}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGXk7UiElJzYU-9kRxYtrGiWF96ah7TIDXog&usqp=CAU"
            height={"20px"}
            width={"30px"}
            alt="world icon"
          />
          <Heading as="h4" size="md" padding={"3%"}>
            Travel Diaries
          </Heading>
        </Box>

        <Box width={"60%"}>
          <Box display={"flex"} justifyContent={"space-evenly"} padding={"2%"}>
            <Link padding={"1%"} to={"/"}>
              <Text fontSize="lg" color={"white"} fontWeight={"400"}>
                Home
              </Text>{" "}
            </Link>
            <Link to={"/posts"}>
              <Text fontSize="lg" color={"white"} fontWeight={"400"}>
                Posts
              </Text>{" "}
            </Link>

            {!user ?  <Link to={"/auth"}>
              <Text fontSize="lg" color={"white"} fontWeight={"400"}>
                Auth
              </Text> </Link> :  <MenuHead handleLogout={handleLogout}/> }
          </Box>
        </Box>
      </Box>

      <Outlet />
    </Box>
  );
};

export default Header;
