'use strict';

const dir = {
  pX: {x: 1, y: 0},
  nX: {x:-1, y: 0},
  pY: {x: 0, y: 1},
  nY: {x: 0, y:-1}
};

const initState = {
  cols: 150,
  rows: 100,
  snake: [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
  ],
  isDead: false,
  moves: [
    dir.pX 
  ],
  food: {x: 13, y: 25}
};

/* Helper Functions 
++++++++++++++++++++++ */
const isEq = (a, b) => 
  a.x == b.x && a.y == b.y;

const isValidMove = (a, b) =>
  a.x != b.x && a.y != b.y;

const mod = (c, lim) => 
  c == lim ? 0 : c < 0 ? lim - 1 : c;

const isIn = (pos, arr) => 
  arr.some(item => isEq(item, pos));

const getFood = (cols, rows) => ({
  x: Math.floor(Math.random() * 100 % cols),
  y: Math.floor(Math.random() * 100 % rows)
});

const popMove = (arr) =>
  arr.length > 1 ? arr.slice(1, arr.length) : arr;

const nextHead = (st) => ({
  x: mod(st.snake[0].x + st.moves[0].x, st.cols), 
  y: mod(st.snake[0].y + st.moves[0].y, st.rows)
});

const willDie = (st) =>
  isIn(nextHead(st), st.snake.slice(1, st.snake.length - 1));

const willEat = (st) =>
  isEq(nextHead(st), st.food);

/* Alter State 
++++++++++++++++++++++ */
const enqueueMove = (st, mv) => ({
  ...st,
  moves: isValidMove(st.moves[st.moves.length - 1], mv)
    ? st.moves.concat(mv)
    : st.moves
});

const resize = (st, x, y) => ({
  ...st,
  cols: x > -1 ? x : st.cols,
  rows: y > -1 ? y : st.rows
});

/* Generate Next State 
++++++++++++++++++++++ */
const next = (st) => {
  if (willDie(st)) {
    return { ...st,
      isDead: 
        true,
      moves: 
        popMove(st.moves)
    }
  } else if (willEat(st)) {
    return { ...st,
      snake: 
        [nextHead(st)]
        .concat(st.snake
        .slice(0, st.snake.length)),
      food: 
        getFood(st.cols, st.rows),
      moves: 
        popMove(st.moves)
    }
  } else {
    return { ...st,
      snake: 
        [nextHead(st)]
        .concat(st.snake
        .slice(0, st.snake.length - 1)),
      moves:
        popMove(st.moves)
    }
  }
};

export { dir, initState, next, enqueueMove, resize };
