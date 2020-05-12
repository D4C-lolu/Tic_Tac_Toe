//class stores the player object and saves it
export default class Store{
    //function returns a player object
    static getPlayer(){
        //instantiates the player object
        let player;
        if(localStorage.getItem('player')===null){
            player={
                name:'NEW PLAYER',
                wins:0,
                losses:0,
                ties:0,
                piece:'',
                opponent:'',
                status:false
                }
        }
        else{
            player=JSON.parse(localStorage.getItem('player'));
        }
        return player;
    }

    //updates the player object
    static update(player){
        localStorage.setItem('player',JSON.stringify(player));

    }
}
