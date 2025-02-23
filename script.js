const pieces = [];
const puzzleContainer = document.getElementById('puzzle-container');
const board = document.getElementById('board');
const completeModal = document.getElementById('complete-modal');
const resetButton = document.getElementById('reset-button');

  
// Cargar piezas de la imagen
function createPuzzlePieces() {
    for (let i = 0; i < 48; i++) { // Mantener el 8x3
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = 'url("n3.jpeg")';
        piece.style.backgroundPosition = `-${(i % 8) * 200}px -${Math.floor(i / 8) * 150}px`;
        piece.setAttribute('data-index', i);
        piece.setAttribute('draggable', 'true');
        piece.addEventListener('dragstart', handleDragStart);
        pieces.push(piece);
    }

    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Crear espacios para el tablero
function createBoardSpaces() {
    for (let i = 0; i < 48; i++) {
        const space = document.createElement('div');
        space.classList.add('droppable');
        space.setAttribute('data-index', i);
        space.addEventListener('dragover', handleDragOver);
        space.addEventListener('drop', handleDrop);
        board.appendChild(space);
    }
}

// Manejar el arrastre de piezas
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-index'));
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const draggedPieceIndex = e.dataTransfer.getData('text/plain');
    const targetIndex = e.target.getAttribute('data-index');

    if (e.target.childElementCount === 0) {
        const draggedPiece = pieces.find(piece => piece.getAttribute('data-index') === draggedPieceIndex);
        e.target.appendChild(draggedPiece);
        checkPuzzleCompletion();
    }
}

// Verificar si el rompecabezas está completo
function checkPuzzleCompletion() {
    const allCorrect = [...board.children].every((space, index) => {
        return space.children.length > 0 && space.children[0].getAttribute('data-index') === space.getAttribute('data-index');
    });

    if (allCorrect) {
        completeModal.classList.remove('hidden'); // Muestra la imagen completa
        board.classList.add('hidden'); // Oculta el tablero
        puzzleContainer.classList.add('hidden'); // Oculta las piezas
    }
}

// Reiniciar el rompecabezas
resetButton.addEventListener('click', () => {
    completeModal.classList.add('hidden');
    board.classList.remove('hidden');
    puzzleContainer.classList.remove('hidden');
    puzzleContainer.innerHTML = '';
    board.innerHTML = '';
    pieces.length = 0;
    createPuzzlePieces();
    createBoardSpaces();
});

createPuzzlePieces();
    createBoardSpaces();