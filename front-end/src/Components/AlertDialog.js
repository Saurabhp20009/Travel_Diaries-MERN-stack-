import React, { useContext } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { userContext } from "../userContext";

const AlertDialogBox = ({ isOpen, onClose, cancelRef, id }) => {
  const user = useContext(userContext);

  const handleDelete = async () => {
    console.log(id);
    let result = await axios.delete(
      `http://localhost:5000/post/api//deletepost/${id}`,
      { headers: { Authorization: `bearer ${user.tokenGen}` } }
    );

    if (result.data) {
      window.location.reload(false);
    }
  };

  const handleYes = () => {
    handleDelete();
    onClose();
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want delete this post?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleYes}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
