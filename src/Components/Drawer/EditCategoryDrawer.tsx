import { EditIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    Center,
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
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Stack,
    Text,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import UpdateCategoryRequest from "../../Models/Request/Category/UpdateCategoryRequest";
import { UpdateCategoryWebService } from "../../WebServices/Category/UpdateCategoryWebService";
import { SuccessToast } from "../Toast/SuccessToast";

export default function EditCategoryDrawer({ categoryId, categoryName, categoryDescription, categoryStatus }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [categoryNameValue, setCategoryNameValue] = useState(categoryName);
    const [categoryDescriptionValue, setCategoryDescriptionValue] = useState(categoryDescription);
    const [categoryStatusValue, setCategoryStatusValue] = useState(categoryStatus);
    const [isLoading, setIsLoading] = useState(false);
    const [state, newToast] = SuccessToast();
    const token = localStorage.getItem('si-refresh-token');
    const btnRef = React.useRef();

    const updateCategory = async () => {
        setIsLoading(true);
        const buildBody: UpdateCategoryRequest = {
            name: categoryNameValue,
            description: categoryDescriptionValue,
            status: categoryStatusValue == 0 ? true : false
        }
        const response = await UpdateCategoryWebService(categoryId, token, buildBody);
        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1000);
        if (response.response?.data) {
            return newToast({ title: 'Error!', message: `La categoria: ${categoryNameValue} ya existe`, status: 'error' });
        }
        return newToast({ title: 'Exito!', message: `Categoria: ${categoryNameValue} editada con exito`, status: 'success' });
    }

    return (
        <>
            <IconButton
                ref={btnRef}
                onClick={onOpen}
                icon={<EditIcon />}
                aria-label="Editar"
                colorScheme='yellow'
                marginRight='5px'
                size='sm'
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
                    <DrawerHeader>Categoria: {categoryName}</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='username'>Nombre</FormLabel>
                                <Input
                                    id='username'
                                    placeholder={categoryNameValue}
                                    onChange={(e) => { e.target.value.length > 0 ? setCategoryNameValue(e.target.value) : setCategoryNameValue(categoryNameValue) }}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='desc'>Description</FormLabel>
                                <Textarea id='desc' placeholder={categoryDescriptionValue}
                                    onChange={(e) => { e.target.value.length > 0 ? setCategoryDescriptionValue(e.target.value) : setCategoryDescriptionValue(categoryDescriptionValue) }}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='status'>Status</FormLabel>
                                <Select id='status' onChange={(e) => setCategoryStatusValue(e.target.options.selectedIndex)}>
                                    <option key='true' value='true'>Activo</option>
                                    <option key='false' value='false'>Inactivo</option>
                                </Select>
                            </Box>
                        </Stack>
                        <Center>
                            <Text marginTop={'50px'}>
                                Si no quiere cambiar algun campo, dejarlo en blanco.
                            </Text>
                        </Center>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='teal'
                            {...(isLoading ? { isLoading: true } : { isLoading: false })}
                            onClick={() => updateCategory()}
                        >Guardar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )

}