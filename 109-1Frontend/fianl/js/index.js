// ------------------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------------------

var world = [
    // original code

    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2],
    [2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2],
    [2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2],
    [2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2],
    [2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

];

var runningman = {
    x: 9,
    y: 12,
};

var Ghost1 = {
    x: 8,
    y: 10,
    currentDirection: 'right',
};

var Ghost2 = {
    x: 9,
    y: 10,
    currentDirection: 'right',
};

var Ghost3 = {
    x: 10,
    y: 10,
    currentDirection: 'left',
};

var Ghost4 = {
    x: 11,
    y: 10,
    currentDirection: 'left',
};

// ------------------------------------------------------
//  GLOBAL STATUS VARIABLES
// ------------------------------------------------------

var runningmanGotHit = false;
var runningmanLives = 3;
var status = "GameIntro";
var score = 176;

// ------------------------------------------------------
//  UTILS FUNCTION
// ------------------------------------------------------

function collision(a, b) {
    return (a.x == b.x) && (a.y == b.y);
}


function lives() {
    if (runningmanLives === 2) {
        life3.style.display = "none";
    }
    if (runningmanLives === 1) {
        life2.style.display = "none";
    }
}

function reset() {
    runningmanGotHit = false;
    runningmanLives = 3;
    keysFound = 0;
    score = 176;
}

function getLoc(loc) {
    return world[loc.y][loc.x];
}

function left(character) {
    loc = { x: character.x - 1, y: character.y };
    if (loc.x < 0) {
        loc.x += world[loc.y].length;
    }
    return loc;
}

function right(character) {
    loc = { x: character.x + 1, y: character.y };
    if (loc.x >= world[loc.y].length) {
        loc.x = 0;
    }
    return loc;
}

function up(character) {
    loc = { x: character.x, y: character.y - 1 };
    if (loc.y < 0) {
        loc.y += world.length;
    }
    return loc;
}

function down(character) {
    loc = { x: character.x, y: character.y + 1 };
    if (loc.y > world.length) {
        loc.y = 0;
    }
    return loc;
}

function availableDirection(loc, currentDir) {
    let tmp = [];

    newLoc = left(loc);
    if (world[newLoc.y][newLoc.x] != 2 && currentDir != "right") {
        tmp.push("left");
    }
    newLoc = right(loc);
    if (world[newLoc.y][newLoc.x] != 2 && currentDir != "left") {
        tmp.push("right");
    }
    newLoc = up(loc);
    if (world[newLoc.y][newLoc.x] != 2 && currentDir != "down") {
        tmp.push("up");
    }
    newLoc = down(loc);
    if (world[newLoc.y][newLoc.x] != 2 && currentDir != "up") {
        tmp.push("down");
    }

    if (!tmp.length) {
        newLoc = left(loc);
        if (world[newLoc.y][newLoc.x] != 2) { tmp.push("left"); }
        newLoc = right(loc);
        if (world[newLoc.y][newLoc.x] != 2) { tmp.push("right"); }
        newLoc = up(loc);
        if (world[newLoc.y][newLoc.x] != 2) { tmp.push("up"); }
        newLoc = down(loc);
        if (world[newLoc.y][newLoc.x] != 2) { tmp.push("down"); }
    }

    return tmp;
}

// ------------------------------------------------------
//  AGENT FUNCTION
// ------------------------------------------------------

function randomAgent(agent, agentDisplay) {
    let availableAction = availableDirection(agent, agent.currentDirection);
    const chooseAction = availableAction[Math.floor(Math.random() * availableAction.length)];

    if (chooseAction == "down") {
        agent.y = down(agent).y;
        agent.currentDirection = "down";
        agentDisplay();
    } else if (chooseAction == "up") {
        agent.y = up(agent).y;
        agent.currentDirection = "up";
        agentDisplay();
    } else if (chooseAction == "left") {
        agent.x = left(agent).x;
        agent.currentDirection = "left";
        agentDisplay();
    } else if (chooseAction == "right") {
        agent.x = right(agent).x;
        agent.currentDirection = "right";
        agentDisplay();
    }

    if (collision(agent, runningman)) {
        runningmanGotHit = true;
        gameOver();
        displayrunningman();
    }
}

// ------------------------------------------------------
//  ANIMATE FUNCTION
// ------------------------------------------------------

function displayWorld() {

    var output = "";
    var numOfCoins = 0;

    for (var i = 0; i < world.length; i++) {
        output += "\n<div class ='row'>";
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2) {
                output += "\n\t<div class='brick'></div>";
            } else if (world[i][j] == 1) {
                output += "\n\t<div class='coin'></div>";
            } else if (world[i][j] == 3) {
                output += "\n\t<div class='key'></div>";
            } else if (world[i][j] == 0) {
                output += "\n\t<div class='empty'></div>";
            }
            if (world[i][j] == 1) {
                numOfCoins++
            }
        }
        output += "\n</div>";
    }

    // WIN LOGIC
    if (score == 0) {
        $("#scoreNum").html("Your final score was " + 176 - score + " points!");

        runningman = {
            x: 9,
            y: 12
        };

        $("#worldBorder").css('display', 'none');
        $("#runningman").css('display', 'none');
        $("#world").css('display', 'none');
        $("#Ghost1").css('display', 'none');
        $("#Ghost2").css('display', 'none');
        $("#Ghost3").css('display', 'none');
        $("#Ghost4").css('display', 'none');
        $("#scoreBox").css('display', 'none');
        $("#youWinMessage").css('display', 'block');
    }

    $("#world").html(output);
}

