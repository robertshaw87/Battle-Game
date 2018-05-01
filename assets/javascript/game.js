$(document).ready(function() {
    // initialize variables
    // wins and losses to 0 on page load
    var wins=0;
    var losses=0;
       
    // initialize champions
    var harry = {
        name:"Harry Potter",
        health: 200,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="harry-img" src="assets/images/harry-potter.png" alt="Harry Potter" style="width:100%;">'
    }

    var cedric = {
        name:"Cedric Diggory",
        health: 200,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="cedric-img" src="assets/images/cedric-diggory.png" alt="Cedric Diggory" style="width:100%;">'
    }

    var fleur = {
        name:"Fleur Delacour",
        health: 200,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="fleur-img" src="assets/images/fleur-delacour.png" alt="Fleur Delacour" style="width:100%;">'
    }

    var viktor = {
        name:"Viktor Krum",
        health: 200,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="viktor-img" src="assets/images/viktor-krum.png" alt="Viktor Krum" style="width:100%;">'
    }

    // used to store the order of the champions, order will be randomized later
    var champions = [harry, cedric, fleur, viktor];
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

    function removeDuelBtn(){
        $("duel-area").empty();
    }

    function addDuelBtn(){
        $("#duel-area").html('<button type="button" class="btn btn-dark btn-lg p-3 pr-5 pl-5" id="duel-button"><h2>Duel!</h2></button>');
    }

    // displays your current wins and losses
    function updateWinLoss() {
        $("#wins-text").text(wins);
        $("#losses-text").text(losses);
    }

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
    }

    gameReset();

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
            console.log(parseInt($(this).attr("value")));
            adversary.character=charSelect.bank[parseInt($(this).attr("value"))];
            adversary.health = player.character.health;
            adversary.defense = player.character.defense;
            adversary.updateDisplay();
            charSelect.bank.splice(parseInt($(this).attr("value")), 1);
            charSelect.updateDisplay();
            console.log(player);
            playerMessage("May the best wizard win!");
            addDuelBtn();
        }
    });

    $("#reset-button").on("click", function(){
        losses += 1;
        gameReset();
        playerMessage("You have forfeited the duel. Choose a new champion!");        
    });
    
    //     $("#gem-row").empty();
    //     crystalValue = (randInt(101) +19);
    //     updateDisplays();
    //     // create a list of 4 unique random ints between 1 and 12 for the gems
    //     var gemArray = [];
    //     for (var i=0; i<numGems; i++){
    //         var tempInt;
    //         do {
    //             tempInt=1 + randInt(11);
    //         } while (gemArray.indexOf(tempInt) !== -1);
    //         gemArray.push(tempInt);
    //     }
    //     // ensure that there is always a gem with value 1 so the game is solveable
    //     if (gemArray.indexOf(1) === -1) {
    //         gemArray[randInt(3)]=1;
    //     }
    //     // randomize the order of the gem images
    //     gemImages = shuffleArr(gemImages);
    //     for (var i=0; i<gemArray.length; i++) {
    //         var tempGem=$("<div>");
    //         tempGem.attr("class", "col-3 gem");
    //         tempGem.attr("id","gem"+i);
    //         tempGem.attr("value", gemArray[i]);
    //         tempGem.html('<img class="gem-image" id="gem'+gemImages[i]+'-img" src="assets/images/gem'+gemImages[i]+'.png" alt="gem'+gemImages[i]+'" style="width:100%;">');
    //         $("#gem-row").append(tempGem);
    //     }
    // }

    // // update displays of values
    // function updateDisplays() {
    //     $("#wins-text").text(wins);
    //     $("#losses-text").text(losses);
    //     $("#crystal-core-text").text(crystalValue);
    // }

    // // reset the game upon page load
    // gameReset();

    // // listen to click on gems
    // $("#gem-row").on("click", ".gem", function(){
    //     $("#player-message").empty()
    //     // subtract value of clicked gem from crystal
    //     crystalValue -= parseInt($(this).attr("value"));
    //     // if crystal is 0, win
    //     if (crystalValue === 0) {
    //         wins+=1;
    //         gameReset();
    //         $("#player-message").text("You won! Congratulations!");
    //     // if crystal is less than 0, lose
    //     } else if (crystalValue <= 0) {
    //         losses+=1;
    //         gameReset();
    //         $("#player-message").text("You lost! You drained too much energy from the crystal!");
    //         // else, update crystal value
    //     } else {
    //         updateDisplays();
    //     }
    // });
    // // if reset button clicked, reset values to default and generate a new puzzle (counts as a loss)
    // $("#reset-button").on("click", function(){
    //     losses += 1;
    //     gameReset();
    //     $("#player-message").text("You gave up on the puzzle. Good luck on this one!");        
    // });
});