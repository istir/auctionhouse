import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/react";
import React from "react";
import Register from "./register";

interface PopupRegisterProps {
  // refresh: () => void;
  // closePopup: () => void;
  // isModalOpen: boolean;
}

export default function PopupRegister(props: PopupRegisterProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Zarejestruj</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Register
            //  refresh={props.refresh} closePopup={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

// import React from "react";
// import Popup from "reactjs-popup";
// import Login from "./login";
// import Register from "./register";

// export const PopupRegister: React.FC = ({}) => {
//   return (
//     <Popup
//       modal
//       className="popup-modal"
//       {...{
//         contentStyle: {
//           borderRadius: "0.375rem",
//           borderWidth: "2px",
//           borderColor: "rgba(191, 219, 254,1)",
//           minWidth: "fit-content",
//         },
//       }}
//       trigger={
//         <button
//           className={`rounded-md border-2 duration-150 font-semibold border-red-200 bg-red-100 hover:bg-red-400 hover:border-red-500 `}
//         >
//           Zarejestruj
//         </button>
//       }
//     >
//       <Register />
//     </Popup>
//   );
// };
// export default PopupRegister;
