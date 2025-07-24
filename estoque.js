const { clear } = require("console");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let produtos = [];

function exibirMenu() {
  console.log(
    "=========MENU=========\n1-Adicionar produto\n2-Listar produtos\n3-Pesquisar produto\n4-Atualizar quantidade de produtos\n5-Deletar produto\n6-Verificar produtos com quantidade baixa\n7-Verificar valor do estoque\n0-Sair do programa"
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
  if (produtos.length <= 0) { // Corrigido 'lenght' para 'length'
    console.log("Você não tem produtos para deletar.");
    exibirMenu(); // Chamando exibirMenu diretamente
    return; // Adicionado return para evitar a execução do restante da função
  }
  produtos.forEach((produto, index) => {
    console.log(
      `ID: ${index + 1} || Produto: ${produto.nome} | Preço: ${
        produto.valor // Alterado de produto.preço para produto.valor para consistência
      } | Quantidade: ${produto.quantidade}`
    );
  });
  rl.question(
    "Digite o ID do produto que deseja deletar:\n",
    (opcaoDeletar) => {
      opcaoDeletar = parseInt(opcaoDeletar) - 1;
      if (opcaoDeletar < 0 || opcaoDeletar >= produtos.length) { // Corrigido a condição para 'opcaodeletar >= produtos.length'
        console.log("Opção inválida. Retornando ao menu...");
        exibirMenu();
      } else {
        const nomeProdutoDeletado = produtos[opcaoDeletar].nome; // Captura o nome antes de deletar
        produtos.splice(opcaoDeletar, 1);
        console.clear();
        console.log(`Produto ${nomeProdutoDeletado} deletado!`); // Usa o nome capturado
        exibirMenu();
      }
    }
  );
}

function adicionarProduto() {
  console.clear();
  rl.question("Digite o nome do produto: ", (nome) => {
    rl.question("Digite a quantidade: ", (quantidade) => {
      if (parseInt(quantidade) < 0 || isNaN(parseInt(quantidade))) { // Validação de quantidade
        console.clear();
        console.log("Digite uma quantidade válida.");
        adicionarProduto(); // Chama a função novamente para nova entrada
        return;
      }
      rl.question("Digite o valor do produto: ", (valor) => {
        valor = parseFloat(valor);
        if (isNaN(valor) || valor < 0) { // Validação de valor
          console.clear();
          console.log("Digite um valor válido.");
          adicionarProduto(); // Chama a função novamente para nova entrada
          return;
        }
        console.log("1-Eletrônico\n2-Não eletrônico");
        rl.question("Digite a categoria do produto: ", (categoria) => {
          categoria = parseInt(categoria);
          let nomeCategoria = "";
          switch (categoria) {
            case 1:
              nomeCategoria = "Eletrônico";
              break;
            case 2:
              nomeCategoria = "Não eletrônico";
              break;
            default:
              console.log("Opção de categoria inválida, tente novamente.");
              adicionarProduto();
              return;
          }
          produtos.push({
            nome,
            quantidade: parseInt(quantidade),
            valor,
            categoria: nomeCategoria,
          });
          console.clear();
          console.log("\nProduto cadastrado.\n");
          exibirMenu();
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
        } | Valor: R$${produto.valor.toFixed(2)} | Categoria: ${
          produto.categoria
        }`
      );
    });
    exibirMenu();
  }
}

function pesquisarProdutos() {
  console.clear();
  rl.question("Deseja pesquisar por categoria ou nome?\nDigite 1 para categoria e 2 para nome.\n", (filtrar) => {
    filtrar = parseInt(filtrar);
    switch(filtrar){
      case 1: 
        rl.question("Qual a categoria do produto que deseja procurar?\n1 para eletrônico e 2 para não eletrônico\n", (filtro) => {
          filtro = parseInt(filtro);
          let categoriaBusca = "";
          switch (filtro) {
            case 1:
              categoriaBusca = "Eletrônico";
              break;
            case 2:
              categoriaBusca = "Não eletrônico";
              break;
            default:
              console.log("Opção de categoria inválida, tente novamente.");
              pesquisarProdutos(); // Retorna para a pesquisa
              return;
          }
          
          const produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaBusca);
          if (produtosFiltrados.length > 0) {
            console.log(`\n====== Produtos na categoria "${categoriaBusca}" =======`);
            produtosFiltrados.forEach((produto, index) => {
              console.log(`ID: ${index + 1} | Produto: ${produto.nome} | Quantidade: ${
                produto.quantidade
              } | Valor: R$${produto.valor.toFixed(2)} | Categoria: ${
                produto.categoria
              }`);
            });
          } else {
            console.log(`Nenhum produto encontrado na categoria "${categoriaBusca}".`);
          }
          console.log("\nPressione Enter para voltar ao menu");
          return rl.question("", exibirMenu);
        });
        break;
      case 2:
        rl.question("Qual o nome do produto que deseja procurar?\n", (filtroNome) => {
          const produtosFiltradosPorNome = produtos.filter(produto => produto.nome.toLowerCase().includes(filtroNome.toLowerCase()));
          if (produtosFiltradosPorNome.length > 0) {
            console.log(`\n====== Produtos com nome contendo "${filtroNome}" =======`);
            produtosFiltradosPorNome.forEach((produto, index) => {
              console.log(`ID: ${index + 1} | Produto: ${produto.nome} | Quantidade: ${
                produto.quantidade
              } | Valor: R$${produto.valor.toFixed(2)} | Categoria: ${
                produto.categoria
              }`);
            });
          } else {
            console.log(`Nenhum produto encontrado com o nome "${filtroNome}".`);
          }
          console.log("\nPressione Enter para voltar ao menu");
          return rl.question("", exibirMenu);
        });
        break;
      default:
        console.log("Opção inválida, tente novamente.");
        pesquisarProdutos();
        break;
    }
  });
}

function verificarQNT() {
  if (produtos.length === 0) {
    console.log("Nenhum produto registrado\n");
    exibirMenu();
    return;
  } else {
    rl.question(
      "Insira qual a quantidade que deseja verificar (produtos abaixo desta quantidade serão listados): ",
      (qntBaixa) => {
        qntBaixa = parseInt(qntBaixa, 10);
        if (isNaN(qntBaixa) || qntBaixa < 0) {
          console.clear();
          console.log("Quantidade inválida, insira um número positivo!");
          verificarQNT();
        } else {
          console.clear();
          const produtosBaixaQuantidade = produtos.filter(produto => produto.quantidade < qntBaixa);
          if (produtosBaixaQuantidade.length > 0) {
            console.log(
              `======Produtos com quantidade abaixo de ${qntBaixa}:=======`
            );
            produtosBaixaQuantidade.forEach((produto, index) => {
              console.log(
                `${index + 1} - Produto: ${produto.nome} | Valor: R$${
                  produto.valor.toFixed(2)
                } | Quantidade: ${produto.quantidade} | Categoria: ${produto.categoria}\n`
              );
            });
            console.log("============================================");
          } else {
            console.log(`Nenhum produto com quantidade abaixo de ${qntBaixa}.`);
          }
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
        } | Valor: R$${produto.valor.toFixed(2)} | Categoria: ${produto.categoria}`
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
                `Novo nome para o produto (anterior: ${produtoSelecionado.nome}, deixe em branco para manter): `,
                (newNome) => {
                  rl.question(
                    `Nova quantidade (anterior: ${produtoSelecionado.quantidade}, deixe em branco para manter): `,
                    (newQuantidade) => {
                      if (newQuantidade !== "" && (isNaN(newQuantidade) || parseInt(newQuantidade) < 0)) {
                        console.clear();
                        console.log(
                          "Quantidade inválida. Por favor, insira um número válido e positivo."
                        );
                        atualizarProdutos();
                        return;
                      }
                      rl.question(
                        `Novo valor (anterior: R$${produtoSelecionado.valor.toFixed(2)}, deixe em branco para manter): `,
                        (newValor) => {
                          if (newValor !== "" && (isNaN(newValor) || parseFloat(newValor) < 0)) {
                            console.clear();
                            console.log(
                              "Valor inválido. Por favor, insira um número válido e positivo."
                            );
                            atualizarProdutos();
                            return;
                          }
                          console.log(
                            `Nova categoria (anterior: ${produtoSelecionado.categoria}): `
                          );
                          rl.question(
                            "Digite 1 para Eletrônico e 2 para Não eletrônico (deixe em branco para manter): ",
                            (newCategoria) => {
                              let categoriaAtualizada = produtoSelecionado.categoria;
                              if (newCategoria !== "") {
                                newCategoria = parseInt(newCategoria);
                                switch (newCategoria) {
                                  case 1:
                                    categoriaAtualizada = "Eletrônico";
                                    break;
                                  case 2:
                                    categoriaAtualizada = "Não eletrônico";
                                    break;
                                  default:
                                    console.log(
                                      "Opção de categoria inválida. Mantendo a categoria anterior."
                                    );
                                    break;
                                }
                              }
                              
                              produtoSelecionado.nome =
                                newNome || produtoSelecionado.nome;
                              produtoSelecionado.quantidade =
                                newQuantidade !== "" ? parseInt(newQuantidade) : produtoSelecionado.quantidade;
                              produtoSelecionado.valor =
                                newValor !== "" ? parseFloat(newValor) : produtoSelecionado.valor;
                              produtoSelecionado.categoria = categoriaAtualizada;

                              console.clear();
                              console.log(
                                "\nProduto atualizado com sucesso BB!"
                              );
                              exibirMenu();
                            }
                          );
                        }
                      );
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
  console.log("======VALOR TOTAL DO ESTOQUE======");
  let valorTot = 0;
  for (let i = 0; i < produtos.length; i++) { // Corrigido 'index' para 'i' para escopo local
    valorTot = valorTot + (produtos[i].valor * produtos[i].quantidade); // Multiplicar valor pela quantidade
  }
  console.log(`Valor total do estoque: R$${valorTot.toFixed(2)}`);
  exibirMenu();
}
exibirMenu();