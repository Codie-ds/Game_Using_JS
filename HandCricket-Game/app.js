// let chooseToss_section = document.querySelector('.tossChoices');
let chooseCoin = document.querySelectorAll('.choice')
let usrStatus = document.querySelector('#status');
let startGamePlay = document.querySelector('#startGamePlay');
let tossWinner;
let usrIsBatting;
// choose num as a run
let chooseNum = document.querySelectorAll('#run');
let scoreCard_Usr = document.getElementById('usrTotalScore');
let scoreCard_Comp = document.querySelector('#compTotalScore');
let computerRandomChoice = document.querySelector('#computerChoice');
let usrChoice = document.querySelector('#userChoice');
let inningCount = 0;

let finalScore_Card_Usr = 0;
let finalScore_Card_Comp = 0;

// reset Game
let reset_Game = document.querySelector('.reset-Game');

function getTossByComp(){
    let tossArr = ['Heads','Tails'];
    let tossIndex = Math.floor(Math.random()*2);

    return tossArr[tossIndex];
}

const getToss = (usrSelected)=>{
    const usrTossChoice = usrSelected;
    const winner = getTossByComp();

    if(winner != usrTossChoice){
        usrStatus.innerText = "Batting";
        usrIsBatting = true;
    }
    else{
        usrStatus.innerText = "Bowling";
        usrIsBatting = false;
    }

    let showTossWinner = document.querySelector('.head2');
    showTossWinner.style.visibility = "visible";
    showTossWinner.innerText = `The ${winner} Has Won The Toss and Elected To Bowl First`;
    let tossSection = document.querySelector('.tossChoices').style.visibility = "hidden"; 
    startGamePlay.style.visibility = "visible";
}

// choose Toss
chooseCoin.forEach((choice) =>{
    choice.addEventListener('click', ()=>{
        let usrTossChoice = choice.getAttribute('id');
        getToss(usrTossChoice);
    });
});

startGamePlay.addEventListener('click', ()=>{
    document.querySelector('.head2').style.visibility = "hidden";
    startGamePlay.style.visibility = "hidden";
    
    let GamePlaySection = document.querySelector('.GamePlay').style.visibility = "visible";
    document.querySelector('#inning-completed').style.visibility = "hidden";
    console.log("UsrIsBatting:", usrIsBatting);
    checkInningCount();
});

function checkInningCount(){
    console.log("inningCount:",inningCount);
    if(inningCount == 1){
        reset_GameScore_val();
        // let element = document.querySelector('.GamePlay').classList.add('runs');
    }
}

function addRunsInComp(compRun, _GameScore){
    let score = compRun;
    computerRandomChoice.innerText = score;
    _GameScore.currScore = score;
    _GameScore.currScore += _GameScore.prevScore;
    _GameScore.prevScore = _GameScore.currScore;
    scoreCard_Comp.innerText = _GameScore.currScore;
    finalScore_Card_Comp = _GameScore.currScore;
}

function addRunsInUsr(myRun, _GameScore){
    let score = myRun;
    _GameScore.currScore = Number(score);
    _GameScore.currScore += _GameScore.prevScore;
    _GameScore.prevScore = _GameScore.currScore;
    scoreCard_Usr.innerText = _GameScore.currScore;
    finalScore_Card_Usr = _GameScore.currScore;

    return Number(score);
}

function addRandomRuns_Comp(){
    let arrRand = [1,2,3,4,5,6];
    let randIdx = Math.floor((Math.random()*6));
    computerRandomChoice.innerText = arrRand[randIdx];

    return arrRand[randIdx];
}

const displayWinner = (totalScore_Usr, totalScore_Comp)=>{
    let newElement = document.createElement('span');
    newElement.id = "Match-Winner";
    if(totalScore_Usr > totalScore_Comp){
        newElement.innerText = "User Win the Game"; 
    }
    else{
        newElement.innerText = "Computer Win the Game";
    }
    document.querySelector('.first-Inning-completed').appendChild(newElement);
    document.querySelector('.first-Inning-completed').style.visibility = "visible";
    document.querySelector('.GamePlay').style.visibility = "hidden";
    reset_Game.classList.remove('hide');
}

function startsSecondInning(){
    startGamePlay.style.visibility = "visible";
    // document.querySelector('.GamePlay').classList.remove('runs');
}

