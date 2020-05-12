import Store from './store.mjs';
import UI from './UI.mjs'



export default class Main{
    static begin(player){
        document.getElementById("header").innerText+=`Welcome, ${player.name}`;
        
        document.querySelector('#my-first-form').addEventListener('submit',(e)=>{
            e.preventDefault();
            var name=document.getElementById("name").value;
            if (name ===''){
                UI.showAlert('Please enter a valid name','red');
            }
            else {
                
                document.getElementById("mycard").style.display="none";
                document.getElementById("gameContent").style.display="block";
                document.getElementById("gameGrid").style.display="none";
                player.name=name;
                player.status=true;
                Store.update(player);
                Main.pre(player);
            }
            
        });
        
        }
    static pre(player){
        document.getElementById("mycard").style.display="none";
        document.getElementById("gameContent").style.display="block";
        document.getElementById("gameGrid").style.display="none";
        document.getElementById("game-reset").style.display="none";
        
        
            UI.instructions(player); 

            document.getElementById("my-second-form").addEventListener('submit',(f)=>{
                f.preventDefault();
                
                var response=document.getElementById("order").value;
                
                if(response==='Y'||response==='N'){
                    document.getElementById("my-second-form").style.display="none";
                    document.getElementById("instructions").style.display="none";
                    document.getElementById("gameGrid").style.display="block";
                    document.getElementById("game-reset").style.display="block";
               
                    if(response==='Y'){
                        player.piece='X';
                        player.opponent='O'
                    }
                    else{
                        player.piece='O';
                        player.opponent='X'

                    }
                    
                    Store.update(player);
                
                    
                    if (response==='Y'){
                        UI.showAlert('Then take the first move, you shall need it','blue',5000);

                    }
                    else{
                        UI.showAlert('Your bravery shall be your undoing....I will go first','blue',5000);
                    }
                    
                }
                else{
                    UI.showAlert('Please select an option','red');
                }

                UI.statusUpdate(player);
            });

        }
    
    static gameLoop(){

    }
    
        
}


