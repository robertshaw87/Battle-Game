$(document).ready(function() {
    // initialize variables
    var wins=0;
    var losses=0;
    var crystalValue=0;
    // number of gems to generate
    var numGems=4;
    // used to store the order of the gem images, order will be randomized later
    var gemImages = ["0","1", "2", "3"];

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
    //  reset values to default
        // generate random value for the crystal
        // generate 4 new gems with one guaranteed to have a value of 1
    function gameReset() {
        $("#gem-row").empty();
        crystalValue = (randInt(101) +19);
        updateDisplays();
        // create a list of 4 unique random ints between 1 and 12 for the gems
        var gemArray = [];
        for (var i=0; i<numGems; i++){
            var tempInt;
            do {
                tempInt=1 + randInt(11);
            } while (gemArray.indexOf(tempInt) !== -1);
            gemArray.push(tempInt);
        }
        // ensure that there is always a gem with value 1 so the game is solveable
        if (gemArray.indexOf(1) === -1) {
            gemArray[randInt(3)]=1;
        }
        // randomize the order of the gem images
        gemImages = shuffleArr(gemImages);
        for (var i=0; i<gemArray.length; i++) {
            var tempGem=$("<div>");
            tempGem.attr("class", "col-3 gem");
            tempGem.attr("id","gem"+i);
            tempGem.attr("value", gemArray[i]);
            tempGem.html('<img class="gem-image" id="gem'+gemImages[i]+'-img" src="assets/images/gem'+gemImages[i]+'.png" alt="gem'+gemImages[i]+'" style="width:100%;">');
            $("#gem-row").append(tempGem);
        }
    }

    // update displays of values
    function updateDisplays() {
        $("#wins-text").text(wins);
        $("#losses-text").text(losses);
        $("#crystal-core-text").text(crystalValue);
    }

    // reset the game upon page load
    gameReset();

    // listen to click on gems
    $("#gem-row").on("click", ".gem", function(){
        $("#player-message").empty()
        // subtract value of clicked gem from crystal
        crystalValue -= parseInt($(this).attr("value"));
        // if crystal is 0, win
        if (crystalValue === 0) {
            wins+=1;
            gameReset();
            $("#player-message").text("You won! Congratulations!");
        // if crystal is less than 0, lose
        } else if (crystalValue <= 0) {
            losses+=1;
            gameReset();
            $("#player-message").text("You lost! You drained too much energy from the crystal!");
            // else, update crystal value
        } else {
            updateDisplays();
        }
    });
    // if reset button clicked, reset values to default and generate a new puzzle (counts as a loss)
    $("#reset-button").on("click", function(){
        losses += 1;
        gameReset();
        $("#player-message").text("You gave up on the puzzle. Good luck on this one!");        
    });
});