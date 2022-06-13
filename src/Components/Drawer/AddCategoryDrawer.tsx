import { AddIcon, EditIcon } from "@chakra-ui/icons";
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
    Stack,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCategoryRequest from "../../Models/Request/Category/CreateCategoryRequest";
import { CreateCategoryWebService } from "../../WebServices/Category/CreateCategoryWebService";
import { SuccessToast } from "../Toast/SuccessToast";

export default function AddCategoryDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryNameValue, setCategoryNameValue] = useState('');
    const [categoryDescriptionValue, setCategoryDescriptionValue] = useState('');
    const [state, newToast] = SuccessToast();
    const token = localStorage.getItem('si-refresh-token');
    const btnRef = React.useRef();

    const handleSubmit = async () => {
        setIsLoading(true);
        const buildBody: CreateCategoryRequest = {
            name: categoryNameValue,
            description: categoryDescriptionValue
        };
        const response = await CreateCategoryWebService(token, buildBody);
        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1000);
        if (response.response?.data.statusCode === 30001) {
            return newToast({ title: 'Error!', message: `La categoria: ${categoryNameValue} ya existe`, status: 'error' });
        }
        return newToast({ title: 'Exito!', message: `Categoria: ${categoryNameValue} creada con exito`, status: 'success' });
    }

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
                    <DrawerHeader>Crear nueva categoria</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='username'>Nombre</FormLabel>
                                <Input
                                    id='nombre'
                                    placeholder='Ingrese nombre de la categoria'
                                    onChange={(e) => setCategoryNameValue(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='desc'>Description</FormLabel>
                                <Textarea
                                    id='desc'
                                    placeholder='Ingrese una descripcion de la categoria'
                                    onChange={(e) => setCategoryDescriptionValue(e.target.value)}
                                />
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