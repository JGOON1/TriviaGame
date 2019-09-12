$(document).ready(function(){
    // creating an array for the questions
    var questions = [[
        "What pokemon is the evolved form of Pikachu",
        "A) Jolteon",
        "B) Electrobuzz",
        "C) Raichu",
        "D) Meowth",
        "C) Raichu",
        "<img src='assets/images/Raichu.png'>", "Raichu is the evolved form."
    ],
    [
        "What is the best type of pokeball",
        "A) Ultra Ball",
        "B) Master Ball",
        "C) Great Ball",
        "D) Legendary Ball",
        "B) Master Ball",
        "<img src='assets/images/Master.jpg'>", "Master Ball is the best type."
    ], [
        "Who is the main character in the original Pokemon television series?",
        "A) Brook",
        "B) Misty",
        "C) Gary",
        "D) Ash",
        "D) Ash",
        "<img src='assets/images/ash.jpeg'>", "Ash is the main character!"
    ], [
        "How many Gym Badges do you need before challenging the elite four",
        "A) 6", "B) 7", "C) 8", "D) 9", "C) 8", "<img src='assets/images/badges.png'>", "8 Gym Badges"
    ], [
        "Where do you go to revive all your pokemon to full health?",
        "A) Poke Mart",
        "B) Poke spot",
        "C) Pokement Hostpital",
        "D) Pokemon Center",
        "D) Pokemon Center",
        "<img src='assets/images/Center.jpg'>", "Pokemon Center."
    ], [
        "What are the three types from the starter Pokemon",
        "A) Fire, Water, Grass",
        "B) Rock, Flying, Normal",
        "C) Electric, Fighting, Psychic",
        "D) Normal, Fighting, Water",
        "A) Fire, Water, Grass",
        "<img src='assets/images/starter.jpg'>", "Fire, Water, Grass are the starting types"
    ], [
        "Which Pokemon was known for its punching?",
        "A) Hitmonchan",
        "B) Hitmonlee",
        "C) Snorlax",
        "D) Machamp",
        "A) Hitmonchan",
        "<img src='assets/images/hitmonchan.jpg'>", "Hitmonchan"
    ], [
        "What is the name of Ash's Rival",
        "A) Giovanni",
        "B) Gary",
        "C) Team Rocket",
        "D) Brock",
        "B) Gary",
        "<img src='assets/images/Gary.png'>", "Gary!"
    ], [
        "What generation was Lugia introduced?",
        "A) First Generation",
        "B) Third Generation",
        "C) Fourth Generation",
        "D) Second Generation",
        "D) Second Generation",
        "<img src='assets/images/Lugia.png'>", "Second Generation."
    ],
    [
        "What pokemon do team rocket always travel with?",
        "A) Muk",
        "B) Butterfree",
        "C) Pikachu",
        "D) Meowth",
        "D) Meowth",
        "<img src='assets/images/meowth.png'>", "Meowth."
    ]
    ]

    var nextQuestion = 0;//counter for the purpose of the next question
    var answerVar = questions[nextQuestion][5], answerText = questions[nextQuestion][7];
    var intervalId;
    var number = 30; // the start of each timer
    var imagesHere = questions[nextQuestion][6];
    var incorrect = 0, correct = 0, restarting = true;

        //hiding the "time remaining" portion in the html
        $(".RT").hide();
        $("button").on("click", function () {
            // if the restarting is false, it will go into the restart function and zero everything. This was necessary because without this, every time I restarted the game, it counted down starting at zero and into the negatives.
            if (restarting === false) {
                restarting = true;
                restart();
            }
            $(".RT").show();
            start();
            $("#choices, #question").show();
    
        })
        // start function that will start the countdown and then goes to the 'next' function
        function start() {
            $("button").hide()
            intervalId = setInterval(decrement, 1000);
            next();
        }
        //This function shows the question from the array.  The question goes in order
        function next() {
    
            $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
            $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
            $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
            $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
            $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
        }
    
        // click function which adds the correct and incorrect answers
        $("#a, #b, #c, #d").click(function () {
    
            var a = $(this).text();
            if (a === answerVar) {
                correct++;
                number = 30;
                stop();
                right();
            } else {
                incorrect++;
                stop();
                sorry();
            }
    
        })
        // every time I get a question correct, it will take me to this function which says you've got the question right and some pictures.  This will also have a setTimeout function which will wait about 3 seconds and then move on to the next question.
        function right() {
            if (nextQuestion == questions.length - 1) {
                imagesHere = questions[nextQuestion][6]; 
                answerText = questions[nextQuestion][7];
                $("#choices").hide();
                $("#question").html("<h1> Correct! <br>" + answerText + "</h1>");
                $("#images").show().html(imagesHere);
    
                setTimeout(function () {
                    $("#question, #choices, #images").hide();
                    gameOver();
                }, 3000);
            }
            imagesHere = questions[nextQuestion][6];
            answerText = questions[nextQuestion][7];
            $("#choices").hide();
            $("#question").html("<h1> Nice!" + answerText + "</h1>");
            $("#images").show().html(imagesHere);
    
            nextQuestion++;// adding 1 so that we can move on to the next question in the array at the top
            answerVar = questions[nextQuestion][5];
            setTimeout(function () {
                start();// this will start the counter again
                $("#images").hide();
                $("#choices").show();
                $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
                $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
                $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
                $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
                $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
            }, 3000);
        }
    
        
        function sorry() {
            //this will show if you got the last question wrong and then go over to the gameOver function
            if (nextQuestion == questions.length - 1) {
                imagesHere = questions[nextQuestion][6];
                answerText = questions[nextQuestion][7];
                $("#choices").hide();
                $("#question").html("<h1> Sorry!<br>" + answerText + "</h1>");
                $("#images").show().html(imagesHere);
    
                setTimeout(function () {
                    $("#question, #choices, #images").hide();
                    gameOver();
                }, 3000);
            }
    
            imagesHere = questions[nextQuestion][6];
            answerText = questions[nextQuestion][7];
            $("#choices").hide();
            $("#question").html("<h1> Sorry, The right answer is <br>" + answerText + "</h1>");
            $("#images").show().html(imagesHere);
    
            nextQuestion++;
            answerVar = questions[nextQuestion][5];
    
            setTimeout(function () {
                start();
                $("#images").hide();
                $("#choices").show();
                $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
                $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
                $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
                $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
                $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
            }, 3000);
    
        }
        //function to count down from the remaining time
        function decrement() {
            number--;
            $("#timer").text(number);
            if (number === 0) {
                stop();
                $("#question, #choices").hide();
                $("#timer").html("<h2>Times Run Out! Start Over!</h2>");
                restarting = false;
                $("#start").show();
            }
        }
        //function to stop the setInterval's timing
        function stop() {
            clearInterval(intervalId);
        }
        // game over function that will tell you your scores and another button that will restart the game
        function gameOver() {
            $("#question, #choices").show();
            $("#start").show();
    
            restarting = false;
            $("#question").html("<h1> This is how you did. You got</h1>");
            $("#final").show().html("<h2> Correct Answers: " + correct + "</h2>").append("<h2> Incorrect Answers: " + incorrect + "</h2>");
            $("#choices").hide();
            $("#start").html("<h1> Start Over? </h1>");
        }
        // zero-ing on all the variables so that we can start the game over BUT not resetting.
        function restart() {
            $("#final").hide();
            nextQuestion = 0, correct = 0, incorrect = 0, number = 30;
            answerVar = questions[nextQuestion][5];
    
            $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
            $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
            $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
            $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
            $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
        }















})