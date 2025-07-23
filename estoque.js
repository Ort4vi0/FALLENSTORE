const { clear } = require("console");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let produtos = [];

function exibirMenu() {
  console.log(
    "=========MENU=========\n1-Adicionar produto\n2-Listar produtos\n3-Atualizar quantidade de produtos\n4-Deletar produtos\n5-Verificar produtor com quantidade baixa\n0-Sair do programa"
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

function adicionarProduto() {
  rl.question("Digite o nome do produto: ", (nome) => {
    rl.question("Digite a quantidade: ", (quantidade) => {
      if (quantidade < 0) {
        console.clear();
        console.log("Digite uma quantidade valida.");
        cadastrar();
      }
      rl.question("Digite o valor do produto: ", (valor) => {
        valor = parseInt(valor);
        produtos.push({
          nome,
          quantidade: parseInt(quantidade),
          valor,
        });
        console.clear();
        console.log("\nProduto cadastrado.\n");
        exibirMenu();
      });
    });
  });
}

function verificarQNT() {
  if (produtos.length == 0) {
    console.log("Nenhum produto registrado\n");
    exibirMenu();
  } else {
    rl.question(
      "Insira qual o a quantidade que deseja verificar: ",
      (qntBaixa) => {
        qntBaixa = parseInt(qntBaixa, 10);
        if (isNaN(qntBaixa)) {
          console.clear();
          console.log("Quantidade inválida, insira novamente!");
          verificarQNT();
        } else {
          console.clear();
          console.log(
            `======Produtos com quantidade abaixo de ${qntBaixa}:=======`
          );
          produtos.forEach((produto, index) => {
            if (produto.quantidade < qntBaixa) {
              console.log(
                `${index + 1} - Produto: ${produto.nome} | Preço: ${
                  produto.valor
                } | Quantidade: ${produto.quantidade}\n`
              );
              console.log("============================================");
            }
          });
          exibirMenu();
        }
      }
    );
  }
}

exibirMenu();
