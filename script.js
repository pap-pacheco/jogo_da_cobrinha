let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //renderiza o desenho qeu será apresentado no canvas
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food ={ //posicionamento aleatório da frutinha
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let ponto = 0;
let nivel = 0;
let velocidade = 250;
let parede = false;
let valor;
let jogo = setInterval(iniciarJogo, velocidade);
let mensagem = 'Game Over :( \n Pantuação: ';

function criarBG(){ //função para criação do canvas
    context.fillStyle = "lightgreen"; //estilo do contexto
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){ //criar a cobrinha
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){ //cria a frutinha
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){ //evento de tecla das setinhas
    if(event.keyCode == 37 && direction != 'right') direction = 'left'; //se evento = 37 e direção não for para direita seta movimento para esquerda
    if(event.keyCode == 38 && direction != 'down') direction = 'up';    //se evento = 38 e direção não for para baixo seta movimento para cima
    if(event.keyCode == 39 && direction != 'left') direction = 'right'; //se evento = 39 e direção não for para esquerda seta movimento para direita
    if(event.keyCode == 40 && direction != 'up') direction = 'down';    //se evento = 40 e direção não for para cima seta movimento para baixo
}

function contaPontos(){
    ponto ++;
    document.getElementById("ponto").innerHTML = leftPad(ponto, 10, '0');
}

function aumentaVelocidade(){
    nivel ++;
    velocidade --;
    document.getElementById("nivel").innerHTML = leftPad(nivel, 10, '0');
}

//definir se existe paredes ou não
function verificaParede(){   
    if (document.getElementById("sim").checked) {
        parede = true; 
        document.getElementById("snake").style.border = "5px solid rgb(134, 65, 15)";
    }else if (document.getElementById("nao").checked) {
        parede = false;
        document.getElementById("snake").style.border = "5px solid gray";
    }
}

//acrescentar zeros a esquerda
function leftPad(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
}

function iniciarJogo(){    
    
    if(ponto == 0 ) document.getElementById("ponto").innerHTML = leftPad(0, 10, '0');
    if(nivel == 0) document.getElementById("nivel").innerHTML = leftPad(0, 10, '0');
    verificaParede()
    
    if(parede == false){
        //permite que a cobrinha possa atravessar de um lado e reiniciar do outro
        if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
        if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
        if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    }else{
        if((snake[0].x > 15*box && direction == "right") || (snake[0].x < 0 && direction == 'left') || 
        (snake[0].y > 15*box && direction == "down") || (snake[0].y < 0 && direction == 'up')){
            clearInterval(jogo);
            alert(mensagem.concat(ponto));
        }
    }
    
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }        
    }

    criarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //ilusão de movimento
    if(direction == "right") snakeX += box; //se for para direita acrescentar um quadrado
    if(direction == "left") snakeX -= box;  //se for para esquerda diminuir um quadrado
    if (direction == "up") snakeY -= box;   //se for para cima diminuir um quadrado
    if(direction == "down") snakeY += box;  //se for para baixo acrescentar um quadrado

    if(snakeX == food.x && snakeY == food.y){
        contaPontos();
        if(ponto % 5 == 0){
            aumentaVelocidade();
        }
    }

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
   
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha

    
}

//let jogo = setInterval(iniciarJogo, 100);