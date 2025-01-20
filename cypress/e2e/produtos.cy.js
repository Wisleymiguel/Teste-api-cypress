/// <reference types="cypress" />
import contrato from '../Contratos/Produtos.contratos'

describe('Teste de API em Produtos ', () => {
    let token;
  
    
    beforeEach(() => {
      cy.token('Wisley-qa@ebac.com.br', 'teste').then(tkn => {
        token = tkn;  // Armazenando o token
      });
    });
  
    it('Deve Listar produtos com sucesso  - GET', () => {
      cy.request({
        method: 'GET',
        url: 'produtos'
      }).should((response) => {
        expect(response.status).equal(200);
        expect(response.body).to.have.property('produtos');
      });
    });
  
    it('Deve Cadastrar produto com sucesso - POST', () => {
        let produto = 'Produto EBAC  ' +  Math.floor(Math.random() * 1000000000)

        cy.cadastrarProduto(token,produto,10,'Cabo USB', 100)   

        .should((response) => {
        expect(response.status).equal(201);
        expect(response.body.message).equal('Cadastro realizado com sucesso');
      });
    });

    it('Deve validar mensagem  de produto cadastrado anteriomente - POST', () => {
        cy.cadastrarProduto(token,'Cabo USB 001',10,'Cabo USB', 100)   
        
          .should((response) => {
            expect(response.status).equal(400);
            expect(response.body.message).equal('Já existe produto com esse nome');
          });

    });

    it('Deve editar um produto com sucesso - PUT ', () => {
        let produto = 'Produto EBAC Editado   ' +  Math.floor(Math.random() * 1000000000)
        cy.cadastrarProduto(token, produto, 10, ' Produto Editado',  100)   
        .then(response=>{
            let id = response.body._id

          
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": produto,
                    "preco": 500,
                    "descricao": "Produto Editado",
                    "quantidade": 100
                  }
    
            }).should((response) => {
                expect(response.status).equal(200);
                expect(response.body.message).equal('Registro alterado com sucesso');
              });

        })
        
    });

    it('Deve deletar um produto - DELETE', () => {
        cy.cadastrarProduto(token,'Produto a ser deletado', 100 , 'delete',100)
            .then(response=>{
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token },


                }).should((response) => {
                expect(response.status).equal(200);
                expect(response.body.message).equal('Registro excluído com sucesso');
            });



        })




    });

    it('Deve validar  contratos de produtos com secesso ', () => {
        cy.request('produtos').then(response=>{
            return contrato.validateAsync(response.body)
        })
        
    });

  });
  