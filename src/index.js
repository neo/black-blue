import raf from 'raf';
import debounce from 'lodash.debounce';

import init from './init';
import renderCanvas from './render';

const maxWait = 1000 / 60 * 5;

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
  pageX = startX = event.touches[0].pageX;
  pageY = startY = event.touches[0].pageY;
}

function touchmove(event) {
  distX = event.touches[0].pageX - startX;
  distY = event.touches[0].pageY - startY;
  pageX = event.touches[0].pageX;
  pageY = event.touches[0].pageY;
}

function touchend() {
  distX = 0;
  distY = 0;
  pageX = startX = innerWidth / 2;
  pageY = startY = innerHeight / 2;
}

window.addEventListener('resize', resize, false);
window.addEventListener('mousemove', debounce(mousemove, maxWait, {maxWait}), false);
window.addEventListener('touchstart', touchstart, false);
window.addEventListener('touchmove', touchmove, false);
window.addEventListener('touchend', touchend, false);
