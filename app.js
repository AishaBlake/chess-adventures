var board,
  game = new Chess();

// do not pick up pieces if the game is over
// only pick up pieces for White
var onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};

var makeRandomMove = function() {
  var possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) return;

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIndex]);
  board.position(game.fen());
};

var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  // make random legal move for black
  window.setTimeout(makeRandomMove, 250);
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var cfg = {
  showNotation: false,
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

$('#resetBtn').on('click', function() {
  // board.start(false);
  location.reload();
});

$('#switchBtn').on('click', function(){
  board.start(false);
  board.flip();
});




// var cbo = {
//   draggable: true,
//   position: {
//     a2: 'wP',
//     b2: 'wP',
//     c2: 'wP',
//     d2: 'wP',
//     e2: 'wP',
//     f2: 'wP',
//     g2: 'wP',
//     h2: 'wP',
//     a7: 'bP',
//     b7: 'bP',
//     c7: 'bP',
//     d7: 'bP',
//     e7: 'bP',
//     f7: 'bP',
//     g7: 'bP',
//     h7: 'bP',
//   }
// };
//
// var pawnGame = ChessBoard('pawnGame', cbo);
