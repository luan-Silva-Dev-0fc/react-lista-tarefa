import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import NaoEncontrada from "../pages/NaoEncontrada";
import Tarefas from "../pages/Tarefas";


const Rotas = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/tarefas" element={<Tarefas />} />
                <Route path="/*" element={<NaoEncontrada />} />
            </Routes>
        </BrowserRouter>    
    );
}

export default Rotas;