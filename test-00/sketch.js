let svgData;

function preload() {
  svgData = loadJSON('yts.json');  // Asegúrate de tener el archivo JSON en la ruta correcta
}

function setup() {
  createCanvas(400, 480);
}

function draw() {
  blendMode(BLEND);
  background("purple");
  translate(-20, 60); // Para que el sistema de coordenadas coincida con el SVG (invertir eje Y)
  scale(.7, .7); // Para que el sistema de coordenadas coincida con el SVG (invertir eje Y)

  let shapes = svgData.shapes;
  let time = millis() / 1000; // Tiempo en segundos
  
  noStroke();
  blendMode(MULTIPLY);
  fill("purple");

  for (let shape of shapes) {
    beginShape();
    for (let coord of shape.coordinates) {
      let x = coord[0] + 10 * sin(coord[1] / 10 + time); // Aplicamos el efecto agua en X
      let y = coord[1];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
