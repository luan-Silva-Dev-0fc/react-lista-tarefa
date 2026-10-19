import { Link } from "react-router";

const NaoEncontrado = () => {
    return (
        <>
            <h1>404</h1>
            <p>pagina nao encontrada</p>
            <Link to="/">Voltar</Link>
        </>
    );
}

export default NaoEncontrado;
