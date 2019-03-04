var board = new Array();
var hasConflicted = new Array();
var score = 0;

$(function () {
    newGame();
});

function newGame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();

    // updateBoardView();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newGame();
}

function init() {
    $("#gameover").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='grid-cell' id='grid-cell-" + i + "-" + j + "'></div>");
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.css("font-size", getNumberSize(board[i][j]));
                numberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;

        }
    }
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }

    var space_list = new Array();

    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
           if(board[i][j] == 0){
               space_list.push({'row':i,'col':j});
           }
        }
    }

    var randxy = space_list[parseInt(Math.floor(Math.random() * space_list.length))]
    var randx = randxy['row']
    var randy = randxy['col']

    // //随机一个位置
    // var randx = parseInt(Math.floor(Math.random() * 4));
    // var randy = parseInt(Math.floor(Math.random() * 4));
    // while (true) {
    //     if (board[randx][randy] == 0) {
    //         break;
    //     }
    //     randx = parseInt(Math.floor(Math.random() * 4));
    //     randy = parseInt(Math.floor(Math.random() * 4));
    // }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx, randy, randNumber);

    return true;
}