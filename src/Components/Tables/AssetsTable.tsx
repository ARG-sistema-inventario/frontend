import { DeleteIcon } from "@chakra-ui/icons";
import { Badge, Box, Center, Flex, Heading, IconButton, Input, InputGroup, Spacer, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteAssetWebService } from "../../WebServices/Assets/DeleteAssetWebService";
import { AssetsTableWebService } from "../../WebServices/Tables/AssetsTableWebService";
import AddAssetDrawer from "../Drawer/AddAssetDrawer";
import { SuccessToast } from "../Toast/SuccessToast";

export default function AssetsTable() {
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showedAssets, setShowedAssets] = useState([]);
    const [state, newToast] = SuccessToast();
    const token = localStorage.getItem('si-refresh-token');

    const setSearchAssets = (search: string) => {
        const response = assets.filter(asset => {
            return asset.assetName.toLowerCase().includes(search.toLowerCase());
        });
        setShowedAssets(response);
    }

    const updateTable = async () => {
        setIsLoading(true);
        const response = await AssetsTableWebService(token);
        setAssets(response.response.data);
        setShowedAssets(response.response.data);
        setIsLoading(false);
    }

    const deleteAsset = async (id: number) => {
        const response = await DeleteAssetWebService(id, token);
        if (response?.result == true) {
            const newAssets = assets.filter(asset => asset.assetId !== id);
            setAssets(newAssets);
            setShowedAssets(newAssets);
            return newToast({ title: "Exito!", message: "Articulo eliminado correctamente", status: 'success' });
        }
        return newToast({ title: 'Error!', message: `No se pudo eliminar el articulo`, status: 'error' });
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await AssetsTableWebService(token);
            setAssets(response.result);
            setShowedAssets(response.result);
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
                        <Heading>ARTICULOS</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                        {assets.length == 0 ? (
                            <Text>No hay articulos</Text>
                        ) : (
                            <InputGroup>
                                <Box>
                                    <AddAssetDrawer />
                                </Box>
                                <Input placeholder="Buscar" bg={'white'}
                                    onChange={(e) => setSearchAssets(e.target.value)}
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
                            <Th>Precio Unitario</Th>
                            <Th>Cantidad Stock</Th>
                            <Th>Stock?</Th>
                            <Th>Status</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan={8}>
                                    <Center>
                                        <Spinner size='sm' />
                                    </Center>
                                </Td>
                            </Tr>
                        ) : (
                            <>
                                {showedAssets.length == 0 ? (
                                    <Tr>
                                        <Td colSpan={5}>
                                            <Center>
                                                <Text>No hay categorias</Text>
                                            </Center>
                                        </Td>
                                    </Tr>
                                ) : (
                                    showedAssets.map((asset) => (
                                        <tr key={asset.assetId}>
                                            <Td>{asset.assetId}</Td>
                                            <Td>{asset.assetName}</Td>
                                            <Td>{asset.assetDescription}</Td>
                                            <Td>$ {asset.assetPrice.toLocaleString()}</Td>
                                            {asset.assetStockAmount > 3 ? (
                                                <Td><Badge colorScheme='green'>{asset.assetStockAmount} Unidades</Badge></Td>
                                            ) : (
                                                <>
                                                    {asset.assetStockAmount >= 1 ? (
                                                        <Td><Badge colorScheme='yellow'>{asset.assetStockAmount} Unidades</Badge></Td>
                                                    ) : (
                                                        <Td><Badge colorScheme='red'>{asset.assetStockAmount} Unidades</Badge></Td>
                                                    )}
                                                </>
                                            )}
                                            {asset.assetStock == true ? (
                                                <Td><Badge colorScheme='green'>En stock</Badge></Td>
                                            ) : (
                                                <Td><Badge colorScheme='red'>Fuera de stock</Badge></Td>
                                            )}
                                            {asset.assetStatus == true ? (
                                                <Td><Badge colorScheme='green'>Activo</Badge></Td>
                                            ) : (
                                                <Td><Badge colorScheme='red'>Inactivo</Badge></Td>
                                            )}
                                            <Td style={{
                                                display: 'flex',
                                                justifyContent: 'right',
                                                alignItems: 'center',
                                            }}>
                                                test
                                                {/* <EditCategoryDrawer assetId={asset.assetId} categoryName={asset.categoryName} categoryDescription={asset.categoryDescription} categoryStatus={asset.categoryStatus} /> */}
                                                <IconButton aria-label='Search database' colorScheme='red' size='sm' icon={<DeleteIcon />} onClick={() => deleteAsset(asset.assetId)} />
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
                            <Th>Precio Unitario</Th>
                            <Th>Cantidad Stock</Th>
                            <Th>Stock?</Th>
                            <Th>Status</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>

    )
}