# FALLENSTORE - SISTEMA DE GERENCIAMENTO DE ESTOQUE

Este é um sistema simples de gerenciamento de estoque, desenvolvido em JavaScript usando Node.js, que permite adicionar, listar, pesquisar, atualizar e deletar produtos, além de verificar o valor total do estoque e produtos com baixa quantidade.

## FUNCIONALIDADES

**Adicionar Produto:** Cadastre novos produtos com nome, quantidade, valor e categoria (Eletrônico ou Não Eletrônico).

**Listar Produtos:** Visualize todos os produtos cadastrados com seus respectivos IDs, nomes, quantidades, valores e categorias.

**Pesquisar Produto:** Encontre produtos por nome ou por categoria, facilitando a localização de itens específicos.

**Atualizar Produto:** Modifique as informações de um produto existente, como nome, quantidade, valor e categoria.

**Deletar Produto:** Remova produtos do estoque, garantindo que o inventário esteja sempre atualizado.

**Verificar Produtos com Quantidade Baixa:** Identifique rapidamente quais produtos estão abaixo de uma quantidade mínima definida.

**Verificar Valor Total do Estoque:** Calcule e exiba o valor total de todos os produtos no estoque.

# Observações:

Os dados são armazenados em um array (produtos) em memória, o que significa que eles não são persistentes. Ao fechar o programa, todos os dados serão perdidos. Para um sistema mais robusto, seria necessário implementar armazenamento em banco de dados ou arquivos.
