import 'js/sub';
import '@scss/app';
// import 'regenerator-runtime';
// import 'core-js';

const init = async () => {
  console.log('This is a main js file.');
  await asyncFn();
  jQuery();
  utils.log('hello from app.js');
};

const asyncFn = async () => {
  console.log("I'm async function");
  console.log([1, 2, 3].includes(0));
};

init();
