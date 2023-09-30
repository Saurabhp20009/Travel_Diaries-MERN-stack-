import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import { userContext } from "../userContext";

const Posts = () => {
  const [Posts, setPosts] = useState([]);
  const user = useContext(userContext);

  useEffect(
    () =>
      async function () {
        let result = await axios.get(
          "http://localhost:5000/post/api/getallposts",
          { headers: { Authorization: `bearer ${user.tokenGen}` } }
        );

        setPosts(result.data);
      },
    []
  );

  return (
    <Box padding={"2%"}>
      <Box display={"-ms-grid"} rowGap={"100vh"} padding={"1%"}>
        {Posts.map((item, index) => (
          <PostCard
            name={item.name}
            imageDir={item.imageDir}
            date={item.date}
            desc={item.desc}
            id={item._id}
            userName={item.userName}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Posts;
