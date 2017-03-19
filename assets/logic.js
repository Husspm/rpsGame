$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCij_KNqfzDbG8QD18GYpsqS_xe67bYZKE",
        authDomain: "rpsgame-62b5a.firebaseapp.com",
        databaseURL: "https://rpsgame-62b5a.firebaseio.com",
        storageBucket: "rpsgame-62b5a.appspot.com",
        messagingSenderId: "921085392130"
    };
    firebase.initializeApp(config);
    var data = firebase.database();
    var p1Choice;
    var p2Choice;
    var p1Select = true;
    var p2Select = true;
    //gathers player one choice
    $(".p1").on("click", function() {
        if (p1Select === true) {
            p1Choice = $(this).attr("data-value");
            p1Select = false;
            $("#display").html($(".userp1").text() + " has selected ");
            checkLocked();
        } //ends if which locks selection
    }); //ends player one pick function
    //player two choice
    $(".p2").on("click", function() {
        if (p2Select === true) {
            p2Choice = $(this).attr("data-value");
            p2Select = false;
            $("#display").html($(".userp2").text() + " has selected ");
            checkLocked();
        } //ends locking if
    }); //ends player two pick function

    //either button can call the function so the if waits till both are false
    function checkLocked() {
        if (p1Select === false && p2Select === false) {
            compareChoices(p1Choice, p2Choice);
            $("#display").html("And the winner is...");
        } else {
            $("#print").empty();
        }
    }
    //This compares the values as numbers to try and simplify the comparing process
    // eg 1 beats 0 2 beats 1 , but 0 beats 2 that was the tricky part so I went with the 1st 2 ifs(ln 53 & 55)
    function compareChoices(p1, p2) {
        //p1 and p2 parameters correspond to displayItems indexes to show them on the screen
        var displayItems = ["rock", "paper", "scissors"];
        var p1txt = $(".userp1").text() + " with a pick of " + displayItems[p1];
        var p2txt = $(".userp2").text() + " with a pick of " + displayItems[p2];
        //z below is just shorthand for text to be used for display
        if (p1 == 0 && p2 == 2) {
            z = p1txt;
        } else if (p2 == 0 && p1 == 2) {
            z = p2txt;
        } else if (p1 > p2) {
            z = p1txt;
        } else if (p1 === p2) {
            z = p1txt + " & " + p2txt + " tied";

        } else { //if none of above conditions are met the only option left is p2>p1 && p1 !==0 therefore p2 wins
            z = p2txt;
        } //unlocked choices
        p2Select = true;
        p1Select = true;
        $("#print").html(z + "<br><br>" + "Make your choice to play again");

    } //!ends compareChoices function

    //this(ha) function controls the name selection for each player and also displays a reset button so you can update
    //the user if needed. Using the var called selector as an on/off switch to control the reset and submit buttons
    //and also to divert text to the appropriate areas. 
    $("button").on("click", nameCreator);
    nameCreator();

    function nameCreator() {
        event.preventDefault();
        var selector = this.value;
        var txt = $("#" + selector + "input").val().trim();
        if (txt !== "") {
            /*data.ref().push({
                name: txt
            });*/
            $("#display").empty().html(txt + " is now ready ");
            $(".user" + selector).text(txt);
            //this line looks weird, but it shortens up the code. Targeting .p1, .p1form, and #p1change in one line (or p2)
            //.p1 is the images .p1form is the input form(duh) #p1change is the change player button
            $("." + selector + "," + "." + selector + "form" + "," + "#" + selector + "change").toggleClass("hide");

        } //ends if statement to make sure the user input something

        //my firebase portions are not working correctly :-( 
        /* data.ref().on("child_added", function(children) {
             data.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(children) {
                 txt = children.val().name;
                 console.log(txt);
             });
         });*/

    } //ends nameCreator function

}); //ends document ready function