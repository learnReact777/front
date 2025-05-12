import { BrowserRouter, Route, Routes } from "react-router";
import { Auth } from "../pages/Auth";
import { authRoutes } from "./routes/authRoutes";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={authRoutes.LOGIN_ROUTE} element={<Auth />} />
                <Route path={authRoutes.REGISTER_ROUTE} element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
};
