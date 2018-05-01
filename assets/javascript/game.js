$(document).ready(function() {
    // initialize variables
    // wins and losses to 0 on page load
    var wins=0;
    var losses=0;
       
    // initialize champions
    var harry = {
        name:"Harry Potter",
        health: 110,
        power: 17,
        defense: 5,
        image: '<img class="char-image" id="harry-img" src="assets/images/harry-potter.png" alt="Harry Potter" style="width:100%;">'
    }

    var cedric = {
        name:"Cedric Diggory",
        health: 150,
        power: 5,
        defense: 17,
        image: '<img class="char-image" id="cedric-img" src="assets/images/cedric-diggory.png" alt="Cedric Diggory" style="width:100%;">'
    }

    var fleur = {
        name:"Fleur Delacour",
        health: 120,
        power: 9,
        defense: 8,
        image: '<img class="char-image" id="fleur-img" src="assets/images/fleur-delacour.png" alt="Fleur Delacour" style="width:100%;">'
    }

    var viktor = {
        name:"Viktor Krum",
        health: 160,
        power: 4,
        defense: 21,
        image: '<img class="char-image" id="viktor-img" src="assets/images/viktor-krum.png" alt="Viktor Krum" style="width:100%;">'
    }

    // used to store the order of the champions, order will be randomized later
    var champions = [harry, cedric, fleur, viktor];
    var placement = ["first", "second", "third", "fourth"];
    var characterBank = champions.slice();
    
    // object used to store the player data and interact with the html
    var player={
        character: false,
        health: 0,
        power: 0,
        resetDisplay: function(){
            $("#player-character").empty();
        },
        updateDisplay: function(){
            if (this.character !== false){
                $("#player-character").html(this.character.image+'<p class="active-char centered-top m-0">'+this.character.name+'</p>'+'<p class="active-char centered-bottom m-0">'+this.health+'</p>');
            } else {
                this.resetDisplay();
            }
        }
    };

    // object used to store the current adversary and interact with the html
    var adversary={
        character: false,
        health: 0,
        defense: 0,
        resetDisplay: function(){
            $("#adversary-character").empty();
        },
        updateDisplay: function(){
            if (this.character !== false){
                $("#adversary-character").html(this.character.image+'<p class="active-char centered-top m-0">'+this.character.name+'</p>'+'<p class="active-char centered-bottom m-0">'+this.health+'</p>');
            } else {
                this.resetDisplay();
            }
        }
    };

    // object used to store the list of potential characters
    var charSelect={
        bank: shuffleArr(champions.slice()),
        resetDisplay: function(){
            $("#character-bank").empty();
        },
        updateDisplay: function(){
            this.resetDisplay();
            for (var i=0; i<this.bank.length; i++){
                $("#character-bank").append('<div class="col-md-3 col-6 char-button p-0" value='+i+'>'+this.bank[i].image+'<div class="bank-char text-light">'+this.bank[i].name+'</div></div>');
            }
        }
    }

    // returns a random integer between 0 and the argument(inclusive)
    function randInt(maxInt){
        return (Math.floor(Math.random() * (maxInt+1)))
    }

    // randomizes the order of the elements within an array
    function shuffleArr(arr) {
        for (var i = 0; i<arr.length; i++) {
            var j = randInt(i);
            var temp = arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
        }
        return arr;
    }

    // remove the dueal button
    function removeDuelBtn(){
        $("#duel-area").empty();
    }

    // add a duel button between the player and the opponent
    function addDuelBtn(){
        $("#duel-area").html('<button type="button" class="btn btn-dark btn-lg p-3 pr-5 pl-5" id="duel-button">Duel!</button>');
    }

    // displays your current wins and losses
    function updateWinLoss() {
        $("#wins-text").text(wins);
        $("#losses-text").text(losses);
    }

    // output the str onto the player message area
    function playerMessage(str) {
        $("#player-message").text(str);
    }

    // game reset function
    // clear player character and adversaries
    // generate choices for player character
    function gameReset() {
        updateWinLoss();
        charSelect.bank=shuffleArr(champions.slice());
        charSelect.updateDisplay();
        player.character=false;
        adversary.character=false;
        player.updateDisplay();
        adversary.updateDisplay();
        removeDuelBtn();
        playerMessage("Select your Champion!");
    }

    $("#harryPotterSong")[0].volume=.3;
    gameReset();

    // if player hasn't picked a character, pick a character from the bank
    // if the player hasn't picked an opponent, pick an opponent
    $("#character-bank").on("click", ".char-button", function(){
        if (player.character === false){
            player.character=charSelect.bank[parseInt($(this).attr("value"))];
            player.health = player.character.health;
            player.power = player.character.power;
            player.updateDisplay();
            charSelect.bank.splice(parseInt($(this).attr("value")), 1);
            charSelect.updateDisplay();
            playerMessage("Select your opponent!");
        } else if (adversary.character === false) {
            adversary.character=charSelect.bank[parseInt($(this).attr("value"))];
            adversary.health = adversary.character.health;
            adversary.defense = adversary.character.defense;
            adversary.updateDisplay();
            charSelect.bank.splice(parseInt($(this).attr("value")), 1);
            charSelect.updateDisplay();
            playerMessage("May the best wizard win!");
            addDuelBtn();
        }
    });

    // have the player fight the opponent upon clicking the duel button
    $("#duel-area").on("click", "#duel-button", function(){
        player.health -= adversary.defense;
        adversary.health -= player.power;
        player.power += player.character.power;
        // check if the player still has health left
        if (player.health <= 0){
            losses += 1;
            playerMessage("You lost the duel! You came in " + placement[(charSelect.bank.length +1)] + " place in the dueling event!");
            var tempReset = setTimeout(gameReset, 2000);
        // check if the player has defeated the adversary
        } else if (adversary.health <= 0){
            playerMessage("You won the duel! Select your next opponent!");
            adversary.character=false;
            removeDuelBtn();
            // check if the player has defeated all the opponents
            if (charSelect.bank.length <=0){
                wins += 1;
                playerMessage("You've defeated all the other champions and won the dueling event!");
                var tempReset = setTimeout(gameReset, 2000);
            }
        }
        adversary.updateDisplay();
        player.updateDisplay();
    });

    // reset button
    $("#reset-button").on("click", function(){
        losses += 1;
        gameReset();
        playerMessage("You have forfeited the duel. Choose a new champion!");        
    });
    
});