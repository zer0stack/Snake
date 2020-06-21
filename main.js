'use strict';
import { dir, initState, next, enqueueMove, resize } from './snake.js';

window.onload = function() { 
  if (document.getElementById('canvas')?.getContext) {
    function draw(st) {
      /* board */
      ctx.clearRect(0, 0, width, height);
     console.log(st); 
      /* food */
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(st.food.x * size + size / 2, st.food.y * size + size / 2,
        size / 2 - 1, 0, 2 * Math.PI);
      ctx.fill();
     
      /* snake */
      ctx.fillStyle = '#00ff00';
      st.snake.forEach(el => {
        ctx.fillRect(el.x * size, el.y * size, size, size);
        ctx.strokeRect(el.x * size, el.y * size, size, size);
      });

      /* snake's eye */
      ctx.fillStyle = '#000000';
      ctx.fillRect(st.snake[0].x * size + 4, st.snake[0].y * size + 4, 8, 4);
      return st;
    }

    document.addEventListener('keydown', function(event) {
      switch (event.code) {
        case 'ArrowRight': case 'KeyD': 
          state = enqueueMove(state, dir.pX);
          break;
        case 'ArrowDown': case 'KeyS': 
          state = enqueueMove(state, dir.pY); 
          break;
        case 'ArrowLeft': case 'KeyA': 
          state = enqueueMove(state, dir.nX); 
          break;
        case 'ArrowUp': case 'KeyW': 
          state = enqueueMove(state, dir.nY); 
          break;
      }
    });

    const step = t1 => t2 => {
      if (t2 - t1 > delay) { 
                  
        
        if (!state.snake.length) {
          alert('Game Over!');
          return;
        }
        draw(state);
        state = next(state);
        window.requestAnimationFrame( step(t2) );
      } else {
        window.requestAnimationFrame( step(t1) );
      }
    };


    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    /* set canvas size to fullscreen */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let width = window.innerWidth;
    let height = window.innerHeight;

    /* game parameters */
    const fps = 16;
    const delay = 1e3 / fps;
    const size = 20;
    
    const cols = Math.floor(width / size);
    const rows = Math.floor(height / size);

    let state = resize(Object.assign({}, initState), cols, rows);

    draw( state );
    window.requestAnimationFrame( step(0) );
  } else {
    console.log('This browser does not support canvas element.');
  }
};
