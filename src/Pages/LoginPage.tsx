import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import SecondaryNavbar from '../Components/SecondaryNavbar';
import { SuccessToast } from '../Components/Toast/SuccessToast';
import LoginRequest from '../Models/Request/Login/LoginRequest';
import { LoginWebService } from '../WebServices/Login/LoginWebService';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, newToast] = SuccessToast();

    function validateForm() {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return emailRegex.test(email) && password.length >= 8;
    }

    async function handleSubmit() {
        const body: LoginRequest = {
            email: email,
            password: password,
        }
        const response = await LoginWebService(body);
        console.log(response)
        if (response.response?.data.statusCode === 10004) {
            return newToast({ title: 'Error!', message: 'Los datos ingresados son incorrectos', status: 'error' });
        }
        newToast({ title: 'Login!', message: 'Iniciando sesion', status: 'loading' });
        localStorage.setItem('si-refresh-token', response.result?.refreshToken);
        localStorage.setItem('si-token', response.result?.accessToken);
        setTimeout(() => {
            return window.location.href = '/dashboard';
        }, 2000);
    }

    return (
        <>
            <SecondaryNavbar />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Ingresa con tu cuenta</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            y disfruta de la app ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Contraseña</FormLabel>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Recordarme</Checkbox>
                                    <Link color={'blue.400'}>Recuperar Contraseña</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                    disabled={!validateForm()}
                                    onClick={() => handleSubmit()}>
                                    Iniciar Sesión
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}