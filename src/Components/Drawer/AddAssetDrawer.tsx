import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    IconButton,
    Input,
    Select,
    Stack,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateAssetRequest from "../../Models/Request/Asset/CreateAssetRequest";
import { CreateAssetWebService } from "../../WebServices/Assets/CreateAssetWebService";
import { CategoryTableWebService } from "../../WebServices/Tables/CategoryTableWebService";
import { SuccessToast } from "../Toast/SuccessToast";

export default function AddAssetDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [assetNameValue, setAssetNameValue] = useState('');
    const [assetDescriptionValue, setAssetDescriptionValue] = useState('');
    const [assetStockValue, setAssetStockValue] = useState(0);
    const [assetStockAmountValue, setAssetStockAmountValue] = useState('');
    const [assetPriceValue, setAssetPriceValue] = useState('');
    const [assetCategoryValue, setAssetCategoryValue] = useState(0);
    const [categories, setCategories] = useState([]);
    const [state, newToast] = SuccessToast();
    const token = localStorage.getItem('si-refresh-token');
    const btnRef = React.useRef();

    const handleSubmit = async () => {
        setIsLoading(true);
        const buildBody: CreateAssetRequest = {
            name: assetNameValue,
            description: assetDescriptionValue,
            stock: assetStockValue == 0 ? true : false,
            stockAmount: Number(assetStockAmountValue),
            price: Number(assetPriceValue),
            categoryId: categories[assetCategoryValue].categoryId

        };
        const response = await CreateAssetWebService(token, buildBody);
        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1000);
        if (response.response?.data.statusCode === 40001) {
            return newToast({ title: 'Error!', message: `El articulo: ${assetNameValue} ya existe`, status: 'error' });
        }
        return newToast({ title: 'Exito!', message: `Articulo: ${assetNameValue} creado con exito`, status: 'success' });
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await CategoryTableWebService(token);
            setCategories(response.result);
        }
        fetchData();
    }, [])

    return (
        <>
            <IconButton
                ref={btnRef}
                onClick={onOpen}
                icon={<AddIcon />}
                aria-label="Add"
                colorScheme='teal'
                marginRight='5px'
                size='md'
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Crear nuevo articulo</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='nombre'>Nombre</FormLabel>
                                <Input
                                    id='nombre'
                                    placeholder='Ingrese nombre del articulo'
                                    onChange={(e) => setAssetNameValue(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='desc'>Descripcion</FormLabel>
                                <Textarea
                                    id='desc'
                                    placeholder='Ingrese una descripcion del articulo'
                                    onChange={(e) => setAssetDescriptionValue(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='stock'>Stock</FormLabel>
                                <Select id='stock' onChange={(e) => setAssetStockValue(e.target.options.selectedIndex)}>
                                    <option key='true' value='true'>En stock</option>
                                    <option key='false' value='false'>Fuera de stock</option>
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel htmlFor='precio'>Precio unitario</FormLabel>
                                <Input
                                    id='precio'
                                    placeholder='Ingrese el precio del articulo'
                                    type={'number'}
                                    onChange={(e) => setAssetPriceValue(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='cStock'>Cantidad Stock</FormLabel>
                                <Input
                                    id='cStock'
                                    placeholder='Ingrese la cantidad de stock del producto'
                                    type={'number'}
                                    onChange={(e) => setAssetStockAmountValue(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='category'>Categoria</FormLabel>
                                <Select id='category' onChange={(e) => setAssetCategoryValue(e.target.options.selectedIndex)}>
                                    {categories.map((category) => {
                                        return <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                    })}
                                </Select>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='teal'
                            {...(isLoading ? { isLoading: true } : { isLoading: false })}
                            onClick={() => handleSubmit()}
                        >Guardar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )

}