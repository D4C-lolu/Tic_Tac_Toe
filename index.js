import Main from './main.mjs';
import Store from './store.mjs';
import UI from './UI.mjs';



let pie=Store.getPlayer();

  
const winningMessage=`${pie.name} wins. No, no! It cannot be! Somehow you tricked me. But never again! I, the computer, so swear it!`;
const drawMessage=`It's a tie...You were most lucky, and somehow managed to tie.
Celebrate... for this is the best you will ever achieve.`;
const lossMessage=`Computer wins! As I predicted, I am triumphant once more -- proof
that computers are superior to humans in all regards`;
const currentPlayerTurn=`It's your turn, human. Where will you move?`;
const alreadyTaken=`That square is already occupied.`;
const legalMove=`Fine...`;
const computerMove=`I shall take square number`;
var gameActive;
let originalBoard=["","","","","","","","",""];
let turn='X';
let computer;
startGame();

function opponent(player){
    if(player.piece=='X'){
        
        return 'O';
        
    }
    else{
        
        return 'X';
    }
}


function startGame(){
    if(pie.status===false){
        Main.begin(pie);
        
    }
    else{
    Main.pre(pie);
    
    }
    computer=opponent(pie);

    
} 
document.getElementById("my-second-form").addEventListener('submit',()=>{
    setTimeout(()=>{
        if(turn!==pie.piece){
            console.log(turn)
            console.log(computer)
            setTimeout(()=>makeMove(bestSpot(),pie.opponent),500);
            setTimeout(()=> UI.displayCurrent(currentPlayerTurn),2000);
        }
    },500);
});
document.querySelectorAll(".cell").forEach((key)=>{gameLoop(key)});
document.getElementById("game-reset").addEventListener('click',()=>{
    document.querySelectorAll(".cell").forEach((key)=>{
        key.innerHTML="";
    });
    originalBoard=["","","","","","","","",""];
    
               

});
document.getElementById("game-restart").addEventListener('click',()=>{
    document.getElementById("mycard").style.display="none";
    document.getElementById("gameContent").style.display="block";
    document.getElementById("gameGrid").style.display="none";
    document.getElementById("game-reset").style.display="none";
    UI.statusUpdate(pie);
    document.getElementById("result-bar").style.display="none";
    document.getElementById("my-second-form").style.display="block";
    document.getElementById("instructions").style.display="none";
    UI.displayCurrent('');

    document.querySelectorAll(".cell").forEach((key)=>{
        key.innerHTML="";
    });
    originalBoard=["","","","","","","","",""];
    
    
});
function gameLoop(key){
        key.addEventListener('click',()=>{
            if(key.innerHTML!==""){
                UI.showAlert(alreadyTaken,'red');
            }
            else{ 
                makeMove(key.id,pie.piece);
                UI.displayCurrent(legalMove);
                    setTimeout(()=> {
        
                        if(winner(originalBoard)==='T'){
                            
                            displayResultsPage();
                            UI.displayCurrent(drawMessage);
                            pie.ties+=1;
                            console.log('h');
                            Store.update(pie);  
                                              
                            
                        }
                        else if(winner(originalBoard)===pie.opponent){
                            console.log('lose');
                            displayResultsPage();
                            UI.displayCurrent(lossMessage);
                            pie.losses+=1;
                            console.log('f')
                            
                            Store.update(pie);
                            
                            
                        }
                        else if(winner(originalBoard)===pie.piece){
                            console.log('win');
                            displayResultsPage();
                            UI.displayCurrent(winningMessage);
                            pie.wins+=1;
                            console.log('g')
                            Store.update(pie);
                            
                            
                        }

                        else if(winner(originalBoard)===""){
                            
                            UI.displayCurrent(currentPlayerTurn);
                            
                        }
                        
                
                },100);
                setTimeout(()=>{
                    if(document.getElementById("game-reset").style.display==="block"){
                    makeMove(bestSpot(),pie.opponent);  
                        console.log("visible");
                        setTimeout(()=>{
                            if(winner(originalBoard)===pie.piece){
                                console.log('win');
                                displayResultsPage();
                                UI.displayCurrent(winningMessage);
                            
                                pie.wins+=1;
                                console.log('g')
                                Store.update(pie);
                                console.log("+1+!!+!+!+")
                                
                            }
                            else if(winner(originalBoard)===pie.opponent){
                                displayResultsPage();
                                UI.displayCurrent(lossMessage);
                                pie.losses+=1;
                                console.log('f')
                                
                                Store.update(pie);
                                console.log("+1+!!+!+!+")
                                
                            }
                            else if(winner(originalBoard)==='T'){
                                displayResultsPage();
                                UI.displayCurrent(drawMessage);
                                
                                pie.ties+=1;
                                Store.update(pie);  
                                console.log("+1+!!+!+!+")
                            }
                        },100);
                    } 
                },500);   
             
            
            
        }

    });
  

}
    
function displayResultsPage(){
    document.getElementById("result-bar").style.display="block";  
    document.getElementById("gameGrid").style.display="none";
    document.getElementById("game-reset").style.display="none";
    const sec=document.getElementById("foo");
    sec.innerHTML=document.getElementById("gameGrid").innerHTML;

}



function makeMove(keyNum,piece){
    document.getElementById(`${keyNum}`).innerHTML=piece;
    originalBoard[keyNum]=piece;
    
    
}


function winner(newBoard){
    //Stores all winning combinations
const winCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]

    // if any winning row has three values that are the same (and not EMPTY),
    // then we have a winner
    for(let row = 0;row<8;row++){
        const winCombo=winCombos[row]
        if ((newBoard[winCombo[0]]!="")&&
            (newBoard[winCombo[0]]==newBoard[winCombo[1]])&&
            (newBoard[winCombo[1]]==newBoard[winCombo[2]])){
                return newBoard[winCombo[0]];
            }
    }
    // since nobody has won, check for a tie (no empty squares left)
    if (!newBoard.includes("")){
        return 'T';
    }
    // since nobody has won and it isn’t a tie, the game isn’t over
    return 'N';

}



function isLegal(newBoard,move){
    return newBoard[move]==="";
}

function miniMax(newBoard,player){
    let move = 0;
    let found = false;
    //if computer can win on next move, that’s the move to make
    while(!found && move<newBoard.length){
        if (isLegal(newBoard,move)){
            newBoard[move] = player;
            
            found = winner(newBoard) == player;
            newBoard[move] = "";
        }
        if (!found){
            ++move;
        }
    }
    //otherwise, if human can win on next move, that’s the move to make
    if (!found){
        move = 0;
        ;
        while (!found && move < newBoard.length)
        {
            if (isLegal(newBoard,move)){
                newBoard[move] = pie.piece;
                found = winner(newBoard) == pie.piece;
                newBoard[move] = "";
            }
            if (!found){
                ++move;
            }
        }
    }
     
    if (!found){
        move = 0;
        let i = 0;
        const  BEST_MOVES = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        //pick best open square
        while (!found && i < newBoard.length){
            move = BEST_MOVES[i];
            if (isLegal(newBoard,move)){
                found = true;
            }
            ++i;
        }
    }
    UI.displayCurrent(computerMove+` ${move}`)
    return move;

}



function bestSpot(){
    return miniMax(originalBoard,pie.opponent);
}








