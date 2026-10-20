import { useState, useRef, useEffect } from "react";
import { AXIOS } from "../services";

const Tarefas = () => {

    const [tarefas, setTarefas] = useState([]);
    const [formCriar, SetFormCriar] = useState(false);
    const tituloCria = useRef(null);
    const descricaoCria = useRef(null);
    
    const tarefasRef = useRef([]);

    function pesquisarTarefa(palavra) {
        if (!palavra || palavra.trim().length === 0) {
            carregarTarefas(tarefasRef.current);
            return;
        }
        if (palavra.length >= 3) {
            let tarefasFiltradas = tarefasRef.current.filter(tarefa =>
                tarefa.titulo.toLowerCase().includes(palavra.toLowerCase())
            );
            carregarTarefas(tarefasFiltradas);
        }
    }

    useEffect(() => {
        buscarTarefas();

        window.abrirFormEditar = (id) => {
            let formEditar = document.querySelector("#form-editar");
            let tarefa = tarefasRef.current.find(t => t.id === id);
            if (formEditar) {
                formEditar.classList.remove("opacity-0", "invisible");
                formEditar.classList.add("opacity-100", "visible");
                if (tarefa) {
                    const idInput = document.querySelector("#idEdicao");
                    const tituloInput = document.querySelector("#tituloEdicao");
                    const descInput = document.querySelector("#descricaoEdicao");
                    if (idInput) idInput.value = tarefa.id;
                    if (tituloInput) tituloInput.value = tarefa.titulo;
                    if (descInput) descInput.value = tarefa.descricao;
                }
            }
        };

        window.deletarTarefa = async (id) => {
            if (!confirm("Deseja realmente excluir esta tarefa?")) return;
            try {
                const resposta = await AXIOS.delete(`/tarefas/${id}`);
                alert(resposta.data.mensagem);
                buscarTarefas();
            } catch (error) {
                alert("Erro ao excluir tarefa: " + error.message);
            }
        };

        return () => {
            delete window.abrirFormEditar;
            delete window.deletarTarefa;
        };
    }, []);

    function carregarTarefas(listaTarefas) {
        let grid = document.querySelector("#tarefas");
        if (!grid) return;
        grid.innerHTML = "";
        if (!Array.isArray(listaTarefas) || listaTarefas.length === 0) {
            grid.innerHTML = "<p>Crie sua primeira tarefa</p>";
        } else {
            listaTarefas.map(tarefa => {
                grid.innerHTML += `
                <div class="bg-white p-4 rounded-lg">
                    <h3 class="font-bold mb-4">${tarefa.titulo}</h3>
                    <p>${tarefa.descricao}</p>
                    <div class="flex justify-end gap-3">
                        <box-icon onclick="abrirFormEditar(${tarefa.id})" class="cursor-pointer hover:fill-purple-500" name="pencil"></box-icon>
                        <box-icon onclick="deletarTarefa(${tarefa.id})" class="cursor-pointer hover:fill-purple-500" name="trash"></box-icon>
                    </div>
                </div>
            `;
            });
        }
    }

    async function fecharFormCriar() {
        SetFormCriar(false);
    }

    async function criarTarefa(event) {
        event.preventDefault();
        try {
            let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
            let dados = {
                titulo: tituloCria.current?.value || document.querySelector("#titulo")?.value,
                descricao: descricaoCria.current?.value || document.querySelector("#descricao")?.value,
                usuario_id: usuario ? usuario.id : null
            };

            const resposta = await AXIOS.post("/tarefas", dados);

            alert(resposta.data.mensagem);
            fecharFormCriar();
            buscarTarefas();
        } catch (error) {
            alert("Erro: " + error.message);
        }
    }

    async function buscarTarefas() {
        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
        if (!usuario) return;

        try {
            const resposta = await AXIOS.get(`/tarefas/${usuario.id}`);
            const dados = Array.isArray(resposta.data) ? resposta.data : [];
            setTarefas(dados);
            tarefasRef.current = dados;
            carregarTarefas(dados);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    }

    function fecharFormEditar() {
        let formEditar = document.querySelector("#form-editar");
        if (formEditar) {
            formEditar.classList.add("opacity-0", "invisible");
            formEditar.classList.remove("opacity-100", "visible");
        }
    }

    async function editarTarefa(event) {
        event.preventDefault();
        try {
            let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
            let id = document.querySelector("#idEdicao");
            let titulo = document.querySelector("#tituloEdicao");
            let descricao = document.querySelector("#descricaoEdicao");
            let dados = {
                titulo: titulo?.value,
                descricao: descricao?.value,
                usuario_id: usuario ? usuario.id : null
            };

            const resposta = await AXIOS.put(`/tarefas/${id.value}`, dados);
            alert(resposta.data.mensagem);
            fecharFormEditar();
            buscarTarefas();
        } catch (error) {
            alert("Erro: " + error.message);
        }
    }

    return (
        <div>
            <header
                className="flex justify-between items-center py-4 px-15 bg-linear-to-r from-purple-900 via-purple-600 to-purple-900">
                <input
                    onChange={(event) => pesquisarTarefa(event.target.value)}
                    type="text"
                    placeholder="Pesquisar"
                    className="w-100 h-10 pl-4 rounded bg-white"
                />
                <button
                    onClick={() => SetFormCriar(true)}
                    className="leading-10 bg-purple-800 rounded px-4 font-bold text-white duration-200 cursor-pointer hover:bg-purple-400 hover:text-black">Nova
                    Tarefa</button>
            </header>

            <main className="p-15 bg-slate-200">
                <h1 className="text-3xl font-bold mb-6">Tarefas</h1>
                <div id="tarefas" className="grid grid-cols-3 gap-4"></div>
                <div
                    id="overlay"
                    onClick={() => SetFormCriar(false)}
                    className={`w-full h-screen bg-black/70 fixed top-0 left-0 duration-200 ${formCriar ? "opacity-100 visible" : "opacity-0 invisible"}`}
                ></div>
                <div id="form-criar"
                    className={`w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 delay-200 ${formCriar ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className="flex justify-end">
                        <box-icon name='x' className="cursor-pointer" onClick={fecharFormCriar}></box-icon>
                    </div>
                    <form onSubmit={criarTarefa} className="flex flex-col">
                        <label htmlFor="titulo" className="uppercase text-xs font-bold mb-2 block">Titulo</label>
                        <input ref={tituloCria} id="titulo" type="text" placeholder="Titulo da tarefa"
                            className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required />
                        <label htmlFor="descricao" className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                        <textarea
                            ref={descricaoCria}
                            id="descricao"
                            className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required></textarea>
                        <button type="submit"
                            className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Criar</button>
                    </form>
                </div>

                <div id="form-editar"
                    className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
                    <div className="flex justify-end">
                        <box-icon name='x' className="cursor-pointer" onClick={fecharFormEditar}></box-icon>
                    </div>
                    <form onSubmit={editarTarefa} className="flex flex-col">
                        <input type="hidden" id="idEdicao" />
                        <label htmlFor="tituloEdicao" className="uppercase text-xs font-bold mb-2 block">Titulo</label>
                        <input id="tituloEdicao" type="text" placeholder="Titulo da tarefa"
                            className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required />
                        <label htmlFor="descricaoEdicao" className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                        <textarea
                            id="descricaoEdicao"
                            className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required></textarea>
                        <button type="submit"
                            className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Salvar</button>
                    </form>
                </div>
            </main>

        </div>
    );
}

export default Tarefas;