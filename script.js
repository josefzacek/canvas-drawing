$(document).ready(function() {
  let canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  let restore_array = [];
  let start_index = -1;
  let stroke_color = 'black';
  let stroke_width = "1";
  let is_drawing = false;

  function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(getX(event), getY(event));
    event.preventDefault();
  }

  function draw(event) {
    if (is_drawing) {
      context.lineTo(getX(event), getY(event));
      context.strokeStyle = stroke_color;
      context.lineWidth = stroke_width;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    }
    event.preventDefault();
  }

  function stop(event) {
    if (is_drawing) {
      context.stroke();
      context.closePath();
      is_drawing = false;
    }
    event.preventDefault();
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    start_index += 1;
  }

  function getX(event) {
    if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
    else {return event.pageX - canvas.offsetLeft}
    }


  function getY(event) {
    if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
    else {return event.pageY - canvas.offsetTop}
  }

  canvas.addEventListener("touchstart", start, false);
  canvas.addEventListener("touchmove", draw, false);
  canvas.addEventListener("touchend", stop, false);
  canvas.addEventListener("mousedown", start, false);
  canvas.addEventListener("mousemove", draw, false);
  canvas.addEventListener("mouseup", stop, false);
  canvas.addEventListener("mouseout", stop, false);

  function download(url){
    var a = $("<a style='display:none'>")
    .attr("href", url)
    .attr("download", "canvas-draving.png")
    .appendTo("body");

    a[0].click();

    a.remove();
  }

  function saveCapture(element) {
    html2canvas(element).then(function(canvas) {
      download(canvas.toDataURL("image/png"));
    })
  }

  $('.download-button').click(function(){
    var element = document.querySelector(".canvas-holder");
    saveCapture(element)
  })

  // add page-loaded class when page loads
  $("body").addClass("page-loaded")

  // remove page-loaded class and close popup
  $(".popup svg").click(function(){
    $("body").removeClass("page-loaded");
    $(".popup").hide();
  })

});
