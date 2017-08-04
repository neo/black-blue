import { stop, animate, spring } from '@neoli/dynamics.js';

const damp = 2;

let isAnimating = false;
const complete = () => isAnimating = false;

function elastic(duration) {
  const frequency = 200;
  const friction = 100;
  return {
    type: spring,
    delay: duration,
    duration: duration * damp,
    frequency,
    friction,
    complete
  };
}

function render(context, config, point, position, screen) {
  context.fillStyle = config.colors[0];
  context.fillRect(0, 0, screen.innerWidth, screen.innerHeight);

  context.fillStyle = config.colors[1];
  context.beginPath();

  if (screen.isLandscape) {
    const center = screen.innerWidth / 2;
    const dist = position.pageX - center;

    if (Math.abs(position.distX) - Math.abs(dist) > 0 && position.distX * dist > 0 && !isAnimating) {
      isAnimating = true;
      const duration = config.maxWait * 3;
      stop(point);
      animate(point, {x: position.pageX, y: position.pageY}, {duration});
      animate(point, {x: center}, elastic(duration));
    }

    const x = point.x + 0.1;
    const y = point.y;

    context.moveTo(center, 0);
    context.bezierCurveTo(x, y, x, y, center, screen.innerHeight);
    context.lineTo(screen.innerWidth, screen.innerHeight);
    context.lineTo(screen.innerWidth, 0);
  } else {
    const center = screen.innerHeight / 2;
    const dist = position.pageY - center;

    if (Math.abs(position.distY) - Math.abs(dist) > 0 && position.distY * dist > 0 && !isAnimating) {
      isAnimating = true;
      const duration = config.maxWait * 3;
      const y = (position.pageY - center) * 2 + center;
      stop(point);
      animate(point, {x: position.pageX, y}, {duration});
      animate(point, {y: center}, elastic(duration));
    }

    const x = point.x;
    const y = point.y;

    context.moveTo(0, center);
    context.bezierCurveTo(x, y, x, y, screen.innerWidth, center);
    context.lineTo(screen.innerWidth, screen.innerHeight);
    context.lineTo(0, screen.innerHeight);
  }

  context.closePath();
  context.fill();
}

export default render;
