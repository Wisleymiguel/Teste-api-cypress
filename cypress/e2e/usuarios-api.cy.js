/// <reference types="cypress" />
import contrato from '../Contratos/usuario.contratos'

describe('Testes da Funcionalidade Usuários', () => {

  let token;

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body).then(() => {
        expect(response.status).to.equal(200);
      });
    });
  });
  

  

  it('Deve listar usuários cadastrados- GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('usuarios');
    });
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    const fakeEmail = `user${Date.now()}@qa.com`;
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        nome: 'Fulano da Silva',
        email: fakeEmail,
        password: 'teste',
        administrador: 'true',
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).equal('Cadastro realizado com sucesso');
    });
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
        nome: 'Fulano da Silva',
        email: 'beltrano@qa.com.br',
        password: 'teste',
        administrador: 'true',
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.message).equal('Este email já está sendo usado');
    });
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios/0uxuPY0cbmQhpEz1',
      headers: { Authorization: token },
      body: {
        nome: 'Teste.123',
        email: 'beltrano@qa.com',
        password: 'false',
        administrador: 'false',
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).equal('Registro alterado com sucesso');
    });
  });

  describe('Testes da Funcionalidade Usuários', () => {
    let token;
  
    before(() => {
      cy.request({
        method: 'POST',
        url: 'login',
        body: {
          email: 'Wisley-qa@ebac.com.br',
          password: 'teste',
        },
      }).then((response) => {
        token = response.body.authorization;
      });
    });
  
    it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
      const email = `usuario_${Date.now()}@qa.com`;
  
      cy.cadastrarUsuario(token, 'Usuário a ser deletado', email, 'senha123', 'true')
        .then((response) => {
          const userId = response.body._id;
  
          cy.request({
            method: 'DELETE',
            url: `usuarios/${userId}`,
            headers: { Authorization: token },
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.equal(200);
          
          });
        });
    });
  });
})