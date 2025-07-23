
const { clear } = require("console");
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
function exibirMenu() {
    console.log(
      "=========MENU=========\n1-Adicionar produto\n2-Listar produtos\n3-Atualizar quantidade de produtos\n4-Deletar lembrete\n5-Verificar produtor com quantidade baixa\n0-Sair do programa"
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
          atulizarProdutos();
          break;
        case 4:
          deletarProduto();
          break;
        case 5:
          console, clear();
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