function checkRunsFlow(usrRun, compRun){
    if((finalScore_Card_Usr > finalScore_Card_Comp) && inningCount === 1 && usrIsBatting == true){
        console.log("final score by user:",finalScore_Card_Usr);
        displayWinner(finalScore_Card_Usr, finalScore_Card_Comp);
    }
    else if((finalScore_Card_Comp > finalScore_Card_Usr) && inningCount === 1 && usrIsBatting == false){
        console.log("final score by comp:",finalScore_Card_Comp);
        displayWinner(finalScore_Card_Usr, finalScore_Card_Comp);
    }
    else if(usrRun == compRun && usrIsBatting === true){
        document.querySelector('#inning-completed').style.visibility = "visible";
        startGamePlay.style.visibility = "hidden";
        document.querySelector('.GamePlay').style.visibility = "hidden";
        inningCount++;
        if(inningCount == 2){
            displayWinner(scoreCard_Usr, scoreCard_Comp);
            return;
        }
        else{
            let newElement = document.createElement('span');
            newElement.id = "secondInning_desc";
            newElement.innerText = `Computer needs ${finalScore_Card_Usr} to Win`;
            document.querySelector('.yourPosition').appendChild(newElement);
            usrIsBatting = false;
            usrStatus.innerText = "Bowling";
            startsSecondInning();
        }
    }
    else if(compRun == usrRun && usrIsBatting === false){
        document.querySelector('#inning-completed').style.visibility = "visible";
        startGamePlay.style.visibility = "hidden";
        document.querySelector('.GamePlay').style.visibility = "hidden";
        inningCount++;
        if(inningCount == 2){
            displayWinner(scoreCard_Usr, scoreCard_Comp);
            return;
        }
        else{
            let newElement = document.createElement('span');
            newElement.id = "secondInning_desc";
            newElement.innerText = `User needs ${finalScore_Card_Comp} to Win`;
            document.querySelector('.yourPosition').appendChild(newElement);
            usrIsBatting = true;
            usrStatus.innerText = "Batting";
            startsSecondInning();
        }
    }
    else{
        return;
    }
}

let _GameScore = {
    prevScore : Number(0),
    currScore : Number(0),
};

function reset_GameScore_val(){
    _GameScore.prevScore = 0;
    _GameScore.currScore = 0;
}

chooseNum.forEach((run) =>{
    run.addEventListener('click', ()=>{
        let usrRun;
        let compRandom;
        let score = run.innerText;
        usrChoice.innerText = score;
        if(usrIsBatting === true){
            usrRun = addRunsInUsr(score, _GameScore);
            compRandom = addRandomRuns_Comp();
            checkRunsFlow(usrRun, compRandom);
            console.log("User Side:");
            console.log("User:", usrRun);
            console.log("Comp:",compRandom);
        }
        else{
            let arrRand = [1,2,3,4,5,6];
            let randIdx = Math.floor((Math.random()*6));
            let compRun = arrRand[randIdx];
            addRunsInComp(compRun, _GameScore);
            checkRunsFlow(Number(run.innerText), compRun);
            console.log("Computer Side:");
            console.log("User:", score);
            console.log("Comp:",compRun);
        }
    });
});

const GameReset = ()=>{
    let matchWinner = document.getElementById('Match-Winner');
    document.querySelector('.first-Inning-completed').removeChild(matchWinner);
    document.querySelector('#inning-completed').style.visibility = "hidden";
    
    scoreCard_Usr.innerText = "0";
    scoreCard_Comp.innerText = "0";
    usrChoice.innerText = "0";
    computerRandomChoice.innerText = "0";
    finalScore_Card_Usr = 0;
    finalScore_Card_Comp = 0;
    inningCount = 0;
    usrIsBatting = false;

    _GameScore.prevScore = 0;
    _GameScore.currScore = 0;

    let secongInning_desc_remove = document.getElementById("secondInning_desc");
    document.querySelector('.yourPosition').removeChild(secongInning_desc_remove);

    document.querySelector('.head2').innerText = "Let's Play";
    document.querySelector('.head2').style.visibility = "visible";
    document.querySelector('.tossChoices').style.visibility = "visible";
}

reset_Game.addEventListener('click', ()=>{
    reset_Game.classList.add('hide');
    GameReset();
});