import React from 'react';
import Head from 'next/head';

import {
  Box,
  Text,
  Flex,
  Image,
  Center,
  FormControl,
  HStack,
  Input,
  Button,
  Textarea,
  Checkbox
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
          backgroundImage="url(/images/fondo6.jpg)"
          height="850px"
          width="full"
          position = "relative"
          backgroundPosition="center"
          backgroundRepeat="repeat-x"
          backgroundSize={["1000%", "1000%", "1000%","1000%","100%"]}
          display = "block">
          <Box
            height="80px"
            top  = "15px"
            width="full"
            position="relative"
            display = "inline-flex"
            alignItems = "center"
            justifyContent = "center">
            <Image position = "absolute" boxSize="110px" src="/images/logo5.png" alt="" />
            <Button
              left = "620px"
              justifyContent = "center"
              alignContent = "center"
              justifyItems = "center"
              bg="none"
              type="submit"
              width = "150px"
              color="white"
              border = "2px"
              borderColor = "white"
              onClick={() => window.location.href = "login"}>
              Login
            </Button>
          </Box>
          <HStack 
            spacing="144px">
            <Box
              height="800px"
              width="900px"
              position="relative"
              display="block"
              left = "180px"
              backgroundImage="url(/images/imagen2.png)"
              backgroundSize = "100%"
              backgroundPosition="bottom"
              backgroundRepeat = "no-repeat">
              <Box
                position="relative"
                marginTop="30px"
                display="flex">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "18px", md: "28px", lg: "38px" }}
                  color = "white">
                  Vota online con boxting
                </Text>
              </Box>
              <Box
                width="full"
                display="flex">
                <Box
                  position="relative"
                  width="750px"
                  display="flex">
                  <Text
                    fontWeight="400"
                    fontSize={{ base: "12px", md: "18px", lg: "24px" }}
                    color = "white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum adipisci deleniti rem ad enim, optio delectus ut! Delectus sit eos quia fugiat veritatis adipisci corrupti.
                  </Text>
                </Box>
              </Box>           
            </Box>
            <Box
              height="450px"
              width="550px"
              position="relative"
              display="block"
              paddingLeft = "50px"
              left = "65px"
              top = "-50px"
              boxShadow="0px 1px 5px 2px rgba(0,0,0, 0.4)"
              rounded = "lg"
              paddingTop = "15px"
              paddingRight = "50px">
              <Box
                position="relative"
                marginTop="30px"
                display="block">
                  <Text
                    fontWeight="700"
                    fontSize={{ base: "18px", md: "24px", lg: "32px" }}
                    color = "white">
                    Contáctanos
                  </Text>
                <Box
                  position = "relative"
                  paddingTop = "30px">
                  <FormControl>
                    <Box
                      display = "flex"
                      width = "100%">
                      <Input
                        type="text"
                        variant="outline"
                        color='black'
                        _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                        placeholder="Nombre de empresa"
                        bg="white"
                        size="lg" 
                        borderRadius = "0"/>
                      <Box
                        width = "40px">
                      </Box>
                      <Input
                        type="text"
                        variant="outline"
                        color='black'
                        _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                        placeholder="Correo"
                        bg="white"
                        size="lg" 
                        borderRadius = "0"/>
                    </Box>
                    <Textarea
                      marginTop = "20px"
                      borderRadius = "0"
                      bgColor = "white"
                      _placeholder={{ color: 'gray.400', fontSize: '16px'}}
					            placeholder="Información"
                      size="lg" 
				            />
                    <Box display = "block">
                      <Checkbox 
                        position = "absolute"
                        color = "white"
                        fontSize = "12px">
                          ¿Te gustaría recibir mensajes de Boxting?
                      </Checkbox>
                      <Button
                        marginTop = "40px"
                        justifyContent = "center"
                        bg="black"
                        type="submit"
                        width = "150px"
                        color="white"
                        borderRadius = "0">
                        Solicitar
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </HStack>
        </Box>

        <Box
          height="auto"
          width="full"
          backgroundColor="white"
          display="inline-flex"
          justifyContent="center"
          paddingTop="40px">
            <Text
              fontWeight="black"
              fontSize={{ base: "14px", md: "24px", lg: "40px" }}
              color="black">
              ¿Cómo funciona?
            </Text>
        </Box>
        <Box
          height="680px"
          width="full"
          backgroundColor="white"
          display="inline-flex"
          justifyContent="center"
          paddingTop="110px">
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
              fontSize={{ base: "14px", md: "24px", lg: "40px" }}
              color="black">
              Empieza a votar desde cualquier lugar
          </Text>
            <Text
              marginTop="15px"
              fontSize={{ base: "10px", md: "16px", lg: "20px" }}
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
              fontSize={{ base: "14px", md: "24px", lg: "40px" }}
              color="black">
              Aplicativo fácil de usar
          </Text>
            <Text
              marginTop="15px"
              fontSize={{ base: "10px", md: "16px", lg: "20px" }}
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
              fontSize={{ base: "14px", md: "24px", lg: "40px" }}
              color="black">
              Total seguridad e integridad
          </Text>
            <Text
              marginTop="15px"
              fontSize={{ base: "10px", md: "16px", lg: "20px" }}
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
        height="280px"
        width="full"
        backgroundColor="white"
        paddingTop = "40px"
        display="table"
        justifyContent="center"
        justifyItems = "center"
        alignContent = "center"
        alignItems = "center">
        <Center>
        <Box
          width="900px"
          height="240px"
          display="flex"
          alignItems="center"
          flexDirection="column"

          bgColor = "white">
          <Text
            color="black"
            fontSize="28px"
            fontWeight="light"
            marginTop="60px">
            Votar nunca fue tan fácil, hasta ahora
            </Text>
          <FormControl
            display="flex"
            justifyContent="center"
            marginTop="30px">
            <Button
              bg="#5865f2"
              _hover={{ bg: "#7984fc" }}
              _focus={{ boxShadow: "outline" }}
              type="submit"
              size="lg"
              justifySelf="center"
              alignSelf="center"
              color = "white"
              onClick={() => window.scrollTo(0, 0)}>
              Contáctanos
            </Button>
          </FormControl>
        </Box>          
        </Center>
        <Box
          width="full"
          height="200px"
          display="flex"
          alignItems = "center"
          justifyContent = "center"
          flexDirection="column"
          bgColor = "#23272a">
            <Box
             width="60%"
             height="80px"
             position= "relative"
             top = "20px"
             borderTop="1px"
             borderColor="#5865f2">
               <Box
                position = "relative"
                top = "20px"
                display = "flex">
                  <Text 
                    marginRight = "20px"
                    top = "5px"
                    width = "120px"
                    position = "relative"
                    fontSize = "14px">
                   Disponible en
                  </Text>
                  <svg 
                   xmlns="http://www.w3.org/2000/svg" 
                   width="40" 
                   height="40" 
                   viewBox="32.163 68.509 203.691 228.155">
                     <path d="M101.885 207.092c7.865 0 14.241 6.376 14.241 14.241v61.09c0 7.865-6.376 14.24-14.241 14.24-7.864 0-14.24-6.375-14.24-14.24v-61.09c0-7.864 6.376-14.24 14.24-14.24z" fill="#a4c639"/>
                     <path d="M69.374 133.645c-.047.54-.088 1.086-.088 1.638v92.557c0 9.954 7.879 17.973 17.66 17.973h94.124c9.782 0 17.661-8.02 17.661-17.973v-92.557c0-.552-.02-1.1-.066-1.638H69.374z" fill="#a4c639"/>
                     <path d="M166.133 207.092c7.865 0 14.241 6.376 14.241 14.241v61.09c0 7.865-6.376 14.24-14.241 14.24-7.864 0-14.24-6.375-14.24-14.24v-61.09c0-7.864 6.376-14.24 14.24-14.24zM46.405 141.882c7.864 0 14.24 6.376 14.24 14.241v61.09c0 7.865-6.376 14.241-14.24 14.241-7.865 0-14.241-6.376-14.241-14.24v-61.09c-.001-7.865 6.375-14.242 14.241-14.242zM221.614 141.882c7.864 0 14.24 6.376 14.24 14.241v61.09c0 7.865-6.376 14.241-14.24 14.241-7.865 0-14.241-6.376-14.241-14.24v-61.09c0-7.865 6.376-14.242 14.241-14.242zM69.79 127.565c.396-28.43 25.21-51.74 57.062-54.812h14.312c31.854 3.073 56.666 26.384 57.062 54.812H69.79z" fill="#a4c639"/>
                     <path d="M74.743 70.009l15.022 26.02M193.276 70.009l-15.023 26.02" fill="none" stroke="#a4c639" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M114.878 102.087c.012 3.974-3.277 7.205-7.347 7.216-4.068.01-7.376-3.202-7.388-7.176v-.04c-.011-3.975 3.278-7.205 7.347-7.216 4.068-.011 7.376 3.2 7.388 7.176v.04zM169.874 102.087c.012 3.974-3.277 7.205-7.347 7.216-4.068.01-7.376-3.202-7.388-7.176v-.04c-.011-3.975 3.278-7.205 7.347-7.216 4.068-.011 7.376 3.2 7.388 7.176v.04z" fill="#fff"/>
                  </svg>
                  <Box
                    position = "relative"
                    display = "flex"
                    width = "100%"
                    alignItems = "center"
                    justifyContent = "flex-end">
                    <Image cursor = "pointer" boxSize = "30px" src="/images/tw.png"/>
                    <Image marginLeft = "15px" cursor = "pointer" boxSize = "30px" src="/images/insta.png"/>
                    <Image marginLeft = "15px" cursor = "pointer" boxSize = "30px" src="/images/fb3.png"/>
                  </Box>
               </Box>
            </Box>
        </Box>
      </Box>
    </footer>
  </div>
);

export default Home;

