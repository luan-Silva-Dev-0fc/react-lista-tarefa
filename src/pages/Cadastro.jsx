import { Link, useNavigate } from "react-router";

const Cadastro = () => {
    const navigate = useNavigate();

    function cadastrar(event) {
        event.preventDefault();

        let nome = document.querySelector("#nome").value;
        let email = document.querySelector("#email").value;
        let senha = document.querySelector("#senha").value;

        let dados = {
            nome,
            email,
            senha
        }

        fetch("https://js-lista-de-tarefas-api.onrender.com/usuarios", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dados)
        })
            .then(resposta => resposta.json())
            .then(json => {
                if (json.tipo == "error") {
                    alert(json.mensagem);
                    return;
                }

                alert(json.mensagem);
                if (json.usuario) {
                    sessionStorage.setItem("usuario", JSON.stringify(json.usuario));
                }
                navigate("/tarefas");
            })
            .catch(error => {
                alert(error.message);
            })

        console.log(dados);

    }

    return (
        <div className="bg-slate-200 h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <Link to="/" className="mb-5">Voltar</Link>
                <h1 className="font-bold text-xl mb-6">Cadastre-se</h1>
                <form onSubmit={cadastrar} className="flex flex-col w-80">
                    <label htmlFor="nome" className="uppercase text-xs font-bold mb-2 block">Nome</label>
                    <input id="nome" type="text" placeholder="seu nome" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />

                    <label htmlFor="email" className="uppercase text-xs font-bold mb-2 block">Email</label>
                    <input id="email" type="email" placeholder="email@email.com" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />

                    <label htmlFor="senha" className="uppercase text-xs font-bold mb-2 block">Senha</label>
                    <input id="senha" type="password" placeholder="********" className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4" required />

                    <button type="submit" className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}

export default Cadastro;