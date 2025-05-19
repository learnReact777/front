import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { authRoutes } from "./routes/authRoutes";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={authRoutes.LOGIN_ROUTE} element={<Login />} />
                <Route path={authRoutes.REGISTER_ROUTE} element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};
