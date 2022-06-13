import { DeleteIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    Box,
    Heading,
    Spacer,
    Spinner,
    Center,
    Text,
    Badge,
    IconButton,
    InputGroup,
    Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DeleteCategoryWebService } from '../../WebServices/Category/DeleteCategoryWebService';
import { CategoryTableWebService } from '../../WebServices/Tables/CategoryTableWebService';
import AddCategoryDrawer from '../Drawer/AddCategoryDrawer';
import EditCategoryDrawer from '../Drawer/EditCategoryDrawer';
import { SuccessToast } from '../Toast/SuccessToast';

export default function CategoryTable() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showedCategories, setShowedCategories] = useState([]);
    const [state, newToast] = SuccessToast();
    const token = localStorage.getItem('si-refresh-token');

    const setSearchCategories = (search: string) => {
        const response = categories.filter(category => {
            return category.categoryName.toLowerCase().includes(search.toLowerCase());
        });
        setShowedCategories(response);
    }

    const updateTable = async () => {
        setIsLoading(true);
        const response = await CategoryTableWebService(token);
        setCategories(response.response.data);
        setShowedCategories(response.response.data);
        setIsLoading(false);
    }

    const deleteCategory = async (id: number) => {
        const response = await DeleteCategoryWebService(id, token);
        if (response?.result == true) {
            const newCategories = categories.filter(category => category.categoryId !== id);
            console.log(newCategories);
            setCategories(newCategories);
            setShowedCategories(newCategories);
            return newToast({ title: "Exito!", message: "Categoria eliminada correctamente", status: 'success' });
        }
        if (response.response?.data.statusCode === 30003) {
            return newToast({ title: "Error!", message: "No se puede eliminar la categoria porque tiene productos asociados", status: 'error' });
        }
        return newToast({ title: 'Error!', message: `No se pudo eliminar la categoria`, status: 'error' });
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await CategoryTableWebService(token);
            setCategories(response.result);
            setShowedCategories(response.result);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <>
            <TableContainer style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px',
            }}>
                <Flex>
                    <Box>
                        <Heading>CATEGORIAS</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        {categories.length == 0 ? (
                            <>
                                <Box onChange={() => updateTable()}>
                                    <AddCategoryDrawer />
                                </Box>
                            </>
                        ) : (
                            <InputGroup>
                                <Box>
                                    <AddCategoryDrawer />
                                </Box>
                                <Input placeholder="Buscar" bg={'white'}
                                    onChange={(e) => setSearchCategories(e.target.value)}
                                />
                            </InputGroup>
                        )}
                    </Box>
                </Flex>
                <Table variant='striped' colorScheme='blackAlpha' size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Nombre</Th>
                            <Th>Descripcion</Th>
                            <Th>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan={5}>
                                    <Center>
                                        <Spinner size='sm' />
                                    </Center>
                                </Td>
                            </Tr>
                        ) : (
                            <>
                                {showedCategories.length == 0 ? (
                                    <Tr>
                                        <Td colSpan={5}>
                                            <Center>
                                                <Text>No hay categorias</Text>
                                            </Center>
                                        </Td>
                                    </Tr>
                                ) : (
                                    showedCategories.map((category) => (
                                        <tr key={category.categoryId}>
                                            <Td>{category.categoryId}</Td>
                                            <Td>{category.categoryName}</Td>
                                            <Td>{category.categoryDescription}</Td>
                                            {category.categoryStatus == true ? (
                                                <Td><Badge colorScheme='green'>Activo</Badge></Td>
                                            ) : (
                                                <Td><Badge colorScheme='red'>Inactivo</Badge></Td>
                                            )}
                                            <Td style={{
                                                display: 'flex',
                                                justifyContent: 'right',
                                                alignItems: 'center',
                                            }}>
                                                <EditCategoryDrawer categoryId={category.categoryId} categoryName={category.categoryName} categoryDescription={category.categoryDescription} categoryStatus={category.categoryStatus} />
                                                <IconButton aria-label='Search database' colorScheme='red' size='sm' icon={<DeleteIcon />} onClick={() => deleteCategory(category.categoryId)} />
                                            </Td>
                                        </tr>
                                    ))
                                )}
                            </>
                        )}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Nombre</Th>
                            <Th>Descripcion</Th>
                            <Th>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>

    )
}