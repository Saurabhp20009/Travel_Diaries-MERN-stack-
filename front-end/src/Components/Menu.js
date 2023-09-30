import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { userContext } from "../userContext";
import { Link } from "react-router-dom";
const MenuHead = ({handleLogout}) => {

    const user= useContext(userContext)
    return (
    <Menu>
      <MenuButton as={Avatar} colorScheme="pink" size={"sm"}>
      </MenuButton>
      <MenuList>
        <MenuGroup title={user.resultDB.name}>
          <Link to={"/mypost"}><MenuItem>My Posts</MenuItem></Link> 
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default MenuHead;
