const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');


let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    for(const cell of cellElements) {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.addEventListener('click', handleClick, {once: true});
    }; 

    isCircleTurn = false;

    setBoardHoverClass();

    winningMessage.classList.remove('show-winning-message');
}; 

const endGame = (isDraw) => {
    if(isDraw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = isCircleTurn? 'Círculo venceu!' : 'X venceu!';
    };

    winningMessage.classList.add('show-winning-message');
}; 

let checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => { //some() verifica se pelo menos 1 elemento do array atende a condição (retorna true ou false)
        return combination.every((index) => { //every() verifica se todos os elementos do array atendem a condição (retorna true ou false)
            return cellElements[index].classList.contains(currentPlayer); //verifica se cada célula tem o (x ou circulo)
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => { //cellElements foi criado usando o querySelectorAll, com isso ele é uma lista fixa e não viva, e não é possível utilizar o every nele. o [...cellElements] possibilita isso
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}; 

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}; 

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    };
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}; 

const handleClick = (event) => {
    //colocar a marca (X ou circulo)
    const cell = event.target; //event.target retorna o elemento (div da célula) que recebeu o evento (click)
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    //verificar por vitória e por empate, se não ocorrer nenhum, troca o símbolo
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if(isWin) {
        endGame(false);
    } else if(isDraw) {
        endGame(true);
    } else {
        swapTurns();
    };
};

startGame();

restartButton.addEventListener('click', startGame);