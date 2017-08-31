import raf from 'raf';

function init(canvas, rafID) {
  raf.cancel(rafID);

  const { innerWidth, innerHeight }  = window;
  const isLandscape = innerWidth > innerHeight;

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const point = {
    x: innerWidth / 2,
    y: innerHeight / 2
  };

  return { isLandscape, innerWidth, innerHeight, point };
}

export default init;
