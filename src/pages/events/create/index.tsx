import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { ButtonType } from '@/components/buttons/utils';
import BoxtingButton from '@/components/buttons/boxting_button';
import { AddSmallIcon } from '@/components/icons';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';
import { NextPage } from 'next';

// function AddEvent() {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const initialRef = React.useRef();
//   const finalRef = React.useRef();

//   const onSubmitEvent = async () => {};

//   return (
//     <>
//       <BoxtingButton
//         text="Nuevo"
//         typeBtn={ButtonType.primary}
//         onEnter={onOpen}
//         leftIcon={<AddSmallIcon boxSize={4} />}
//       />

//       <Modal
//         preserveScrollBarGap
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//         isCentered
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Crear una votación</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//
//           </ModalBody>

//           <ModalFooter>
//             <BoxtingButton text="Guardar" typeBtn={ButtonType.primary} />

//             <BoxtingButton
//               text="Cancelar"
//               typeBtn={ButtonType.primary}
//               onEnter={onClose}
//             />
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// ReactDOM.render(<DatePicker />, mountNode);

const CreateEventPage: NextPage = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  const data = [
    {
      title: `Votación universitaria - Ingeniería`,
      text: `Lorem  ipsum dolor sit amet, consectetur adipiscing elit ut.`,
      route: `/organization/fundamentals`,
    },
    {
      title: `Votación universitaria - Arquitectura`,
      text: `Lorem  ipsum dolor sit amet, consectetur adipiscing elit ut.`,
      route: `/organization/fundamentals`,
    },
    {
      title: `Votación universitaria - Derecho`,
      text: `Lorem  ipsum dolor sit amet, consectetur adipiscing elit ut.`,
      route: `/organization/fundamentals`,
    },
    {
      title: `Votación universitaria - Medicina`,
      text: `Lorem  ipsum dolor sit amet, consectetur adipiscing elit ut.`,
      route: `/organization/fundamentals`,
    },
  ];

  function onChange(date, dateString): void {
    console.log(date, dateString);
  }

  return (
    <Box>
      <PageTitle
        title="Crear votación"
        description="En esta sección se deberá poder ver, crear, editar y eliminar las diferentes listas y datos que sirven de base para los demás módulos de la plataforma."
        onBackClick={() => router.push(`/events/`)}
        enableBackIcon
      />
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input placeholder="Nombre" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Descripción</FormLabel>
        <Input placeholder="Descripción" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha inicio</FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha fin</FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </FormControl>
      <FormControl mt={4}>
        <BoxtingButton
          typeBtn={ButtonType.primary}
          text="Guardar"
          onEnter={() => console.log('hello')}
        />
      </FormControl>
    </Box>
  );
};

export default dashboardWrapper(CreateEventPage);
export const getServerSideProps = withAuthServerSideProps();
