const { clear } = require("console");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let produtos = [];

function exibirMenu() {
  console.log(
    "=========MENU=========\n1-Adicionar produto\n2-Listar produtos\n3-Pesquisar produto\n4-Atualizar quantidade de produtos\n5-Deletar produto\n6-Verificar produtor com quantidade baixa\n7- verificar valor do estoque\n0-Sair do programa"
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
        atualizarProdutos();
        break;
      case 5:
        deletarProduto();
        break;
      case 6:
        console.clear();
        verificarQNT();
        break;
      case 7:
        valorTotal();
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

function deletarProduto() {
  console.clear();
  if (produtos.lenght <= 0) {
    console.log("Você não tem produtos para deletar.");
    console.log("", exibirMenu);
  }
  produtos.forEach((produto, index) => {
    console.log(
      `ID: ${index + 1} || Produto: ${produto.nome} | Preço: ${
        produto.preço
      } | Quantidade: ${produto.quantidade}`
    );
  });
  rl.question(
    "Digite o ID do produto que deseja deletar:\n",
    (opçãoDeletar) => {
      opçãoDeletar = parseInt(opçãoDeletar) - 1;
      if (opçãoDeletar < 0 || opçãoDeletar > produtos.length) {
        console.log("Opção inválida. Retornando ao menu...");
        exibirMenu();
      } else {
        console.clear();
        produtos.splice(opçãoDeletar, 1);
        console.log(`Produto ${produtos[opçãoDeletar].nome} deletado!`);
        exibirMenu();
      }
    }
  );
}

function adicionarProduto() {
  console.clear();
  rl.question("Digite o nome do produto: ", (nome) => {
    rl.question("Digite a quantidade: ", (quantidade) => {
      if (quantidade < 0) {
        console.clear();
        console.log("Digite uma quantidade valida.");
        cadastrar();
      }
      rl.question("Digite o valor do produto: ", (valor) => {
        valor = parseFloat(valor);
        console.log("1-Eletrônico\n2-Não eletrônico");
        rl.question("Digite a categoria do produto: ", (categoria) => {
          categoria = parseInt(categoria);
          switch (categoria) {
            case 1:
              categoria = "Eletrônico";
              produtos.push({
                nome,
                quantidade: parseInt(quantidade),
                valor,
                categoria,
              });
              console.clear();
              console.log("\nProduto cadastrado.\n");
              exibirMenu();
              break;
            case 2:
              categoria = "Não eletrônico";
              produtos.push({
                nome,
                quantidade: parseInt(quantidade),
                valor,
                categoria,
              });
              console.clear();
              console.log("\nProduto cadastrado.\n");
              exibirMenu();
              break;
            default:
              console.log("Opção inválida, tente novamente.");
              adicionarProduto();
              break;
          }
        });
      });
    });
  });
}

function listarProdutos() {
  console.clear();
  if (produtos.length <= 0) {
    console.log("Não há produtos.");
    exibirMenu();
  } else {
    console.log("======PRODUTOS======");
    produtos.forEach((produto, index) => {
      console.log(
        `ID: ${index + 1} | Produto: ${produto.nome}  | Quantidade: ${
          produto.quantidade
        } | Valor: ${produto.valor.toFixed(2)} | Categoria: ${
          produto.categoria
        }`
      );
    });
    exibirMenu();
  }
}

function pesquisarProdutos() {
  rl.question("Deseja pesquisar por categoria ou nome?\nDigite 1 para categoria e 2 para nome.\n", (filtrar) => {
    filtrar = parseInt(filtrar)
    switch(filtrar){
      case 1: 
        rl.question("Qual a categoria do produto que deseja procurar?\n1 para eletrônico e 2 para não eletrônico\n", (filtro) => {
          filtro = parseInt(filtro)
          switch(filtro){
            case 1:
              produtos.forEach((produto, index) => {
                if(produto.categoria == "Eletrônico"){
                  console.log(`ID: ${index + 1} | Produto: ${produto.nome}  | Quantidade: ${
                    produto.quantidade
                  } | Valor: ${produto.valor.toFixed(2)} | Categoria: ${
                    produto.categoria
                  }`)
                  console.log("\nPressione Enter para voltar ao menu");
                  return rl.question("", exibirMenu);
                }else{
                  console.log("Categoria inexistente no sistema")
                  console.log("\nPressione Enter para voltar ao menu");
                 return rl.question("", exibirMenu);
                }
              })
              }
             })
            break
      case 2:
        rl.question("Qual o nome do produto que deseja procurar?\n", (filtro) => {
          produtos.forEach((produto, index) => {
            if(produto.nome == filtro){
              console.log(`ID: ${index + 1} | Produto: ${produto.nome}  | Quantidade: ${
                produto.quantidade
              } | Valor: ${produto.valor.toFixed(2)} | Categoria: ${
                produto.categoria
              }`)
            } else {
              console.log("Nome inexistente no sistema")
              console.log("\nPressione Enter para voltar ao menu");
              return rl.question("", exibirMenu);
            }
          })
          console.log("\nPressione Enter para voltar ao menu");
          return rl.question("", exibirMenu);
        });
        break
      default:
        console.log("Número inválido, tente novamente")
        pesquisarProdutos()
        break
    }
  })
  
}

function verificarQNT() {
  if (produtos.length == 0) {
    console.log("Nenhum produto registrado\n");
    exibirMenu();
  } else {
    rl.question(
      "Insira qual a quantidade que deseja verificar: ",
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

function atualizarProdutos() {
  if (produtos.length === 0) {
    console.clear();
    console.log("Não há nenhum produto cadastrado.");
    rl.question("Pressione Enter para retornar ao Menu...\n", exibirMenu);
  } else {
    console.log("\n--- Produtos Cadastrados ---");
    produtos.forEach((produto, index) => {
      console.log(
        `ID: ${index + 1} | Produto: ${produto.nome} | Quantidade: ${
          produto.quantidade
        } | Valor: R$${produto.valor.toFixed(2)}`
      );
    });
    console.log("-".repeat(60));

    rl.question(
      "Insira o ID do produto que deseja editar (ou 'cancelar' para voltar): ",
      (IDdoProduto) => {
        if (IDdoProduto.toLowerCase() === "cancelar") {
          exibirMenu();
          return;
        }
        const index = parseInt(IDdoProduto) - 1;
        if (isNaN(index) || index < 0 || index >= produtos.length) {
          console.log("ID inválido. Por favor, insira um número válido.");
          atualizarProdutos();
          return;
        }

        const produtoSelecionado = produtos[index];
        console.log(
          `\nVocê selecionou: ID: ${index + 1} | Produto: ${
            produtoSelecionado.nome
          } | Quantidade: ${
            produtoSelecionado.quantidade
          } | Valor: R$${produtoSelecionado.valor.toFixed(2)} | Categoria: ${
            produtoSelecionado.categoria
          }`
        );

        rl.question(
          "Confirma a edição deste produto? [s/n] ",
          (confirmSelectP) => {
            if (
              confirmSelectP.toLowerCase() === "s" ||
              confirmSelectP.toLowerCase() === "sim"
            ) {
              rl.question(
                `Novo nome para o produto (anterior: ${produtoSelecionado.nome}): `,
                (newNome) => {
                  rl.question(
                    `Nova quantidade (anterior: ${produtoSelecionado.quantidade}): `,
                    (newQuantidade) => {
                      if (isNaN(newQuantidade) || newQuantidade < 0) {
                        console.clear();
                        console.log(
                          "Tongo, você não inseriu um valor válido, repense sua vida!"
                        );
                        atualizarProdutos();
                      } else {
                        rl.question(
                          `Novo valor (anterior: ${produtoSelecionado.valor.toFixed(
                            2
                          )}): `,
                          (newValor) => {
                            if (isNaN(newValor) || newValor < 0) {
                              console.clear();
                              console.log(
                                "Tongo, você não inseriu um valor válido, repense sua vida!"
                              );
                              atualizarProdutos();
                            } else {
                              console.log(
                                `Nova categoria (anterior: ${produtoSelecionado.categoria}): `
                              );
                              rl.question(
                                "Digite 1 para Eletrônico e 2 para Não eletrônico\n",
                                (newCategoria) => {
                                  newCategoria = parseInt(newCategoria);
                                  switch (newCategoria) {
                                    case 1:
                                      newCategoria = "Eletrônico";
                                      break;
                                    case 2:
                                      newCategoria = "Não eletrônico";
                                      break;
                                    default:
                                      console.log(
                                        "Opção inválida, tente novamente."
                                      );
                                      atualizarProdutos();
                                      break;
                                  }
                                  produtoSelecionado.nome =
                                    newNome || produtoSelecionado.nome;
                                  produtoSelecionado.quantidade =
                                    parseInt(newQuantidade) ||
                                    produtoSelecionado.quantidade;
                                  produtoSelecionado.valor =
                                    parseFloat(newValor) ||
                                    produtoSelecionado.valor;
                                  produtoSelecionado.categoria =
                                    newCategoria ||
                                    produtoSelecionado.categoria;

                                  console.clear();
                                  console.log(
                                    "\nProduto atualizado com sucesso BB!"
                                  );
                                  exibirMenu();
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              );
            } else {
              console.log("Edição cancelada. Retornando ao menu... xD");
              exibirMenu();
            }
          }
        );
      }
    );
  }
}

function valorTotal() {
  console.clear();
  console.log("======VALOR=TOTAL======");
  let valorTot = 0;
  for (index = 0; index < produtos.length; index++) {
    valorTot = valorTot + produtos[index].valor;
  }
  console.log(`Valor total: ${valorTot}`);
  exibirMenu();
}
exibirMenu();
