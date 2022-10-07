(() =>{
    'use strict'
    let deck = [];
    const tipes         = ['C', 'D', 'H', 'S'],
          specials      = ['A', 'J', 'Q', 'K'];
    let pointsPlayers = [];
    let posCart = 0,
        player1 = 0,
        player2 =0;

    //Selectors

    const btnApostar   = document.querySelector('#btnApostar'),
          btnPedir     = document.querySelector('#btnPedir'),
          btnPlantar   = document.querySelector('#btnPlantar'),
          playersCarts = document.querySelectorAll('.player .carts'),
          points       = document.querySelectorAll('.point');

    const startGame = (numPlayers = 2) =>{
        deck = createDeck();
        for(let i=0; i< numPlayers; i++){
            pointsPlayers.push(0);
        }
    }
    //events
    btnPedir.disabled= true;
    btnPlantar.disabled = true;
    btnApostar.addEventListener('click', () =>{
        createDeck();
        playersCarts.innerHTML="";
        btnApostar.disabled= true;
        btnPedir.disabled= false;
        btnPlantar.disabled = false;
        player1 = 0;
        player2 = 0;
        posCart = 0;
        points[0].innerHTML = `${player1} puntos`;
        points[1].innerHTML = `${player1} puntos`;
        pointsPlayers = [0,0];
    })

    btnPedir.addEventListener('click', () => {
        const takeCart = gimeACart();
        posCart = posCart + 15;
        player1 = pointsPlayersGame(takeCart, 0);
        const imgCart = document.createElement('img');
        imgCart.src = `./assets/cartas/${takeCart}.png`;
        imgCart.style = `left:${posCart}%;`;
        playersCarts[0].append(imgCart);
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
        deck = [];
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
        return _.shuffle(deck);
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
    const pointsPlayersGame = (takeCart, turn) =>{
        
        pointsPlayers[turn] = pointsPlayers[turn] + cartValue(takeCart);
        points[turn].innerHTML = `${pointsPlayers[turn]} puntos`;
        return pointsPlayers[turn];
    };
    const turnOfCOmputer = (minPoints) => {
        posCart= 0 ;
        btnPedir.disabled= true;
        btnPlantar.disabled = true;
        do{
            const takeCart = gimeACart();
            posCart = posCart + 15;
            player2 = pointsPlayersGame(takeCart, pointsPlayers.length-1);
            const imgCart = document.createElement('img');
            imgCart.src = `./assets/cartas/${takeCart}.png`;
            imgCart.style = `left:${posCart}%;`;
            playersCarts[pointsPlayers.length-1].append(imgCart);
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
    startGame();
    const seeCart = cartValue(gimeACart());
})();


