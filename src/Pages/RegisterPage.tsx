import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Checkbox,
    Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { RegisterWebService } from '../WebServices/Register/RegisterWebService';
import RegisterRequest from '../Models/Request/Register/RegisterRequest';
import { SuccessToast } from '../Components/Toast/SuccessToast';
import SecondaryNavbar from '../Components/SecondaryNavbar';

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [state, newToast] = SuccessToast();

    function validateForm() {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return emailRegex.test(email) && passwordRegex.test(password) && name.length > 1 && lastName.length > 1;
    }

    function validateEmail() {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return emailRegex.test(email);
    }

    function validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    function validateNameAndLastName() {
        if (name.length > 1 && lastName.length > 1) {
            return true;
        }
        return false;
    }

    const handleSubmit = async () => {
        const buildBody: RegisterRequest = {
            email: email,
            password: password,
            name: name,
            lastName: lastName,
        }
        const response = await RegisterWebService(buildBody);
        if (response.response?.data.statusCode === 10001) {
            return newToast({ title: 'Error!', message: 'El correo ya existe!', status: 'error' });
        }
        newToast({ title: 'Exito!', message: 'Su cuenta ha sido creada!', status: 'success' });
        return window.location.href = '/';
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
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Registrar nueva cuenta
                        </Heading>
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
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>Nombre</FormLabel>
                                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Apellido</FormLabel>
                                        <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={5} direction='column'>
                                {!validateEmail() ? (
                                    <Checkbox isReadOnly={true}>
                                        El email debe ser un email
                                    </Checkbox>
                                ) : (
                                    <Checkbox colorScheme='green' defaultChecked isReadOnly={true} isChecked={true}>
                                        El email debe ser un email
                                    </Checkbox>
                                )}
                                {!validatePassword() ? (
                                    <Checkbox isReadOnly={true}>
                                        La contraseña debe tener al menos 8 caracteres, una mayuscula, un caracter especial y un numero
                                    </Checkbox>
                                ) : (
                                    <Checkbox colorScheme='green' defaultChecked isReadOnly={true} isChecked={true}>
                                        La contraseña debe tener al menos 8 caracteres, una mayuscula, un caracter especial y un numero
                                    </Checkbox>
                                )}
                                {validateNameAndLastName() == false ? (
                                    <Checkbox isReadOnly={true}>
                                        El nombre y apellido son obligatorios
                                    </Checkbox>
                                ) : (
                                    <Checkbox colorScheme='green' defaultChecked isReadOnly={true} isChecked={true}>
                                        El nombre y apellido son obligatorios
                                    </Checkbox>
                                )}
                            </Stack>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                    disabled={!validateForm()}
                                    onClick={() => handleSubmit()}>
                                    Registrar cuenta
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Ya tiene cuenta? <Link color={'blue.400'} href='/login'>Iniciar sesion</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}