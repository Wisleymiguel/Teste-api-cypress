Cypress.Commands.add('token', ( email, senha ) => { 

    cy.request({
        method: 'POST',
        url:'login',
        body: {
            "email": email,
            "password": senha
          
        }
      }).then (response=>{
        return response.body.authorization
      })
})

Cypress.Commands.add('cadastrarProduto',(token,produto,preco,descricao,quantidade) => {

    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { authorization: token }, 
        body: {
          "nome": produto,
          "preco": preco,
          "descricao": descricao,
          "quantidade": quantidade 
        },
        failOnStatusCode: false
    })   
})
Cypress.Commands.add('cadastrarUsuario', (token, nome, email, senha, administrador) => {
  return cy.request({
    method: 'POST',
    url: 'usuarios',
    headers: { Authorization: token },
    body: {
      nome: nome,
      email: email,
      password: senha,
      administrador: administrador === 'true',
    },
    failOnStatusCode: false,
  });
});

