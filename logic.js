"use strict";

const PLAYER_X = 'X';
const PLAYER_O = 'O';
let turn;
const cells = Array.from(document.querySelectorAll('.board .cell'));
const turnMessage = document.getElementById('turnMessage');
const winningMessage = document.getElementById('winning');
const restartBtn = document.getElementById('restartButton');

const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.addEventListener('click', handleCellClick, {once: true});
        cell.addEventListener('mouseover', handleCellHover);
        cell.addEventListener('mouseout', handleCellHoverOut);
    });
    winningMessage.innerHTML = '';
    turn = PLAYER_X;
    turnMessage.innerHTML = `It's ${turn} Turn`;
}

function checkWinner() {
    let hasWon = false;
    WINNING_COMBINATION.forEach(comb => {
        if ((cells[comb[0]].innerHTML == turn) && (cells[comb[1]].innerHTML == turn)
            && (cells[comb[2]].innerHTML == turn)) {
                console.log('inside checkWinner');
                hasWon = true;
        }
    })
    return hasWon;
}

function isBoardFull() {
    let boardFull = true;
    cells.forEach(cell => {
        if ((cell.innerHTML != 'X') && (cell.innerHTML != 'O')) {
            boardFull = false;
        }
    })
    return boardFull;
}

function handleCellHover(e) {
    let cell = e.target;
    if (cell.innerHTML == '') {
        cell.innerHTML = turn;
        cell.style.color = 'silver';
    }
}

function handleCellHoverOut(e) {
    let cell = e.target;
    if (cell.style.color == 'silver') {
        cell.innerHTML = '';
    }
}

function handleCellClick(e) {
    e.target.style.color = '';
    e.target.innerHTML = turn;
    if (checkWinner()) {
        console.log('we have a winner!');
        winningMessage.innerHTML = `${turn} Has Won`;
    } else if (isBoardFull()) {
        winningMessage.innerHTML = `It's a Draw`;
    } else {
        turn = (turn == PLAYER_X) ? PLAYER_O : PLAYER_X;
        turnMessage.innerHTML = `It's ${turn} Turn`;
        return;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
        cell.removeEventListener('mouseover', handleCellHover);
        cell.removeEventListener('mouseout', handleCellHoverOut);
    })
}