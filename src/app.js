//Solicitando a biblioteca express do NodeJs
const express = require("express");

//Solicitando a biblioteca que é uma especificação do W3C
const cors = require("cors");

//Solicitando a biblioteca que ira gerar chave universal unica quando adicionada
const { uuid } = require("uuidv4");

//Atribuindo toda a funcionalidade do express a variavel app
const app = express();


app.use(express.json());
app.use(cors());

const repositories = [];


// BUsca de Repositorio
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});


// Criação de um Repositório
app.post("/repositories", (request, response) => {
  /**
  * |=== should be able to create a new repository ===|
  * Para que esse teste passe, sua aplicação deve permitir que um repositório 
  * seja criado, e retorne um json com o projeto criado.
  */


  //Criando Variaveis especificas (param1) que foram requisitadas do body (param2)
  //const param1 = request."param2"
  const { title, url, techs } = request.body;


  //Criando uma Variavel tipo Vetor e Adicionado as variaveis que foram requesita do body
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }


  //Adicionando no Array o vetor que acabou de ser criado
  repositories.push(repository);


  //Retornando a resposta do back-end em formato json com o array
  return response.json(repository);

});


// Alterando o repositorio
app.put("/repositories/:id", (request, response) => {
  //Criando uma variavel chamado de ID que foi requisitada do parametros "endereço"
  const { id } = request.params;



  //Criando Variaveis especificas (param1) que foram requisitadas do body (param2)
  //const param1 = request."param2"
  const { title, url, techs } = request.body;

  //Criando uma variavel que armazenará a posição do ID dentro do Array caso o encontre
  // a função findIndex faz a busca dentro do array geral de repositorios pega possição caso encontre
  // ID será validado para buscar a possição.
  const repositorytIndex = repositories.findIndex(repository => repository.id === id);

  const likeT = repositories.find(repository => repository.id === id);

  // Verifica se foi encontrado a posição dentro do array com ID capturado pelo parametros
  // Caso não encontre sera retornado pelo o servidor que uma mensagem em json e fron-end code html
  //if (repositorytIndex === -1) {
  if (repositorytIndex < 0) {
    return response.status(400).json({ error: 'like a repository that does not exist' })
  }


  //Realizando o Update nas variaveis tipo Vetor e Adicionado as variaveis que foram requesita do body
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorytIndex].likes,
  }
  // Recebendo a Quantidade de link que tinha anteriormente.
  //likes: repositories[repositorytIndex].likes,


  // Realizando a alteração do repositorio geral na posição do ID encontrado
  // recebendo a nova alteração.
  repositories[repositorytIndex] = repository;


  //Retornando a resposta do back-end em formato json com o array que sofreu update
  return response.json(repository);

});


// Deletando Repositorio
app.delete("/repositories/:id", (request, response) => {

  //Criando uma variavel chamado de ID que foi requisitada do parametros "endereço"
  const { id } = request.params;


  //Criando uma variavel que armazenará a posição do ID dentro do Array caso o encontre
  // a função findIndex faz a busca dentro do array geral de repositorios pega possição caso encontre
  // ID será validado para buscar a possição.
  const repositorytIndex = repositories.findIndex(repository => repository.id === id);

  // Verifica se foi encontrado a posição dentro do array com ID capturado pelo parametros
  // Caso não encontre sera retornado pelo o servidor que uma mensagem em json e fron-end code html
  if (repositorytIndex < 0) {
    return response.status(400).json({ error: 'like a repository that does not exist' })
  }

  // Com a posição localizada será excluido do array atravez da função splice o vetor apenas ele ate ele.
  repositories.splice(repositorytIndex, 1);

  // Resposta do servidor banck-end informado com status que o mesmo foi excluido porem sem 
  // sem enviar mensagem ao front-end
  return response.status(204).send();

});


// Criação de Likes
app.post("/repositories/:id/like", (request, response) => {
  /**
   * |=== should be able to give a like to the repository ===|
   * Para que esse teste passe, 
   * sua aplicação deve permitir que um repositório com o id informado possa 
   * receber likes. O valor de likes deve ser incrementado em 1 a cada requisição,
   * e como resultado, retornar um json contendo o repositório com o número 
   * de likes atualizado.
   */

  //Criando uma variavel chamado de ID que foi requisitada do parametros "endereço"
  const { id } = request.params;

  // Estou criando uma variavel que receberá um repositorio apos uma busca que será
  // realizado no array do repositorio geral que criamos. Essa busca ira verificar se o 
  // ID que esta contido em algum vetor do repository tem o mesmo ID que pegou no parametros
  const repository = repositories.find(repository => repository.id === id);


  // Essa é validação caso o ID não seja encontrato no repositorio. Fazendo retornar CODE HTML
  // Alertando ao usuario que houve problema.
  if (!repository) {
    return response.status(400).json({ error: 'like a repository that does not exist' })
  }


  // A variavel likes que esta contida do vetor recebera o incremento de 1
  repository.likes++;


  // Resposta retorna do servidor em formato json com o repositorio que recebeu o like
  return response.json(repository);
});


// Deixando esse arquivo acessivel as demais fontes relacionado a esse projeto.
module.exports = app;
