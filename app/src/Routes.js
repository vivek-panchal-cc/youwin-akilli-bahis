import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import FreeTips from "./pages/free-tips"
import MainLayout from "./layouts/MainLayout";
import News from "./pages/news"
import MultiBet from "./pages/multi-bet"


const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/free-tips" element={<FreeTips />} />
                <Route path="/free-tips/:id" element={<FreeTips />} />
                <Route path="/news" element={<News />} />
                <Route path="/multi-bet" element={<MultiBet />} />
            </Route>
        </Routes>
    );
}

export default AppRoute;