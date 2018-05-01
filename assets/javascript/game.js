$(document).ready(function() {
    // initialize variables
    // wins and losses to 0 on page load
    var wins=0;
    var losses=0;
       
    // initialize champions
    var harry = {
        name:"Harry Potter",
        maxHealth: 200,
        health: 200,
        basePower: 5,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="harry-img" src="assets/images/harry-potter.png" alt="Harry Potter" style="width:100%;">'
    }

    var cedric = {
        name:"Cedric Diggory",
        maxHealth: 200,
        health: 200,
        basePower: 5,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="cedric-img" src="assets/images/cedric-diggory.png" alt="Cedric Diggory" style="width:100%;">'
    }

    var fleur = {
        name:"Fleur Delacour",
        maxHealth: 200,
        health: 200,
        basePower: 5,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="fleur-img" src="assets/images/fleur-delacour.png" alt="Fleur Delacour" style="width:100%;">'
    }

    var viktor = {
        name:"Viktor Krum",
        maxHealth: 200,
        health: 200,
        basePower: 5,
        power: 5,
        defense: 10,
        image: '<img class="char-image" id="viktor-img" src="assets/images/viktor-krum.png" alt="Viktor Krum" style="width:100%;">'
    }

    // used to store the order of the champions, order will be randomized later
    var champions = [harry, cedric, fleur, viktor];
    console.log(champions)

    var player={
        character: false,
        resetDisplay: function(){
            $("#player-character").empty();
        },
        updateDisplay: function(){
            $("#player-character").html(this.character.image+'<p class="centered-top m-0">'+this.character.name+'</p>'+'<h3 class="centered-bottom">'+this.character.health+'</h3>');
        }
    };
    player.character=fleur;
    player.updateDisplay();

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
    // game reset function
    // clear player character and adversaries
    // generate choices for player character

    // function gameReset() {



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