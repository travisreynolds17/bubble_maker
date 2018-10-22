let face1 = getProportions(60);
let face2 = getProportions(15);

drawEye(face1, 200, 200);
drawEye(face2, 400, 400);

function getProportions(eyeWidth) {
  e = eyeWidth;
  let face = new Object();
  face.eyeX = e;
  face.eyeY = e / 2;
  face.height = e * 13;
  face.width = e * 4;
  face.midY = face.height / 2;
  face.midX = e * 2;
  face.noseY = face.height / 4;
  face.noseX = e;
  face.earY = face.noseY;
  face.earX = e / 2;
  face.mouthX = e * 2;
  face.mouthY = e;

  return face;
}

function drawFace(face, xPos, yPos) {
  e = face.eyeX;
  drawEye(face, face.eyeX, face.eyeY);
  drawEye(face, 300 + e, 300);
}
function drawEye(face, xPos, yPos) {
  e = face.eyeX;
  let xStart = xPos + e / 2;
  let yStart = yPos + face.height / 2;
  let cp1 = { x: xStart - e / 4, y: yStart - e / 6 };
  let cp2 = { x: xStart - (3 / 4) * e, y: yStart - e / 8 };
  let end = { x: xStart + e, y: yStart };

  c.beginPath();

  c.moveTo(xStart, yStart);
  c.bezierCurveTo(xStart, yStart, cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  c.stroke();

  xStart = xPos + e / 2;
  yStart = yPos + face.height / 2;

  cp1 = { x: xStart + e / 4, y: yStart + e / 6 };
  cp2 = { x: xStart + (3 / 4) * e, y: yStart + e / 8 };
  end = { x: xStart - e, y: yStart };

  c.beginPath();

  c.moveTo(xStart, yStart);
  c.bezierCurveTo(xStart, yStart, cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  c.stroke();
}
