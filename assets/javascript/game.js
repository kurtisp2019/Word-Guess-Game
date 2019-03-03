/************************************************************************************
 *      This is the gmae class
 * 
 ************************************************************************************/
class WordToGuess {

    m_szWord = "";
    m_szHint = "";
    constructor(_word, _hint) {
        this.m_szWord = _word;
        this.m_szHint = _hint;
    }
}

class Game {

    // fields
    m_WordsToGuess = [];
    m_nNumWins = 0;
    m_szlettersAlrdyGuessed = [];
    m_nIndexWordToGuess = 0;
    m_nNumOfGuessesRem = 0;
    m_szUserWordAttempt = new String("");
    m_sfxPositive = new Audio("assets/audio/positive.mp3");
    m_sfxNegative = new Audio("assets/audio/negative.mp3");
    m_sfxLose = new Audio("assets/audio/lost.mp3");
    m_sfxWin = new Audio("assets/audio/win.mp3");
    

    // handles to the web page
    m_hNumWins;
    m_hNumGuessesRem;
    m_hLetAlrdyGuessed;
    m_hWordToGuess;
    m_hGameHint;

    // constructors
    constructor() {

    }

    // methods

    // intialize the game
    InitGame() {

        this.m_nNumWins = 0;

        //variable used as an index for loops
        var i = 0;

        // populate the word list
        this.populateWordList();

        // get references to draw to
        this.m_hNumWins = document.getElementById("numWins");
        this.m_hNumGuessesRem = document.getElementById("numGuessesRem");
        this.m_hLetAlrdyGuessed = document.getElementById("letAlrdyG");
        this.m_hWordToGuess = document.getElementById("wordToGuess");
        this.m_hGameHint = document.getElementById("gameHint");

        this.reset();

    }


    userMissedLet() {

        // create a handle to the game
        var hGame = this;

         // decrease the number of guesses
         --hGame.m_nNumOfGuessesRem;
         hGame.m_hNumGuessesRem.textContent = hGame.m_nNumOfGuessesRem.toString();

         // if the number of guesses remaining is equal to zero than the player has lost
         if (hGame.m_nNumOfGuessesRem === 0) {

             // display to the user that they have lost
             this.m_sfxLose.play();
             hGame.userLose();

             // reset the game
             hGame.reset();
         }
        
        hGame.m_sfxNegative.play();

    }
    userInput() {

        // variable used to index 
        var i = 0;

        // create a handle to the game
        var hGame = this;


        // listen for user input
        document.onkeyup = function (event) {

            if (event.key.charCodeAt(0) === 67)
                return;
            // check to make sure its a letter
            var asciiV = event.key.charCodeAt(0);
            if (asciiV < 97 || asciiV > 122) {
                alert("\"" + event.key + "\" is not a character");
                return;
            }

             //  check if user has already guessed the letter
            for (i = 0; i < hGame.m_szlettersAlrdyGuessed.length; ++i) {

                if (event.key === hGame.m_szlettersAlrdyGuessed[i]) {
                    alert("You have already guessed: \'" + event.key + '\'')
                    hGame.m_sfxNegative.play();
                    return;
                }

            }



            // set the letter guessed 
            var szUserLetGuess = event.key;

            // store the new letter in the list of letters guessed
            hGame.m_szlettersAlrdyGuessed.push(szUserLetGuess);

            var str1 = "";
            // display the letters that have been guessed
            for (i = 0; i < hGame.m_szlettersAlrdyGuessed.length; ++i) {

                str1 += hGame.m_szlettersAlrdyGuessed[i] + ', ';
            }
            hGame.m_hLetAlrdyGuessed.textContent = str1;


            var bFoundLet = false;
            // check if input matches a letter from the randomly selected word
            for (i = 0; i < hGame.m_szUserWordAttempt.length; ++i) {


                // store the new found letter in the already guessed string
                if (szUserLetGuess === hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szWord[i]) {

                    var str1 = "";

                    for (var x = 0; x < i; ++x) {
                        str1 += hGame.m_szUserWordAttempt[x];
                    }
                    str1 += szUserLetGuess;

                    for (var x = i + 1; x < hGame.m_szUserWordAttempt.length; ++x) {
                        str1 += hGame.m_szUserWordAttempt[x];
                    }
                    hGame.m_szUserWordAttempt = str1;
                    hGame.m_hWordToGuess.textContent = hGame.m_szUserWordAttempt;
                    bFoundLet = true;
                    hGame.m_sfxPositive.play();
                }
            }
            if (bFoundLet === false) {
                hGame.userMissedLet();
            }

            for (i = 0; i < hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szWord.length; ++i) {

                if (hGame.m_szUserWordAttempt[i] !== hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szWord[i]) {
                    // if the letter doesnt match then leave the function

                    return;

                }
            }

            // if the word is complete display to the user that they have won the game
            hGame.m_sfxWin.play();
            hGame.userWin();


        }
    }
    // display to the screen that the user has won
    userWin() {
        this.m_nNumWins++;
        this.m_hNumWins.textContent = this.m_nNumWins;
        alert("Congratz you won!!!\n The word was: " + this.m_szUserWordAttempt);
        this.reset();
    }



