import React from 'react';
import Head from 'next/head';

import {
  Box,
  Text,
  Flex,
  Image,
  Center,
  FormControl,
  Input,
  Button
} from "@chakra-ui/core"

const Home: React.FC = () => (

  <div className="container">
    <Head>
      <title>Boxting</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Flex
        height="100%"
        width="100%"
        position="relative"
        display="block"
        userSelect="none"
        fontFamily="sans-serif">
        <Box
          backgroundImage="url(/images/v4.jpg)"
          height="750px"
          width="full"
          backgroundPosition="center"
          backgroundRepeat="no-repeat" >
          <Box
            height="100px"
            width="full"
            position="relative" >
            <Center>
              <Image src="/images/logo5.png" alt="" boxSize="120px" />
            </Center>
          </Box>
          <Box
            height="310px"
            width="full"
            position="relative"
            display="block">
            <Box
              position="relative"
              marginTop="30px"
              display="flex"
              justifyContent="center">
              <Text
                fontWeight="700"
                fontSize="58px" >
                Vota online con Boxting
            </Text>
            </Box>
            <Box
              width="full"
              display="flex"
              justifyContent="center">
              <Box
                position="relative"
                width="750px"
                display="flex"
                justifyContent="center">
                <Text
                  fontWeight="400"
                  fontSize="40px">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit ex nihil ea,
              </Text>
              </Box>
            </Box>
            <Box
              width="full"
              display="flex"
              justifyContent="center" >
              <Box
                marginTop="30px"
                position="relative"
                width="550px">
                <FormControl id="DNI" display="inline-flex">
                  <Input
                    type="text"
                    variant="outline"
                    color='black'
                    _placeholder={{ color: 'gray.500' }}
                    placeholder="Ingrese su correo electrónico"
                    bg="white"
                    size="lg" />
                  <Button
                    marginLeft="10px"
                    bg="black"
                    type="submit"
                    size="lg"
                    color="white"
                    onClick={() => window.location.href = "login"}>
                    Comenzar
                </Button>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box
            width="full"
            height="450px"
            display="flex"
            justifyContent="center"
            position="relative">
            <Box width="850px" height="full">
              <Image src="/images/prueba2.png"></Image>
            </Box>
          </Box>
        </Box>
        <Box
          height="720px"
          width="full"
          backgroundColor="white"
          display="inline-flex"
          justifyContent="center"
          paddingTop="190px">
          <Box
            width="480px"
            height="480px"
            position="relative"
            marginRight="150px">
            <Image src="/images/voto4.png"></Image>
          </Box>
          <Box
            width="400px"
            height="460px"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center">
            <Text
              fontWeight="black"
              fontSize="40px"
              color="black">
              Empieza a votar desde cualquier lugar
          </Text>
            <Text
              marginTop="15px"
              fontSize="20px"
              fontWeight="light"
              color="black">
              Tan solo necesitas un dispositivo con internet, entrar a nuestro aplicativo web o móvil y empezar a votar por tu candidato.
          </Text>
          </Box>
        </Box>
        <Box
          height="640px"
          width="full"
          backgroundColor="gray.100"
          display="inline-flex"
          justifyContent="center"
          paddingTop="90px">
          <Box
            width="400px"
            height="460px"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginRight="150px">
            <Text
              fontWeight="800"
              fontSize="40px"
              color="black">
              Aplicativo fácil de usar
          </Text>
            <Text
              marginTop="15px"
              fontSize="20px"
              fontWeight="light"
              color="black">
              Diseñado de forma que cualquier persona, sin importar su condición, pueda usar el aplicativo sin dificultad alguna
          </Text>
          </Box>
          <Box
            width="480px"
            height="480px"
            position="relative" >
            <Image src="/images/prueba4.png"></Image>
          </Box>
        </Box>
        <Box
          height="600px"
          width="full"
          backgroundColor="white"
          display="inline-flex"
          justifyContent="center"
          paddingTop="90px">
          <Box
            width="520px"
            height="480px"
            position="relative"
            marginRight="150px">
            <Image src="/images/security2.png"></Image>
          </Box>
          <Box
            width="400px"
            height="460px"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center">
            <Text
              fontWeight="black"
              fontSize="40px"
              color="black">
              Total seguridad e integridad
          </Text>
            <Text
              marginTop="15px"
              fontSize="20px"
              fontWeight="light"
              color="black">
              Gracias a la revolucionaria tecnología Blockchain, las votaciones realizadas por nuestros usuarios son 100% seguras e inmodificables
          </Text>
          </Box>
        </Box>
      </Flex>
    </main>

    <footer>
      <Box
        height="360px"
        width="full"
        backgroundColor="white"
        paddingTop="60px"
        display="flex"
        justifyContent="center">
        <Box
          width="900px"
          height="200px"
          display="flex"
          alignItems="center"
          flexDirection="column"
          borderTop="1px"
          borderColor="gray.400">
          <Text
            color="black"
            fontSize="24px"
            fontWeight="light"
            marginTop="60px">
            Votar nunca fue tan fácil, hasta ahora
            </Text>
          <FormControl
            display="flex"
            justifyContent="center"
            marginTop="15px">
            <Button
              bg="pink.600"
              type="submit"
              size="lg"
              justifySelf="center"
              alignSelf="center"
              onClick={() => window.scrollTo(0, 0)}
            >
              Comenzar
              </Button>
          </FormControl>
        </Box>
      </Box>
    </footer>
  </div>
);

export default Home;
