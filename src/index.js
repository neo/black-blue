import raf from 'raf';
import debounce from 'lodash.debounce';

import init from './init';
import renderCanvas from './render';

const maxWait = 1000 / 60 * 3;

const config = {
  maxWait,
  colors: ['#24292e', '#0077b5']
};

const canvas = window.document.getElementById('canvas');
const context = canvas.getContext('2d');

let { isLandscape, innerWidth, innerHeight, point } = init(canvas);
let rafID, pageX = innerWidth / 2, pageY = innerHeight / 2, distX = 0, distY = 0, startX = 0, startY = 0;

rafID = raf(render);

function render() {
  renderCanvas(context, config, point, { pageX, pageY, distX, distY }, { isLandscape, innerWidth, innerHeight });
  rafID = raf(render);
}

function resize() {
  const screen = init(canvas, rafID);
  point = screen.point;
  innerWidth = screen.innerWidth;
  innerHeight = screen.innerHeight;
  isLandscape = screen.isLandscape;
  rafID = raf(render);
}

function mousemove(event) {
  distX = event.pageX - pageX;
  distY = event.pageY - pageY;
  pageX = event.pageX;
  pageY = event.pageY;
}

function touchstart(event) {
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
}

function touchmove(event) {
  distX = event.pageX - startX;
  distY = event.pageY - startY;
  pageX = event.pageX;
  pageY = event.pageY;
}

function touchend() {
  distX = 0;
  distY = 0;
  pageX = innerWidth / 2;
  pageY = innerHeight / 2;
}

window.addEventListener('resize', resize, false);
window.addEventListener('mousemove', debounce(mousemove, maxWait, {maxWait}), false);
window.addEventListener('touchstart', touchstart, false);
window.addEventListener('touchmove', touchmove, false);
window.addEventListener('touchend', touchend, false);
