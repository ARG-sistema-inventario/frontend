import {
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/DashboardPage"
import LoginPage from "./Pages/LoginPage"
import SignupCard from "./Pages/RegisterPage"

export const App = () => (
    <ChakraProvider theme={theme} >
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<SignupCard />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </ChakraProvider>
)
