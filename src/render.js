import { TweenLite, Back } from 'gsap';

const damp = 3;

function render(context, config, point, position, screen) {
  context.fillStyle = config.colors[0];
  context.fillRect(0, 0, screen.innerWidth, screen.innerHeight);

  context.fillStyle = config.colors[1];
  context.beginPath();

  if (screen.isLandscape) {
    const center = screen.innerWidth / 2;

    if (Math.abs(position.distX) > Math.abs(position.pageX - center)) {
      const duration = config.maxWait / 1000 * 5;
      TweenLite.to(point, duration, {x: position.pageX, y: position.pageY});
      TweenLite.to(point, duration * damp, {x: center, delay: duration, ease: Back.easeOut});
    }

    const x = point.x + 0.1;
    const y = point.y;

    context.moveTo(center, 0);
    context.bezierCurveTo(x, y, x, y, center, screen.innerHeight);
    context.lineTo(screen.innerWidth, screen.innerHeight);
    context.lineTo(screen.innerWidth, 0);
  } else {
    const center = screen.innerHeight / 2;

    if (Math.abs(position.distY) > Math.abs(position.pageY - center)) {
      const duration = config.maxWait / 1000 * 5;
      TweenLite.to(point, duration, {x: position.pageX, y: position.pageY});
      TweenLite.to(point, duration * damp, {y: center, delay: duration, ease: Back.easeOut});
    }

    const x = point.x;
    const y = (point.y - center) * 2 + center;

    context.moveTo(0, center);
    context.bezierCurveTo(x, y, x, y, screen.innerWidth, center);
    context.lineTo(screen.innerWidth, screen.innerHeight);
    context.lineTo(0, screen.innerHeight);
  }

  context.closePath();
  context.fill();
}

export default render;
