import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;