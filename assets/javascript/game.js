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
    m_nNumOfGuessesRem = 10;
    m_szUserWordAttempt = new String("");

    // handles to the web page
    m_hNumWins;
    m_hNumGuessesRem;
    m_hLetAlrdyGuessed;
    m_hWordToGuess;

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
        this.m_hLetAlrdyGuessed = document.getElementById("numWinletAlrdyG");
        this.m_hWordToGuess = document.getElementById("wordToGuess");

        this.reset();

       
        // debug
        // this.m_szlettersAlrdyGuessed.push("f");
  
    }

  
     userInput() {

        // variable used to index 
        var i = 0;

        // create a handle to the game
        var hGame = this;


        // listen for user input
        document.onkeyup = function (event) {

             //  check if user has already guessed the letter
            for (i = 0; i < hGame.m_szlettersAlrdyGuessed.length; ++i) {

                if (event.key === hGame.m_szlettersAlrdyGuessed[i]) {
                    alert("You have already guessed: \'" + event.key + '\'')
                    return;
                }

            }

            // set the letter guessed 
            var szUserLetGuess = event.key;

            // store the new letter in the list of letters guessed
            hGame.m_szlettersAlrdyGuessed.push(szUserLetGuess);

            // decrease the number of guesses
            --hGame.m_nNumOfGuessesRem;

            // if the number of guesses remaining is equal to zero than the player has lost
            if (hGame.m_nNumOfGuessesRem === 0) {

                // display to the user that they have lost
                alert("The user has lost");
                // reset the game
                reset();
            }


            // check if input matches a letter from the randomly selected word
            for (i = 0; i < hGame.m_szUserWordAttempt.length; ++i) {
                
              
                // store the new found letter in the already guessed string
                if (szUserLetGuess === hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szWord[i]) {

                    var str1 = "";
                 
                    for (var x = 0; x < i; ++x){
                        str1 += hGame.m_szUserWordAttempt[x];
                    }
                    str1 += szUserLetGuess;

                    for (var x = i + 1; x < hGame.m_szUserWordAttempt.length; ++x){
                        str1 += hGame.m_szUserWordAttempt[x];
                    }
                    hGame.m_szUserWordAttempt = str1;
                    hGame.m_hWordToGuess.textContent = hGame.m_szUserWordAttempt;


                }
            }

            for (i = 0; i < hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szWord.length; ++i) {

                if (hGame.m_szUserWordAttempt[i] !== hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess].m_szWord[i]) {
                    // if the letter doesnt match then leave the function
                    
                    return;

                }
            }

            // if the word is complete display to the user that they have won the game
            hGame.userWin();


        }
    }
    // display to the screen that the user has won
    userWin() {
        alert("You have won!");
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

        hGame.m_szUserWordAttempt = "";

        
       
        hGame.numOfGuessesRem = 10;

         // pick word for computer to guess
        hGame.m_nIndexWordToGuess = 0;
            // Math.floor(Math.random() * 9);

           // temp: this can be done better
        var temp = hGame.m_WordsToGuess[hGame.m_nIndexWordToGuess];
        var WordLength = temp.m_szWord.length;

           for (i = 0; i < WordLength; ++i) {
            hGame.m_szUserWordAttempt += i.toString();
   
           }
        
            // display to the page the
            hGame.m_hWordToGuess.textContent = hGame.m_szUserWordAttempt;

        
    }

    // add words to list
    populateWordList() {

        this.m_WordsToGuess.push(new WordToGuess("pizza", "Hint: The ninja turtles liked to eat it"));
        this.m_WordsToGuess.push(new WordToGuess("space", "Hint: The final frontier"));
        this.m_WordsToGuess.push(new WordToGuess("code", "Hint: What we are learning to do"));
        this.m_WordsToGuess.push(new WordToGuess("javascript", "Hint: what powers this game"));
        this.m_WordsToGuess.push(new WordToGuess("house", "Hint: You live in a ..."));
        this.m_WordsToGuess.push(new WordToGuess("frog", "Hint: Small ambiphibous creature"));
        this.m_WordsToGuess.push(new WordToGuess("dinosaurs", "Hint: went extinct 65 million years ago"));
        this.m_WordsToGuess.push(new WordToGuess("game", "Hint: What are you playing?"));
        this.m_WordsToGuess.push(new WordToGuess("snow", "Hint: When rain freezes it becomes"));
        this.m_WordsToGuess.push(new WordToGuess("rocket", "Hint: Moves very fast"));
    }

    // write out to the dubugger
    debugLogger(str) {
        console.log(str);
    }
}



/************************************************************************************
 *      This is main logic of the game
 * 
 ************************************************************************************/
var game = new Game();
// game.populateWordList();
game.InitGame();
game.userInput();
game.debugLogger("test");

