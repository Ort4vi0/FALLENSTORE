
const { clear } = require("console");
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

let produtos = []
  
function exibirMenu() {
    console.log(
      "=========MENU=========\n1-Adicionar produto\n2-Listar produtos\n3-Pesquisar produto\n4-Atualizar quantidade de produtos\n5-Deletar produto\n6-Verificar produtor com quantidade baixa\n0-Sair do programa"
    );
    rl.question("Insira a opção desejada.\n", (opcaoMenu) => {
      opcaoMenu = parseInt(opcaoMenu, 10);
      switch (opcaoMenu) {
        case 1:
          adicionarProduto();
          break;
        case 2:
          listarProdutos();
          break;
        case 3:
          pesquisarProdutos();
          break;
        case 4:
          atulizarProdutos();
          break;
        case 5:
          deletarProduto();
          break;
        case 6:
          console.clear();
          verificarQNT();
          break;
        case 0:
          process.exit();
          break;
        default:
          console.log("Insira uma opção válida!\n");
          exibirMenu();
      }
    });
}

function listarProdutos() {
  console.clear()
  if (produtos.length <= 0) {
    console.log("Não há produtos.")
    exibirMenu()
  } else {
    console.log("======PRODUTOS======")
    produtos.forEach((produto, index) => {
      console.log(
        `ID: ${index + 1} | Produto: ${produto.nome}  | Quantidade: ${produto.quantidade} | Valor: R$ ${produto.valor}`
      )
    })
    exibirMenu()
  }
}

function pesquisarProdutos(){
  rl.question("Qual o nome do produto que deseja procurar?", (filtro) => {
      const busca = produtos.filter((produtos) => produtos.nome == filtro)
      console.log(busca)
      console.log("\nPressione Enter para voltar ao menu")
      return rl.question("", exibirMenu)
    })
}

exibirMenu()