(function () {
  console.log("V.001")
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();