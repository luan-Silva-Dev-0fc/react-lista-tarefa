import { Link } from "react-router";

const NaoEncontrada = () => {
    return (
        <div className="bg-slate-200 min-h-screen flex flex-col justify-center items-center p-6 text-center">
            <img 
                src="public\404-error-animate.svg" 
                alt="Erro 404 - Página não encontrada" 
                className="w-120 max-w-full mb-6"
            />
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Página não encontrada</h1>
            <p className="text-slate-600 mb-6">A página que você está procurando não existe ou foi removida.</p>
            <Link 
                to={"/"} 
                className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2.5 px-6 rounded duration-200 shadow-md"
            >
                Voltar para o início
            </Link>
        </div>
    );
}

export default NaoEncontrada;