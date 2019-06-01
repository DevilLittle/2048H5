const windowWidth = window.screen.availWidth;
const windowHeight = window.screen.availHeight;

const config = {
    cell:100,//小格边长
    cellSpace:20,//小格padding
};

let score = 0;

let number = new Array();

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
    for(let i= 0 ;i<4;i++) {
        number[i]=new Array();
        // hasConflicted[i]=new Array();
        for (let j = 0; j < 4; j++) {
            number[i][j]=0;
            // hasConflicted[i][j]=false;
        }
    }

    console.log(number);


    score=0;
}

/**
 * 初始化
 */
function initReview() {
    //初始化小格样式
    $('.grid-cell').css({
        'width':config.cell,
        'height':config.cell,
        'border-radius':20
    });
    //初始化小格位置
    for(let i= 0 ;i< 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $("#grid-cell-"+ i +"-" + j);
            gridCell.css('top', getCellTop(i));
            gridCell.css('left', getCellLeft(j));
        }
    }
}

/**
 * 获取随机数
 */
function getRandomNumber() {
    let randomIndexX = Math.floor(Math.random()*4);
    let randomIndexY = Math.floor(Math.random()*4);
    console.log(randomIndexX,randomIndexY);

    number[randomIndexX][randomIndexY] = Math.random()<0.5? 2 : 4;
}

/**
 * 更新含有数字的视觉样式
 */
function updateBoardView() {
    for(let i=0;i<4;i++){
        for(let j = 0;j<4;j++){
            $('#container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            let numberCell = $("#number-cell-"+ i +"-" + j);

            numberCell.css({
                'width':config.cell,
                'height':config.cell,
                'top':getCellTop(i),
                'left':getCellLeft(j),
                'background-color':getNumberBackgroundColor(number[i][j]),
            });

            number[i][j]===0?numberCell.text(''):numberCell.text(number[i][j]);

        }
    }
}

/**
 * 移动数字
 */
function move() {

}
/**
 * 获取点的top值
 * @param i
 * @returns {number}
 */
function getCellTop(i) {
    return i*(config.cell+config.cellSpace)+config.cellSpace;
}

/**
 * 获取点的left值
 * @param j
 * @returns {number}
 */
function getCellLeft(j) {
    return j*(config.cell+config.cellSpace)+config.cellSpace;
}

function restart(){
    console.log('start');
}