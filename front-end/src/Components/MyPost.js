import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../userContext";
import axios from "axios";
import { Box, Button, Heading } from "@chakra-ui/react";
import CustomUserPostCard from "./CustomUserPostCard";
import { useNavigate } from "react-router-dom";

const MyPost = () => {
  const [userPosts, setUserPosts] = useState([]);

  let user = useContext(userContext);
  const navigate = useNavigate();

  useEffect(
    () =>
      async function () {
        let result = await axios.get(
          "http://localhost:5000/post/api/getallposts",
          { headers: { Authorization: `bearer ${user.tokenGen}` } }
        );
        let tempPostArr = [];
        result.data.forEach((element) => {
          if (element.userId === user.resultDB._id) {
            tempPostArr.push(element);
          }
        });
        // console.log(tempPostArr)
        setUserPosts(tempPostArr);
      },
    []
  );

  return (
    <Box padding={"3% 4% 0 4%"}>
      <Box textAlign={"right"}>
        <Heading
          size={"md"}
          display={"inline-block"}
          color={" #9b2c2c"}
          margin={"0 0.8% 0 0"}
        >
          Total Post : {userPosts.length}
        </Heading>
        <Button
          type="button"
          border={"2px solid  #9b2c2c"}
          borderRadius={"4px"}
          bg={"white"}
          _hover={{ bg: "black" }}
          color={" #9b2c2c"}
          fontWeight={"700"}
          onClick={() => navigate("/addpost")}
        >
          Add Post
        </Button>{" "}
      </Box>

      <Box padding={"2%"}>
        {userPosts.map((item, index) => (
          <CustomUserPostCard
            key={index}
            name={item.name}
            imageDir={item.imageDir}
            date={item.date}
            desc={item.desc}
            userId={item.userId}
            userName={item.userName}
            id={item._id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MyPost;
