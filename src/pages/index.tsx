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
        display="block"
        fontFamily="sans-serif">
        <Box
          backgroundImage="url(https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Fbackground.jpg?alt=media&token=19725dda-488e-4235-b9a5-75da84695515)"
          height= {["650px", "auto"]}
          width="100%"
          position="relative"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          display="block">
          <Box
            height = {["auto", "80px"]}
            top="15px"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom = {["30px", "0"]}>
            <Image boxSize= {["70px", "110px"]} src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Flogo5.png?alt=media&token=30b3f1d7-139b-4875-b3d4-ede732442398" alt="" />
            <Button
              position="absolute"
              right="10%"
              bg="none"
              type="submit"
              height = {["20px", "35px"]}
              width = {["100px", "250px"]}
              color="white"
              border="2px"
              borderColor="white"
              fontSize={{ base: "8px", lg: "16px" }}
              onClick={() => window.location.href = "login"}>
              Ir al panel de organización
            </Button>
          </Box>

          <HStack
            justifyContent="center"
            spacing="8%">
            <Box
              height= {["450px", "800px"]}
              width="45%"
              position="relative"
              display="block"
              backgroundImage="url(https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Fimagen2.png?alt=media&token=dc02507d-8e81-45e5-ab00-9f565348899e)"
              backgroundSize="100%"
              backgroundPosition="bottom"
              backgroundRepeat="no-repeat">
              <Box
                marginTop="2.5%"
                display="flex">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "20px", lg: "38px" }}
                  color="white">
                  Vota online y seguro con Boxting
                </Text>
              </Box>
              <Box
                width="full"
                position="relative"
                maxWidth="750px"
                display="flex">
                <Text
                    fontWeight="400"
                    fontSize={{ base: "18px",lg: "24px" }}
                    color="white">
                    Boxting es una solución de votación 100% virtual potenciada con tecnología Blockchain para asegurar la integridad e inmutabilidad de los votos.
                  </Text>
              </Box>
            </Box>

            <Box
              maxWidth="550px"
              width = {["50%", "35%"]}
              height = {["260px", "510px"]}
              position="relative"
              padding="1% 2% 1% 2%"
              display="block"
              top="-50px"
              boxShadow="0px 1px 5px 2px rgba(0,0,0, 0.4)"
              rounded="lg">
              <Box
                position="relative"
                marginTop="4%"
                display="block">
                <Text
                  fontWeight="700"
                  fontSize={{ base: "14px", lg: "29px" }}
                  color="white">
                  ¿Quieres organizar un evento de votación? ¡Contáctanos!
                  </Text>
                <Box
                  position="relative"
                  paddingTop="4%">
                  <FormControl>
                    <Box
                      display="flex"
                      width="100%"
                      height = "auto">
                      <Input
                        type="text"
                        variant="outline"
                        color='black'
                        _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                        placeholder="Nombre"
                        bg="white"
                        width = "100%"
                        height = {["20px", "48px"]}
                        borderRadius="0" />
                      <Box
                        width="9%">
                      </Box>
                      <Input
                        type="text"
                        variant="outline"
                        color='black'
                        _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                        placeholder="Apellidos"
                        bg="white"
                        width = "100%"
                        height = {["20px", "48px"]}
                        borderRadius="0" />
                    </Box>
                    <Box
                      marginTop="4%"
                      height = "auto"
                      display="flex"
                      width="100%">
                      <Input
                        type="text"
                        variant="outline"
                        color='black'
                        _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                        placeholder="Nombre de empresa"
                        bg="white"
                        width = "100%"
                        height = {["20px", "48px"]}
                        borderRadius="0" />
                      <Box
                        width="9%">
                      </Box>
                      <Input
                        type="text"
                        variant="outline"
                        color='black'
                        _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                        placeholder="Correo"
                        bg="white"
                        width = "100%"
                        height = {["20px", "48px"]}
                        borderRadius="0" />
                    </Box>
                    <Textarea
                      marginTop="4%"
                      borderRadius="0"
                      bgColor="white"
                      _placeholder={{ color: 'gray.400', fontSize: '16px' }}
                      placeholder="Información"
                      width = "100%"
                      height = {["10px", "48px"]}
                    />
                    <Box display="block">
                      <Checkbox
                        position="absolute"
                        color="white"
                        visibility = {["hidden", "visible"]}>
                        ¿Te gustaría recibir mensajes de Boxting?
                      </Checkbox>
                      <Button
                        marginTop = {["1%", "40px"]}
                        justifyContent="center"
                        bg="black"
                        type="submit"
                        fontSize = {["10px", "16px"]}
                        width = {["20%", "150px"]}
                        height = {["20px", "40px"]}
                        color="white"
                        borderRadius="0">
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
          paddingTop="2%">
          <Text
            fontWeight="black"
            fontSize={{ base: "24px", lg: "40px" }}
            color="black">
            ¿Cómo funciona?
            </Text>
        </Box>
        <Box
          height = {["540px", "680px"]}
          width="100%"
          backgroundColor="white"
          display="inline-flex"
          justifyContent="center"
          paddingTop="5%">
          <Box
            width="480px"
            height="480px"
            top = {["140px", "5px"]}
            position="relative"
            marginRight = {["60px", "150px"]}>
            <Image src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Fvoto4.png?alt=media&token=d63d5f59-7f3c-41c6-ba06-e910927cbaea"></Image>
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
              fontSize={{ base: "20px", lg: "40px" }}
              color="black">
              Empieza a votar desde cualquier lugar
          </Text>
            <Text
              marginTop="4%"
              fontSize={{ base: "14px", lg: "20px" }}
              fontWeight="light"
              color="black">
              Tan solo necesitas un dispositivo móvil con internet, descargar nuesra app <a href={"https://play.google.com/store/apps/details?id=com.boxtinglabs.boxting&hl=es_419&gl=US"} style={{ color: '#6200EE' }}>Boxting</a> y comenzar a votar por tu candidato preferido en tus eventos.
          </Text>
          </Box>
        </Box>
        <Box
          height = {["540px", "640px"]}
          width="100%"
          backgroundColor="gray.100"
          display="inline-flex"
          justifyContent="center"
          paddingTop="5%">
          <Box
            width="400px"
            height="460px"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginRight= {["60px", "150px"]}>
            <Text
              fontWeight="800"
              fontSize={{ base: "20px", lg: "40px" }}
              color="black">
              Aplicativo fácil de usar
          </Text>
            <Text
              marginTop="4%"
              fontSize={{ base: "14px", lg: "20px" }}
              fontWeight="light"
              color="black">
              Diseñado de forma que cualquier persona, sin importar su condición, pueda usar el aplicativo sin dificultad alguna.
          </Text>
          </Box>
          <Box
            width="480px"
            height="480px"
            top = {["130px", "5px"]}
            position="relative" >
            <Image src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Fprueba4.png?alt=media&token=cdf5f420-0de9-4573-895a-6653717ab87e"></Image>
          </Box>
        </Box>
        <Box
          height = {["520px", "600px"]}
          width="100%"
          backgroundColor="white"
          display="inline-flex"
          justifyContent="center"
          paddingTop="5%">
          <Box
            width="520px"
            height="480px"
            position="relative"
            top = {["130px", "5px"]}
            marginRight= {["60px", "150px"]}>
            <Image src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Fsecurity2.png?alt=media&token=a982e2d9-0800-45bc-8efc-5380197885bd"></Image>
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
              fontSize={{ base: "20px", lg: "40px" }}
              color="black">
              Total seguridad e integridad
          </Text>
            <Text
              marginTop="4%"
              fontSize={{ base: "14px", lg: "20px" }}
              fontWeight="light"
              color="black">
              Gracias a la revolucionaria tecnología Blockchain, las votaciones realizadas por nuestros usuarios son 100% seguras e inmutables en todo momento.
          </Text>
          </Box>
        </Box>
      </Flex>
    </main>

    <footer>
      <Box
        height= "280px"
        width="100%"
        backgroundColor="white"
        paddingTop="3%"
        display="table">
        <Center>
          <Box
            height = {["180px", "240px"]}
            display="flex"
            alignItems="center"
            flexDirection="column"
            bgColor="white">
            <Text
              color="black"
              fontSize ={{ base: "18px", lg: "28px" }}
              fontWeight="light"
              marginTop="6%"
              style={{ fontStyle: 'italic' }}>
              Votar nunca fue tan fácil, hasta ahora
            </Text>
            <a href='https://play.google.com/store/apps/details?id=com.boxtinglabs.boxting&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='blank'>
              <Image marginTop="10%" height= {["50px", "100px"]} alt='Disponible en Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/es-419_badge_web_generic.png' />
            </a>

          </Box>
        </Center>
        <Box
          width="100%"
          height= {["120px", "200px"]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          bgColor="#23272a">
          <Box
            width = {["80%", "60%"]}
            height="80px"
            position="relative"
            top="4%"
            borderTop="1px"
            borderColor="#5865f2">
            <Box
              position="relative"
              top="15%"
              display="flex">
              <FormControl
                display="flex">
                <Button
                  bg="none"
                  type="submit"
                  height = {["30px", "55px"]}
                  fontSize = {{ base: "10px", lg: "18px" }}
                  width = {["80px", "160px"]}
                  justifySelf="center"
                  alignSelf="center"
                  color="white"
                  border="2px"
                  borderColor="white"
                  onClick={() => window.scrollTo(0, 0)}>
                  Contáctanos
                </Button>
              </FormControl>
              <Box
                position="relative"
                display="flex"
                height = "auto"
                width="100%"
                alignItems="center"
                justifyContent="flex-end">
                <Image cursor="pointer" boxSize = {["15px", "30px"]} src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Ftw.png?alt=media&token=29d46efb-4734-4ffa-bd2e-ffd2d109236f" />
                <Image marginLeft="15px" cursor="pointer" boxSize = {["15px", "30px"]} src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Finsta.png?alt=media&token=b22f7e76-92de-4ecf-a23a-1b1e4881a29c" />
                <Image marginLeft="15px" cursor="pointer" boxSize = {["15px", "30px"]} src="https://firebasestorage.googleapis.com/v0/b/boxting-8ec66.appspot.com/o/landing%2Ffb.png?alt=media&token=cc8a0330-a243-4554-a183-95896636f78e" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </footer>
  </div>
);

export default Home;

