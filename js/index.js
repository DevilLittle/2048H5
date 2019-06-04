const windowWidth = window.screen.availWidth;
const windowHeight = window.screen.availHeight;

const config = {
    cell: 100,//小格边长
    cellSpace: 20,//小格padding
};


//小格数字管理
let number = new Array();
//小格状态管理
let status = new Array();

//总分
let score = 0;

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

$(document).ready(function () {
    startGame();
});

function startGame() {
    initReview();
    init();

    getRandomNumber();
    getRandomNumber();
    updateBoardView();
}

function init() {
    //初始化小格位置
    // for(let i= 0 ;i< 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         let gridCell = $("#grid-cell-"+ i +"-" + j);
    //         gridCell.css('top', getCellTop(i));
    //         gridCell.css('left', getCellLeft(j));
    //     }
    //
    // }

    //初始化小格数字
    for (let i = 0; i < 4; i++) {
        number[i] = new Array();
        status[i] = new Array();
        for (let j = 0; j < 4; j++) {
            number[i][j] = 0;
            status[i][j] = true;
        }
    }

    console.log(number);

    console.log(status);

    score = 0;
}

/**
 * 初始化
 */
function initReview() {
    //初始化小格样式
    $('.grid-cell').css({
        'width': config.cell,
        'height': config.cell,
        'border-radius': 20
    });
    //初始化小格位置
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getCellTop(i));
            gridCell.css('left', getCellLeft(j));
        }
    }
}

/**
 * 获取随机数
 */
function getRandomNumber() {

    let randomIndexX = Math.floor(Math.random() * 4);
    let randomIndexY = Math.floor(Math.random() * 4);

    if (status[randomIndexX][randomIndexY]) {
        number[randomIndexX][randomIndexY] = Math.random() < 0.5 ? 2 : 4;
        status[randomIndexX][randomIndexY] = false;
    } else {
        randomIndexX = Math.floor(Math.random() * 4);
        randomIndexY = Math.floor(Math.random() * 4);
        number[randomIndexX][randomIndexY] = Math.random() < 0.5 ? 2 : 4;
        status[randomIndexX][randomIndexY] = false;
    }
    console.log(randomIndexX, randomIndexY);

}

/**
 * 更新含有数字的视觉样式
 */
function updateBoardView() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $('#container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            let numberCell = $("#number-cell-" + i + "-" + j);

            numberCell.css({
                'width': config.cell,
                'height': config.cell,
                'top': getCellTop(i),
                'left': getCellLeft(j),
                'background-color': getNumberBackgroundColor(number[i][j]),
            });
            number[i][j] === 0 ? numberCell.text('') : numberCell.text(number[i][j]);
        }
    }
}

/**
 * 移动监听事件
 */
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 38:  //up
            moveUp();
            break;
        case 40:  //down
            moveDown();
            break;
        case 37:  //left
            if(moveLeft()){
                getRandomNumber();
            }
            break;
        case 39:  //right
            moveRight();
            break;
    }

});

/**
 * 没有空间不能移动
 */
function noSpace() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (status[i][j]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 结束游戏
 */
function gameOver() {
    if (noSpace()) {
        alert('gameOver');
    }
}

function moveUp() {
    // console.log("up");

}

function moveDown() {
    // console.log('down');
}


/**
 * 是否可以向左移动
 * @param list
 * @returns {boolean}
 */
function canMoveLeft(list) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (list[i][j] !== 0) {
                if (list[i][j - 1] === 0 || list[i][j] === list[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveLeft() {

    console.log(canMoveLeft(number));
    if(!canMoveLeft(number)){
        return false;
    }

    for(let i = 0;i<4;i++){
        for(let j =0;j<4;j++){
            if(number[i][j]!==0){
                for(let k = 0;k<j;k++){
                    if(number[i][k]===0){
                        number[i][k]=number[i][j];
                        number[i][j]=0;

                        return true;
                        console.log('uodate',number);
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}

function moveRight() {
    // console.log('right');
}

/**
 * 获取点的top值
 * @param i
 * @returns {number}
 */
function getCellTop(i) {
    return i * (config.cell + config.cellSpace) + config.cellSpace;
}

/**
 * 获取点的left值
 * @param j
 * @returns {number}
 */
function getCellLeft(j) {
    return j * (config.cell + config.cellSpace) + config.cellSpace;
}

function restart() {
    console.log('start');
}