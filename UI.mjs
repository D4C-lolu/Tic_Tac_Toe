//manipulates the UI

export default class UI{
    
    //prints messages to the screen
    static showAlert(message,className,time=3000){
        const div=document.createElement('div');
        div.className=`alert alert-${className} mx-auto d-2 text-warning bg-dark text-center`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('body');
        const section=document.querySelector('#mycard');
        container.insertBefore(div,section);
        //vanish in 3 secs
        setTimeout(()=>document.querySelector('.alert').remove(),time);
   
    }
    static statusUpdate(player){
        let statusBar=document.getElementById("status-bar");
        statusBar.innerText=`Games Played: ${player.ties+player.wins+player.losses}|| ${player.name}: ${player.wins}|| Computer: ${player.losses}|| Ties: ${player.ties}`
        
        
    }
    static displayCurrent(message){
        let gameStatus=document.getElementById("game-status");
        gameStatus.innerText=message
    }
    //Displays the game instructions.
    static instructions(player){
        if(player.wins+player.losses+player.ties===0){
        document.getElementById("instructions").innerText+=`Welcome to the ultimate man-machine showdown: Tic-Tac-Toe. 
            --where human brain is pit against silicon processor
            Make your move known by clicking on a cell, 0 - 8. The number
            corresponds to the desired board position, as illustrated:
            0 | 1 | 2
            =========
            3 | 4 | 5
            =========
            6 | 7 | 8
            Prepare yourself. The battle is about to begin\n`;
            

        
        }
        else{
            document.getElementById("instructions").innerText+=`Welcome back ${player.name}`
        }
            
    }
    
} 
