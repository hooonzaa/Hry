document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let moves = 0;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent) {
                cell.textContent = currentPlayer;
                moves++;

                if (checkWin()) {
                    alert(`${currentPlayer} wins!`);
                    resetGame();
                } else if (moves === cells.length) {
                    alert('Fire in the hole!');
                    resetGame();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        moves = 0;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let flippedCards = [];
    let matchedPairs = 0;
    let imagesLoaded = 0;

    const cardImages = [
        'https://m.media-amazon.com/images/I/41dddioYJ6L.png',
        'https://images.app.goo.gl/tadgQAKJi32mcv5x6',
       
    ];

    cards.forEach(card => {
        const imageUrl = cardImages[parseInt(card.dataset.card) - 1];

       
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;

            if (imagesLoaded === cards.length) {
               
                cards.forEach(card => {
                    card.addEventListener('click', () => flipCard(card));
                });
            }
        };
    });

    function flipCard(card) {
        if (flippedCards.length < 2 && !flippedCards.includes(card)) {
            flippedCards.push(card);
            card.style.backgroundImage = `url(${cardImages[parseInt(card.dataset.card) - 1]})`;

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.card === card2.dataset.card) {
            card1.removeEventListener('click', () => flipCard(card1));
            card2.removeEventListener('click', () => flipCard(card2));
            matchedPairs++;

            if (matchedPairs === cards.length / 2) {
                alert('Fire in the hole!');
            }
        } else {
            setTimeout(() => {
                card1.style.backgroundImage = '';
                card2.style.backgroundImage = '';
            }, 500); 
        }

        flippedCards = [];
    }
});


