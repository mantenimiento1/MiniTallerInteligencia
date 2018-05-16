window.onload = function() {
  const Entrada = document.querySelector("input")
  const Spoiler = document.querySelector("#spoiler")

  const Neurona = new brain.NeuralNetwork();

   Neurona.train([
     {input:{r: 0,  g: 0, b:  0 }, output: {claro: 1}},
     {input:{r: 1,  g: 1, b:  1 }, output: {oscuro: 1}},
     {input:{r: 0.6,  g: 0.35, b:  0.41 }, output: {claro: 1}}
   ]);

  //var v =  Neurona.run({r: 0.1, g:0.2, b: 0.2});
  //console.log("claro "+v.claro+" oscuro "+v.oscuro);


  Entrada.addEventListener("change", (e) => {
    Spoiler.style.background = e.target.value;
    var ColorRGB = getRgb(e.target.value);
    console.log("Cambiando Color " + e.target.value);
    console.log("Rojo " + ColorRGB.r);
    console.log("Azul " + ColorRGB.b);
    console.log("Verde " + ColorRGB.g);

    var Resultado = brain.likely(ColorRGB, Neurona );
    console.log("Resultado "+ Resultado.claro);
    Spoiler.style.color =  Resultado === "claro" ? "white" : "black";

  })

  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  function getRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
      g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
      b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
    } : null;
  }

}
