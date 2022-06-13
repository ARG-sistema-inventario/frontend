import { Box, Button, Center, Divider, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import { useState } from "react";

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (index) => {
        setActiveTab(index);
    }

    return (
        <>
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <SimpleGrid columns={{ base: 2, md: 6 }} spacing={{ base: 5, lg: 8 }}>
                    {tabs.map((tab, index) => (
                        <Stack spacing={4} key={index}>
                            <Button
                                colorScheme={activeTab === index ? 'teal' : 'gray'}
                                onClick={() => handleClick(index)}
                                _hover={{ bg: 'teal' }}
                                _active={{ bg: 'teal' }}
                                _focus={{ boxShadow: 'outline' }}
                                _selected={{ bg: 'teal' }}
                                _first={{ borderTopLeftRadius: 'lg', borderBottomLeftRadius: 'lg' }}
                                _last={{ borderTopRightRadius: 'lg', borderBottomRightRadius: 'lg' }}
                                _disabled={{ opacity: 0.5 }}>
                                {tab.title}
                            </Button>
                        </Stack>
                    ))}
                </SimpleGrid>
                <Divider orientation='horizontal' style={{
                    marginTop: '16px',
                }} />
            </Box>
        </>
    )
}

const tabs = [
    {
        title: 'Articulos',
        ref: 'Articulos',
    },
    {
        title: 'Categorias',
        ref: 'Categorias',
    },
    {
        title: 'Clientes',
        ref: 'Clientes',
    },
    {
        title: 'Proveedores',
        ref: 'Proveedores',
    },
    {
        title: 'Ventas',
        ref: 'Ventas',
    },
    {
        title: 'Facturas',
        ref: 'Facturas',
    }

]