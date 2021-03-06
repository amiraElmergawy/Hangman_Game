let word = '', // convert word that player one guessed to array
    wordCopy = '', //to save the original word
    wordLength = 0, // save word length to compare it with itself every character guessing time
    char = '',
    onePlayerListner = document.getElementById('onePlayer'),
    twoPlayersListner = document.getElementById('twoPlayers'),
    firstPageDiv = document.getElementById('firstDiv'),
    secondPageDiv = document.getElementById('secondDiv'),
    thirdPageDiv = document.getElementById('thirdDiv'),
    backBtnListner = document.getElementById('backBtn'),
    messageDisplay = document.getElementById('messageDisplay'),
    imageDisplay = document.getElementById('imageDisplay'),
    lettersDisplay = document.getElementById('letters'),
    images = [
        "./resources/images/Hangman-0.png",
        "./resources/images/Hangman-1.png",
        "./resources/images/Hangman-2.png",
        "./resources/images/Hangman-3.png",
        "./resources/images/Hangman-4.png",
        "./resources/images/Hangman-5.png",
        "./resources/images/Hangman-6.png"
    ],
    ImageIndex = 1,
    lifeTimes = 6,
    fillLetterDivs = (str) => {
        wordCopy = str;
        str.forEach(element => {
            addElement('div', `<span class='d-none'>${element}</span>`, lettersDisplay, 'className', 'back-btn p-3 text-uppercase smallest-font animate__heartBeat');
        });
        wordLength = str.length;
    };
onePlayerListner.addEventListener('click', (e) => {
    firstPageDiv.classList.add('d-none');
    thirdPageDiv.classList.remove('d-none');
    backBtn.classList.remove('d-none');
    let randomString = Math.random().toString(36).substring(2, 8);
    console.log(randomString)
    word = Array.from(randomString);
    fillLetterDivs(word);
});
twoPlayersListner.addEventListener('click', (e) => {
    firstPageDiv.classList.add('d-none');
    secondPageDiv.classList.remove('d-none');
    backBtn.classList.remove('d-none');
});
backBtnListner.addEventListener('click', (e) => {
    thirdPageDiv.classList.add('d-none');
    secondPageDiv.classList.add('d-none');
    backBtn.classList.add('d-none');
    firstPageDiv.classList.remove('d-none');
    // when user back to home screen delete all saved values
    word = '';
    wordLength = 0;
    char = '';
    lettersDisplay.innerHTML = '';
    messageDisplay.innerHTML = '';
    ImageIndex = 0;
    imageDisplay.src = images[ImageIndex];
    document.getElementById('wordForm').reset();
    let charForm = document.getElementById('charForm');
    let wordPart = document.getElementById('wordAndLetters');
    if (charForm.classList.contains('d-none')) {
        charForm.classList.remove('d-none');
        wordPart.classList.remove('d-none');
    }
})
var addElement = function (elementType, elementInnerHTML, parent, property, propertyValue) {
    element = document.createElement(elementType);
    element.innerHTML = elementInnerHTML;
    parent.appendChild(element);
    element[property] = propertyValue;
}
document.getElementById('wordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    word = Array.from(e.target.word.value);
    if (word != '' || word.length != 0) {
        secondPageDiv.classList.add('d-none');
        thirdPageDiv.classList.remove('d-none');
        fillLetterDivs(word);
    } else {
        alert('Please, enter a correct word');
    }
})

var helperFun = async function (index) {
    await setTimeout(() => {
        lettersDisplay.removeChild(lettersDisplay.children[index]);
    },
        1500
    );
}

document.getElementById('charForm').addEventListener('submit', async e => {
    e.preventDefault();
    var allDivs = document.querySelectorAll('.text-uppercase');
    if (word != '' || char.length != 0) {
        char = e.target.char.value;
        for (let index = 0; index < word.length;) {
            const element = word[index]
            if (element == char) {// if the character is included by word
                word.splice(index, 1); // that will decrease word length
                await helperFun(index)
                await allDivs[index].children[0].classList.remove('d-none');
            } else {
                index++;
            }
        }
        if (word.length == wordLength) { // the gussed char. isn't correct
            // decrease player life times
            // update hangman image
            lifeTimes--;
            imageDisplay.src = images[ImageIndex];
            messageDisplay.textContent = 'Not correct, Try Again';
            if (ImageIndex < 6) ImageIndex++;
            if (lifeTimes == 0) { // player can't try again
                messageDisplay.innerHTML = '<span>Sorry for your lose, </span><span>Go back to play again</span>';
                document.getElementById('charForm').classList.add('d-none');
                document.getElementById('wordAndLetters').classList.add('d-none');
            }
        } else {
            // update wordLength var. for next comparison
            messageDisplay.textContent = 'good guessing';
            wordLength = word.length;
            if (wordLength != 0) {
                setTimeout(() => {
                    messageDisplay.textContent = `just ${wordLength} more guesses to win`;
                },
                    1000
                );
            }
            else {
                messageDisplay.innerHTML = '<span>Congratulations ^_^, </span><span>Go back to play again</span>';
                document.getElementById('charForm').classList.add('d-none');
                document.getElementById('wordAndLetters').classList.add('d-none');
            }
        }
    } else {
        alert('Please, enter a correct character');
    }
    document.getElementById('charForm').reset()
})

// document.getElementById('showBtn').addEventListener('click', (e) => {
//     var allDivs = document.querySelectorAll('.text-uppercase');
//     allDivs.forEach(div => {
//         div.children[0].classList.remove('d-none');
//     })
//     setTimeout(() =>
//         allDivs.forEach(div => {
//             div.children[0].classList.add('d-none');
//             document.getElementById('showBtn').classList.add('d-none');
//         }),
//         300
//     );
// })