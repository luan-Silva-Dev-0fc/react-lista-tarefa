import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import NaoEncontrado from "../pages/NaoEncontrado";
import Tarefas from "../pages/Tarefas";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastro />} />
                <Route path="/tarefas" element={<Tarefas/>} />
                <Route path="*" element={<NaoEncontrado />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;