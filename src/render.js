import { TweenLite, Elastic } from 'gsap';

const damp = 3;

let tween1, tween2;

function render(context, config, point, position, screen) {
  context.fillStyle = config.colors[0];
  context.fillRect(0, 0, screen.innerWidth, screen.innerHeight);

  context.fillStyle = config.colors[1];
  context.beginPath();

  if (screen.isLandscape) {
    const center = screen.innerWidth / 2;
    const dist = position.pageX - center;

    if (position.distX > dist && dist > 0 || position.distX < dist && dist < 0) {
      const duration = config.maxWait / 1000 * 3;
      tween1 && tween1.kill();
      tween2 && tween2.kill();
      tween1 = TweenLite.to(point, duration, {x: position.pageX, y: position.pageY});
      tween2 = TweenLite.to(point, duration * damp, {x: center, delay: duration, ease: Elastic.easeOut});
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

    if (position.distY > dist && dist > 0 || position.distY < dist && dist < 0) {
      const duration = config.maxWait / 1000 * 3;
      const y = (position.pageY - center) * 2 + center;
      tween1 && tween1.kill();
      tween2 && tween2.kill();
      tween1 = TweenLite.to(point, duration, {x: position.pageX, y});
      tween2 = TweenLite.to(point, duration * damp, {y: center, delay: duration, ease: Elastic.easeOut});
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
