import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export function SuccessToast() {
    const [state, setState] = useState(undefined);
    const toast = useToast()

    useEffect(() => {
        if (state) {
            const { title, message, status } = state;
            toast({
                title: title,
                description: message,
                status: status,
                duration: 9000,
                position: "top",
                isClosable: true,
            })
        }
    }, [state, toast]);

    return [state, setState];
}