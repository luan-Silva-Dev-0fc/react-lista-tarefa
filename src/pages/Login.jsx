import { Link } from "react-router"

const Login = () => {
    function logar(event){
            event.preventDefault();

            let email = document.querySelector("#email").value;
            let senha = document.querySelector("#senha").value;

            let dados = {
                email,
                senha
            }

            fetch("https://js-lista-de-tarefas-api.onrender.com/login", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            .then(resposta => resposta.json())
            .then(json => {
                if(json.tipo == "warning"){
                    alert(json.mensagem);
                    return;
                }
                sessionStorage.setItem("usuario", JSON.stringify(json.usuario));
                alert(json.mensagem);
                window.location.href = "tarefas.html";
            })
            .catch(error => {
                alert(error.message);
            })
    }

    return (
        <div className="bg-slate-200 h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h1 className="font-bold text-xl mb-6">Seja bem-vindo(a)</h1>
                <form onSubmit={logar} className="flex flex-col w-80">
                    <label htmlFor="email" className="uppercase text-xs font-bold mb-2 block">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email@email.com"
                        className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                        required
                    />
                    <label htmlFor="senha" className="uppercase text-xs font-bold mb-2 block">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        placeholder="********"
                        className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                        required
                    />
                    <Link to="/cadastrar" className="my-5">Cadastre-se</Link>
                    <button
                        type="submit"
                        className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold"
                    >
                        Logar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login