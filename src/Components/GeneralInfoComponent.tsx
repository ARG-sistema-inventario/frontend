import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaBoxOpen, FaCashRegister } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'md'}
            bg={useColorModeValue('gray.100', 'gray.900')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'}>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

export default function GeneralInfoComponent() {
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    title={'Articulos'}
                    stat={'5,000'}
                    icon={<FaBoxOpen size={'3em'} />}
                />
                <StatsCard
                    title={'Ventas'}
                    stat={'1,000'}
                    icon={<FaCashRegister size={'3em'} />}
                />
                <StatsCard
                    title={'Clientes'}
                    stat={'7'}
                    icon={<GoPerson size={'3em'} />}
                />
            </SimpleGrid>
        </Box>
    );
}