function updateLoc(loc) {

}

function displayrunningman() {
    $("#runningman").css('top', runningman.y * 44 + "px");
    $("#runningman").css('left', runningman.x * 44 + "px");
}

function displayGhost1() {
    $("#Ghost1").css('top', Ghost1.y * 44 + "px");
    $("#Ghost1").css('left', Ghost1.x * 44 + "px");
}

function displayGhost2() {
    $("#Ghost2").css('top', Ghost2.y * 44 + "px");
    $("#Ghost2").css('left', Ghost2.x * 44 + "px");
}

function displayGhost3() {
    $("#Ghost3").css('top', Ghost3.y * 44 + "px");
    $("#Ghost3").css('left', Ghost3.x * 44 + "px");
}

function displayGhost4() {
    $("#Ghost4").css('top', Ghost4.y * 44 + "px");
    $("#Ghost4").css('left', Ghost4.x * 44 + "px");
}

function displayScore() {
    $("#score").html(score);
}

// ------------------------------------------------------
//  MAIN FUNCTION
// ------------------------------------------------------

// Game Init function
function worldFunction() {

    reset();

    $("#introScreen").css('display', 'none');
    $("#worldBorder").css('display', 'inline-block');
    $("#runningman").css('display', 'block');
    $("#world").css('display', 'block');
    $("#Ghost1").css('display', 'block');
    $("#Ghost2").css('display', 'block');
    $("#Ghost3").css('display', 'block');
    $("#Ghost4").css('display', 'block');
    $("#scoreBox").css('display', 'inline-block');

    // ------------------------------------------------------
    //  AGENTS FUNCTION
    // ------------------------------------------------------

    window.setInterval(function() {
        randomAgent(Ghost1, displayGhost1);
    }, 300);

    window.setInterval(function() {
        randomAgent(Ghost2, displayGhost2);
    }, 300);

    window.setInterval(function() {
        randomAgent(Ghost3, displayGhost3);
    }, 500);

    window.setInterval(function() {
        randomAgent(Ghost4, displayGhost4);
    }, 300);

    displayWorld();
    displayrunningman();
    displayGhost1();
    displayGhost2();
    displayGhost3();
    displayGhost4();

    displayScore();

    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    document.onkeydown = function(moverunningman) {
        let newLoc = null;

        if (moverunningman.keyCode == 39) {
            newLoc = right(runningman);

            if (getLoc(newLoc) != 2) {
                $("#runningman").css('transform', 'none');
                runningman.x = newLoc.x;
            }
        } else if (moverunningman.keyCode == 37) {
            newLoc = left(runningman);

            if (getLoc(newLoc) != 2) {
                $("#runningman").css('transform', 'rotate(180deg)');
                runningman.x = left(runningman).x;
            }
        } else if (moverunningman.keyCode == 38) {
            newLoc = up(runningman);

            if (getLoc(newLoc) != 2) {
                $("#runningman").css('transform', 'rotate(270deg)');
                runningman.y = up(runningman).y;
            }
        } else if (moverunningman.keyCode == 40) {
            newLoc = down(runningman);

            if (getLoc(newLoc) != 2) {
                $("#runningman").css('transform', 'rotate(90deg)');
                runningman.y = down(runningman).y;
            }
        }

        if (world[runningman.y][runningman.x] == 1) {
            world[runningman.y][runningman.x] = 0;
            score--;
            displayScore();
            displayWorld();
        }
        // displayrunningman();

        if (collision(Ghost1, runningman)) {
            runningmanGotHit = true;
            gameOver();
        }
        // displayrunningman();

        if (collision(Ghost2, runningman)) {
            runningmanGotHit = true;
            gameOver();
        }
        // displayrunningman();

        if (collision(Ghost3, runningman)) {
            runningmanGotHit = true;
            gameOver();
        }
        // displayrunningman();

        if (collision(Ghost4, runningman)) {
            runningmanGotHit = true;
            gameOver();
        }
        // displayrunningman();

        displayrunningman();
    }

}

function gameOver() {

    if (runningmanLives == 1) {
        $("#scoreNum2").html("Your final score was " + score + " points!");

        runningman = {
            x: 9,
            y: 12
        };

        $("#world").css('display', 'none');
        $("#worldBorder").css('display', 'none');
        $("#runningman").css('display', 'none');
        $("#Ghost1").css('display', 'none');
        $("#Ghost2").css('display', 'none');
        $("#Ghost3").css('display', 'none');
        $("#Ghost4").css('display', 'none');
        $("#scoreBox").css('display', 'none');
        $("#gameOverMessage").css('display', "block");

    } else {
        runningmanLives -= 1;
        runningman = {
            x: 9,
            y: 12
        };
        lives();
        displayrunningman();
        displayWorld();
    }
}

function refreshPage() {
    runningmanGotHit = false;
    window.location.reload();
}

function playAgain() {
    runningmanGotHit = false;
    window.location.reload();
    worldFunction();
}