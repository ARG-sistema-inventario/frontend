import { Box, Center, Progress, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import DataComponent from "../Components/DataComponent";
import FooterComponent from "../Components/FooterComponent";
import GeneralInfoComponent from "../Components/GeneralInfoComponent";
import NavbarComponent from "../Components/NavbarComponent";
import SecondaryNavbar from "../Components/SecondaryNavbar";
import JwtErrorComponent from "../Components/Security/JwtErrorComponent";
import CategoryTable from "../Components/Tables/CategoryTable";
import TabsComponent from "../Components/TabsComponent";
import { ValidateWebServiceToken } from "../WebServices/Dashboard/JwtSecurityWebService";


export default function Dashboard() {
    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);

    const validateToken = async (token) => {
        const response = await ValidateWebServiceToken(token);
        if (response.response?.data.statusCode != 401 && response.response?.data.message != 'Invalid refresh token: JsonWebTokenError. Authentication Required') {
            setToken(true);
        }
        if (response.response?.data.statusCode == 400) {
            setToken(false);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('si-refresh-token');
            if (token) await validateToken(token);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        fetchData();
    }, [])

    return (
        <Box bg={useColorModeValue('gray.50', 'gray.800')}>
            {loading ? (
                <>
                    <Center h='100vh'>
                        <div>
                            <Center>
                                <Box mb={8}>
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='blue.500'
                                        size='xl'
                                    />
                                </Box>
                            </Center>
                            <Center>
                                <Text fontSize='lg' color='gray.600'>
                                    Cargando
                                </Text>
                            </Center>
                        </div>
                    </Center>
                </>
            ) : (
                <>
                    {token ? (
                        <>
                            <NavbarComponent />
                            <GeneralInfoComponent />
                            <DataComponent />
                            <FooterComponent />
                        </>
                    ) : (
                        <>
                            <SecondaryNavbar />
                            <JwtErrorComponent />
                            <FooterComponent />
                        </>
                    )}
                </>
            )}
        </Box>
    )
}