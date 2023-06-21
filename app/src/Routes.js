import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import MainLayout from "./layouts/MainLayout";


const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default AppRoute;