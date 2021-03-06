console.log("Starting the Bot..");

const Twitter = require('twitter')
require('dotenv').config()

const Tweet = new Twitter({
  consumer_key:         process.env.BOT_CONSUMER_KEY,
  consumer_secret:      process.env.BOT_CONSUMER_SECRET,
  access_token_key:     process.env.BOT_ACESS_TOKEN,
  access_token_secret:  process.env.BOT_ACESS_TOKEN_SECRET,
})

function action(tweet){
  const {retweeted_status, id_str, screen_name, is_quote_status} = tweet;

	// Quem enviou o tweet?
	//console.log ('Validando condicoes Tweet:' +tweet.user.id);
	//Qual éo texto?
	//console.log('Texto do Tweet:' + tweet.text);

  if(!retweeted_status && !is_quote_status && tweet.user.id != '1483146482844934100' ){ // Se o status não for um retweet normal, nem um retweet com comentário
    
    var name = tweet.user.screen_name;
    var nameID  = tweet.id_str;


	console.log("Iniciando uma curtida :" + name);
	
	
	Tweet.post('favorites/create', {id: id_str}, erro => { // Dar like no tweet
      if(erro){
        return console.log("Erro no like: " + erro) 
        // Caso haja algum erro, jogar no console para verificarmos.
      }else {
		  
        //return console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`) 
        // Se der tudo certo, avisar no console com o URL do tweet original
      }
    })


   
	 
	 
  }else {
       return 
       // Caso as condições não sejam atendidas, retornar a função vazia, indo para o próximo tweet
     }
}

console.log("criando Stream..");

var stream = Tweet.stream('statuses/filter', {track: 'BBB livro, BBB21 livro'}) 
// Aqui dizemos para o programa verificar em modo streaming

console.log("iniciando Stream..");

stream.on('data', action) 
// Ao receber as informações (`data`), passar elas para a função action e chamar a mesma.

console.log("ativando log error Stream..");

stream.on('error', erro => console.log("Erro: "+ erro)) 
// Caso haja algum erro, jogar o erro no console para verificarmos.