    // display to the user that they have lost
    userLose() {
        
        alert("You have lost!");
        this.reset();
    }


    // reset the game
    reset() {

        // get handle to the game
        var hGame = this;
        var i = 0;

        // reset the lists
        while (hGame.m_szlettersAlrdyGuessed.length != 0) {
            hGame.m_szlettersAlrdyGuessed.pop();
        }

        hGame.m_hLetAlrdyGuessed.textContent = "";
        hGame.m_szUserWordAttempt = "";

        hGame.m_nNumOfGuessesRem = 10;
        hGame.m_hNumGuessesRem.textContent = hGame.m_nNumOfGuessesRem.toString();

        // pick word for computer to guess
        hGame.m_nIndexWordToGuess = Math.floor(Math.random() * 12);

        // temp: this can be done better
        var temp = hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess];
        var WordLength = temp.m_szWord.length;

        for (i = 0; i < WordLength; ++i) {
            hGame.m_szUserWordAttempt += '_';

        }

        // display to the page the
        hGame.m_hWordToGuess.textContent = hGame.m_szUserWordAttempt;
        hGame.m_hGameHint.textContent = hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szHint;



    }

    // add words to list
    populateWordList() {

        //
        this.m_WordsToGuess.push(new WordToGuess("pizza", "Hint: The ninja turtles like to eat it"));
        this.m_WordsToGuess.push(new WordToGuess("space", "Hint: The final frontier"));
        this.m_WordsToGuess.push(new WordToGuess("code", "Hint: What we are learning to do"));
        this.m_WordsToGuess.push(new WordToGuess("javascript", "Hint: What powers this game"));
        this.m_WordsToGuess.push(new WordToGuess("house", "Hint: People live in a ..."));
        this.m_WordsToGuess.push(new WordToGuess("florida", "Hint: It's a state not a city"));
        this.m_WordsToGuess.push(new WordToGuess("colorado", "Hint: Currently living"));
        this.m_WordsToGuess.push(new WordToGuess("avengers", "Hint: Marvel movie being released this April"));
        this.m_WordsToGuess.push(new WordToGuess("frog", "Hint: Small amphibious creature"));
        this.m_WordsToGuess.push(new WordToGuess("dinosaurs", "Hint: Went extinct 65 million years ago"));
        this.m_WordsToGuess.push(new WordToGuess("game", "Hint: What are you playing?"));
        this.m_WordsToGuess.push(new WordToGuess("snow", "Hint: When rain freezes it becomes"));
        this.m_WordsToGuess.push(new WordToGuess("rocket", "Hint: It moves very fast"));
      
    }

}



/************************************************************************************
 *      This is main logic of the game
 * 
 ************************************************************************************/

prompt();
var game = new Game();
// game.populateWordList();
game.InitGame();
game.userInput();

