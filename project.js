//login function
function logIn() {
    //Getting username and password
    let user_Name = document.getElementById("in1").value;
    let password = document.getElementById("in2").value;
    //Getting the tags to show or hide
    let userNamePreperaton = document.getElementById("userNamePreperaton");
    let openingbody = document.getElementById("openingbody");
    let preperationbody = document.getElementById("preperationbody");
    //check conditions
    if (user_Name != 'abcd') {
        document.getElementById("inp1Answer").innerHTML = 'Incorrect User Name';
    }
    if (user_Name == 'abcd' || user_Name == '') {
        document.getElementById("inp1Answer").innerHTML = '';
    }
    if (password != '1234') {
        document.getElementById("inp2Answer").innerHTML = 'Incorrect Password';
    }
    if (password == '1234' || password == '') {
        document.getElementById("inp2Answer").innerHTML = '';
    }
    if (user_Name == 'abcd' && password == '1234') {
        userNamePreperaton.innerHTML += "|"+user_Name+"|";
        openingbody.style.display = 'none';
        preperationbody.style.display = 'flex';
    }
}
//The prepared sudoku boards
let mat1 = [[2, 1, 8, 7, 5, 9, 4, 6, 3],
[5, 9, 3, 4, 6, 8, 7, 2, 1],
[4, 6, 7, 2, 1, 3, 9, 8, 5],
[9, 7, 4, 8, 3, 5, 6, 1, 2],
[6, 3, 2, 1, 9, 4, 8, 5, 7],
[1, 8, 5, 6, 2, 7, 3, 9, 4],
[3, 2, 1, 9, 4, 6, 5, 7, 8],
[7, 4, 9, 5, 8, 2, 1, 3, 6],
[8, 5, 6, 3, 7, 1, 2, 4, 9]];

let mat2 = [[9, 7, 8, 1, 3, 5, 4, 2, 6],
[6, 4, 1, 8, 9, 2, 7, 5, 3],
[2, 5, 3, 7, 6, 4, 9, 1, 8],
[8, 2, 4, 9, 7, 1, 3, 6, 5],
[7, 6, 9, 5, 8, 3, 2, 4, 1],
[1, 3, 5, 4, 2, 6, 8, 9, 7],
[4, 1, 7, 2, 5, 8, 6, 3, 9],
[3, 9, 2, 6, 1, 7, 5, 8, 4],
[5, 8, 6, 3, 4, 9, 1, 7, 2]];

let mat3 = [[2, 9, 8, 6, 7, 4, 5, 3, 1],
[5, 6, 1, 3, 9, 2, 8, 4, 7],
[4, 7, 3, 5, 1, 8, 6, 9, 2],
[6, 2, 4, 9, 8, 5, 1, 7, 3],
[1, 5, 7, 4, 6, 3, 9, 2, 8],
[8, 3, 9, 7, 2, 1, 4, 6, 5],
[9, 1, 5, 2, 3, 6, 7, 8, 4],
[7, 4, 2, 8, 5, 9, 3, 1, 6],
[3, 8, 6, 1, 4, 7, 2, 5, 9]];

let mat4 = [[2, 1, 8, 3, 4, 6, 7, 9, 5],
[5, 9, 6, 1, 7, 2, 8, 4, 3],
[7, 4, 3, 9, 8, 5, 1, 2, 6],
[1, 6, 9, 4, 3, 7, 2, 5, 8],
[4, 2, 7, 8, 5, 1, 3, 6, 9],
[8, 3, 5, 6, 2, 9, 4, 1, 7],
[9, 8, 1, 2, 6, 3, 5, 7, 4],
[3, 5, 2, 7, 9, 4, 6, 8, 1],
[6, 7, 4, 5, 1, 8, 9, 3, 2]];

//Function that generates a random sudoku board for a variable
function randomMat() {
    let arrNum = Math.floor(Math.random() * (5 - 1) + 1);
    if (arrNum == 1) {
        return mat1;
    }
    if (arrNum == 2) {
        return mat2;
    }
    if (arrNum == 3) {
        return mat3;
    }
    if (arrNum == 4) {
        return mat4;
    }
}

//A variable that receives a random board
var mat = randomMat();

//A variable that receives a copy of the board for later manipulation and use of the "play again" button
let saveMat = [...mat];

