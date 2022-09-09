$(document).ready(function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawOnCanvas();
  }

  resizeCanvas();

  var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
  var x = "black",
    y = 2;

  function drawOnCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    canvas.addEventListener("mousemove", function(e) {
      findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
      findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
      findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
      findxy('out', e)
    }, false);
  }

  function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
  }

  function findxy(res, e) {
    if (res == 'down') {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      flag = true;
      dot_flag = true;
      if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
      }
    }
    if (res == 'up' || res == "out") {
      flag = false;
    }
    if (res == 'move') {
      if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        draw();
      }
    }
  }

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

});
