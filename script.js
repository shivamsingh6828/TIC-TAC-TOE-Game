let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach(box => box.classList.remove('winner'));
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {  // player O
            box.innerText = "O";
            turnO = false;
        } else {  // player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        box.style.transform = "scale(1.2)";
        setTimeout(() => {
            box.style.transform = "scale(1)";
        }, 100);

        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
        box.style.cursor = "not-allowed";
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.style.cursor = "pointer";
    });
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");

    // Highlight winning boxes
    pattern.forEach(index => {
        boxes[index].classList.add('winner');
    });

    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1, pattern);
                return;
            }
        }
    }
};

newGame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