//Functions for the buttons - start the game by difficulty level, and hide the previous tags
function theGame25easy() {
    let theGameBody = document.getElementById("theGameBody");
    preperationbody.style.display = 'none';
    theGameBody.style.display = 'flex';
    gameStart(1);
}
function theGame50normal() {
    let theGameBody = document.getElementById("theGameBody");
    preperationbody.style.display = 'none';
    theGameBody.style.display = 'flex';
    gameStart(2);
}
function theGame75hard() {
    let theGameBody = document.getElementById("theGameBody");
    preperationbody.style.display = 'none';
    theGameBody.style.display = 'flex';
    gameStart(3);
}
//function that displays the game board
function gameStart(levelNum) {
    let theGame = document.getElementById('theGame');
    let table = document.createElement('table');
    for (let i = 0; i < mat.length; i++) {
        let tr = document.createElement('tr');
        if (i == 2 || i == 5) {
            tr.style.borderBottom = '5px black solid';
        }
        for (let j = 0; j < mat[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = mat[i][j];
            td.id = `${i}${j}`;
            if (j == 2 || j == 5) {
                td.style.borderRight = '5px black solid';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    theGame.appendChild(table);
    //deduction according to the difficulty level button
    let omission;
    if (levelNum == 1) {
        omission = 20;
    }
    else if (levelNum == 2) {
        omission = 40;
    }
    else if (levelNum == 3) {
        omission = 60;
    }
    while (omission > 0) {
        let i = Math.floor(Math.random() * 9);
        let j = Math.floor(Math.random() * 9);
        let td = document.getElementById(`${i}${j}`);
        if (td.innerHTML != '') {
            td.innerHTML = '';
            //updating the copied board in order to use the "play again" button
            saveMat[i][j] = '';

            let input = document.createElement('input');
            input.id = `${i}${j}1`;///note - receiving new input id
            input.type = "number";
            input.min = "1";
            input.max = "9";
            td.appendChild(input);

            omission--;
        }
    }
}
//function for "play again" button
function again() {
    //Hiding the answer tags
    document.getElementById('answerTrue').style.display = 'none';
    document.getElementById('answerFalse').style.display = 'none';
    //Display the saved sudoku board
    let theGame = document.getElementById('theGame');
    theGame.innerHTML = '';
    let table = document.createElement('table');
    for (let i = 0; i < saveMat.length; i++) {
        let tr = document.createElement('tr');
        if (i == 2 || i == 5) {
            tr.style.borderBottom = '5px black solid';
        }
        for (let j = 0; j < saveMat[i].length; j++) {
            let td = document.createElement('td');
            td.innerHTML = saveMat[i][j];
            td.id = `${i}${j}`;
            if (j == 2 || j == 5) {
                td.style.borderRight = '5px black solid';
            }
            if(td.innerHTML == ''){/////different from the first board
            let input = document.createElement('input');
            input.id = `${i}${j}1`;///note - receiving new input id
            input.type = "number";
            input.min = "1";
            input.max = "9";
            td.appendChild(input);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    theGame.appendChild(table);
}

//function for finish button
function finish() { 
    //Copying the board to a new array - for the purpose of checking it
    let checkMat =[];
    for (let i = 0; i <9; i++) {
        let arr = [];
        for (j = 0; j <9; j++) {
           if(document.getElementById(`${i}${j}1`)){// if this is the id (see previous)
            arr.push(document.getElementById(`${i}${j}1`).value);
           }
           else{// if this is the id (see previous)
            arr.push(document.getElementById(`${i}${j}`).innerHTML);
           }
        }
        checkMat.push(arr);
    }
    //Sending the array to a function and receiving an answer (user view)
    let answerTrue = document.getElementById('answerTrue');
    let answerFalse = document.getElementById('answerFalse');
    if (checkThatSudoku(checkMat)) {
        answerFalse.style.display = 'none';
        answerTrue.style.display = 'flex';
    }
    else {
        answerTrue.style.display = 'none';
        answerFalse.style.display = 'flex';
    }
}

// the check function
function checkThatSudoku(checkMat) {
    // Check rows
    for (let i = 0; i < checkMat.length; i++) {
        for (j = 1; j <= 9; j++) {
            for (let k = 0; k < checkMat[i].length; k++) {
                if (checkMat[i][k] == j) {
                    break;
                }
                if (k == checkMat[i].length - 1) {
                    return false;
                }
            }
        }
    }
    // Check columns
    for (let i = 0; i < checkMat.length; i++) {
        for (j = 1; j <= 9; j++) {
            for (let k = 0; k < checkMat[i].length; k++) {
                if (checkMat[k][i] == j) {
                    break;
                }
                if (k == checkMat[i].length - 1) {
                    return false;
                }
            }
        }
    }
    // Check 3x3 sub-grids/box
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let tempArr = [];
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    tempArr.push(checkMat[i + k][j + l]);
                }
            }
            for (let m = 1; m <= 9; m++) {
                for (let n = 0; n < tempArr.length; n++) {
                    if (tempArr[n] == m) {
                        break;
                    }
                    if (n == tempArr.length - 1) {
                        return false;
                    }
                }
            }
        }
    }
    return true; // no duplicates found
}
