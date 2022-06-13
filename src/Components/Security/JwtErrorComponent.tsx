import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function JwtErrorComponent() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign="center">
                    <CloseIcon boxSize={'20px'} color={'white'} />
                </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Error de sesión
            </Heading>
            <Text color={'gray.500'}>
                No se pudo comprobar su identidad.
                Para solucionar el problema, por favor, vuelva a iniciar sesión.
            </Text>
        </Box>
    );
}