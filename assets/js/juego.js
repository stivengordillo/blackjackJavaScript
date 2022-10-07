let deck = [];
const tipes = ['C', 'D', 'H', 'S'];
const specials= ['A', 'J', 'Q', 'K'];
let posCart = 0;
let player1 = 0;
let player2 =0;

//Selectors

const btnApostar = document.querySelector('#btnApostar');
const btnPedir   = document.querySelector('#btnPedir');
const btnPlantar = document.querySelector('#btnPlantar');
const players1   = document.querySelector('#player1 .carts');
const players2   = document.querySelector('#player2 .carts');
const points     = document.querySelectorAll('.point');

//events
btnPedir.disabled= true;
btnPlantar.disabled = true;
btnApostar.addEventListener('click', () =>{
    deck = [];
    createDeck();
    players1.innerHTML="";
    players2.innerHTML="";
    btnApostar.disabled= true;
    btnPedir.disabled= false;
    btnPlantar.disabled = false;
    player1 = 0;
    player2 = 0;
    posCart = 0;
    points[0].innerHTML = `${player1} puntos`;
    points[1].innerHTML = `${player1} puntos`;
})

btnPedir.addEventListener('click', () => {
    const takeCart = gimeACart();
    posCart = posCart + 15;
    player1 = player1 +cartValue(takeCart);
    points[0].innerHTML = `${player1} puntos`;
    const imgCart = document.createElement('img');
    imgCart.src = `./assets/cartas/${takeCart}.png`;
    imgCart.style = `left:${posCart}%;`;
    players1.append(imgCart);
    if(player1 >21){
        btnPedir.disabled= true;
        btnPlantar.disabled = true;
        turnOfCOmputer(player1)
    }else if(player1 === 21){
        btnPedir.disabled= true;
        btnPlantar.disabled = true;
        turnOfCOmputer(player1)
    }; 
});
btnPlantar.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnPlantar.disabled = true;
    turnOfCOmputer(player1);
})

// functions 

const createDeck = () =>{
    for( let i = 2 ; i<= 10;  i++){
        for(let tipe of tipes){
            deck.push(i+tipe);
        }
    }
    for (let tipe of tipes){
        for(let special of specials){
            deck.push(special+tipe);
        }
    }
    deck = _.shuffle(deck);
    //console.log(deck);
    return deck;
}
const gimeACart = () =>{
    let numCart = deck.length-1;
    let cart = Math.floor(Math.random() * (numCart - 0) + 0);
    const takeYourCart = deck[cart];
    deck.splice(cart,1);
    return takeYourCart;
}
const cartValue = (cart) =>{
    const valueCart = cart.substring(0, cart.length-1);
    return (isNaN(valueCart)) ? 
        (valueCart === 'A') ? 11 : 10 :
        parseInt(valueCart); 
}
const turnOfCOmputer = (minPoints) => {
    posCart= 0 ;
    btnPedir.disabled= true;
    btnPlantar.disabled = true;
    do{
        const takeCart = gimeACart();
        posCart = posCart + 15;
        player2 = player2 +cartValue(takeCart);
        points[1].innerHTML = `${player2} puntos`;
        const imgCart = document.createElement('img');
        imgCart.src = `./assets/cartas/${takeCart}.png`;
        imgCart.style = `left:${posCart}%;`;
        players2.append(imgCart);
        if(minPoints >21 ){
            break;
        }
    } while( (player2 < minPoints) && (minPoints <= 21));
    setTimeout(()=>{
        if(minPoints >21 || (minPoints < player2 && player2 < 21) || (minPoints < player2 && player2 === 21)){
            alert('perdiste')
            btnApostar.disabled= false;
        }else if(minPoints == player2){
            alert('empate')
            btnApostar.disabled= false;
        }else if( player2 >21){
            alert('ganaste')
            btnApostar.disabled= false;
        }
    },100)
}
createDeck();
const seeCart = cartValue(gimeACart());

