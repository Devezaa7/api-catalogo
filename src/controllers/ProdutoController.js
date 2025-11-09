import Produto from "../models/Produto.js";

let produtos = [];
let proximoId = 1;

export default class ProdutoController {
  listarTodos(req, res) {
    return res.json(produtos);
  }

  buscarPorId(req, res) {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.json(produto);
  }

  criar(req, res) {
    const { nome, categoria, preco } = req.body;

    if (!nome || !categoria || preco === undefined) {
      return res.status(400).json({ mensagem: "Dados incompletos" });
    }

    const novoProduto = new Produto(proximoId++, nome, categoria, preco);
    produtos.push(novoProduto);
    return res.status(201).json(novoProduto);
  }

  atualizar(req, res) {
    const id = parseInt(req.params.id);
    const { nome, categoria, preco } = req.body;
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    produto.nome = nome ?? produto.nome;
    produto.categoria = categoria ?? produto.categoria;
    produto.preco = preco ?? produto.preco;

    return res.json(produto);
  }

  deletar(req, res) {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    produtos.splice(index, 1);
    return res.status(204).send();
  }
}
