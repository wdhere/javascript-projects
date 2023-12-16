let sketch = function (p) {
  let ox = p.random(10000);
  let oy = p.random(10000);
  let radius = 200;
  let acc = true;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.strokeWeight(2);
    p.stroke(255);
    p.smooth();
    p.noFill();
  };

  p.draw = function () {
    p.clear();
    p.translate(p.width / 2, p.height / 2);
    display();
  };

  function display() {
    ox += 0.003;
    oy += 0.003;

    animateR();

    p.beginShape();
    for (let angle = 0; angle < 360; angle += 3) {
      let radian = p.radians(angle);
      let radiusN = radius + p.map(getNoise(radian, 0.25), 0, 1, -60, 60);
      p.vertex(radiusN * p.cos(radian), radiusN * p.sin(radian));
    }
    p.endShape(p.CLOSE);
  }

  function animateR() {
    if (radius >= 270) {
      radius = 270;
      acc = false;
    }

    if (radius <= 130) {
      radius = 130;
      acc = true;
    }

    if (acc) {
      radius += 0.5;
    } else {
      radius -= 0.5;
    }
  }

  function getNoise(radian, dim) {
    let r = radian % p.TWO_PI;
    if (r < 0.0) {
      r += p.TWO_PI;
    }
    return p.noise(ox + p.cos(r) * dim, oy + p.sin(r) * dim);
  }
};

new p5(sketch);
