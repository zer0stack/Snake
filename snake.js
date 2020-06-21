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
  moves: [
    dir.pX 
  ],
  food: {x: 13, y: 25}
};

const isEq = (a, b) => 
  a.x == b.x && a.y == b.y;

const isValidMove = (a, b) =>
  a.x != b.x && a.y != b.y;

const mod = (c, lim) => 
  c == lim ? 0 : c < 0 ? lim - 1 : c;

const isIn = (pos, arr) => 
  arr.some(item => isEq(item, pos));

const food = (cols, rows) => ({
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

const glue = (head, sn, len) =>
  [head].concat(sn.slice(0, len));

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

const next = (st) => ({
  ...st,
  snake: willDie(st)
    ? []    
    : glue(nextHead(st), st.snake, 
      willEat(st) 
        ? st.snake.length 
        : st.snake.length - 1),
  moves: popMove(st.moves),
  food: willEat(st)
    ? food(st.cols, st.rows)
    : st.food
});

export { dir, initState, next, enqueueMove, resize };
