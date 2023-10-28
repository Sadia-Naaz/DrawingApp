let zoomLevel = 100; // Initial zoom level

document.getElementById("zoom-in-button").addEventListener("click", function() {
    zoomLevel += 10;
    updateZoomDisplay();
});

document.getElementById("zoom-out-button").addEventListener("click", function() {
    zoomLevel -= 10;
    updateZoomDisplay();
});

function updateZoomDisplay() {
    // Ensure zoom level is within bounds (between 50% and 200%)
    zoomLevel = Math.max(50, Math.min(200, zoomLevel));
    
    // Set zoom display text
    document.getElementById("zoom-display").textContent = zoomLevel + "%";
    
    // Apply zoom to the content or perform any other actions as needed
    // Example: document.body.style.zoom = zoomLevel + "%";
}
const menuButton = document.getElementById('menu-button');
const menucontainer = document.getElementById('menu-container');

menuButton.addEventListener('click', () => {
    menucontainer.classList.toggle('show-menu');
});

const modeToggle = document.getElementById('modeToggle');
const menuContainer =document.getElementById('menu-container');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    menu-container.classList.toggle('dark-mode');

});




let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;
let startX, startY;
let isDraw = false;
const spans = document.querySelectorAll(".tool-bar span");
//function to toggle the selected class
function toggleSpan(span){
    spans.forEach(el => 
    el.classList.remove('selected'));
         span.classList.add('selected');
}
//Add event listener to toggled span
spans.forEach(span=>{
    span.addEventListener('click',()=>{
        toggleSpan(span);
        switch(span.id){
            case 'pan_tool':
            
           console.log("pan-tool is selected");
            break;
            case 'rectangle':
            console.log("rectangle is selected");
            drawRectangle();
            break;
    
        }
    });
  
 
});
canvas.addEventListener('mousedown',startDrawing);
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup',stopDrawing);
canvas.addEventListener('mouseleave',stopDrawing);


function startDrawing(event){
 isDraw =true;
  draw(event);
}
function draw(event){
if(!isDraw)return;
ctx.strokeStyle='black';
ctx.lineWidth='2px';
ctx.lineTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
}
function stopDrawing(){
    isDraw=false;
    ctx.beginPath();
}
function drawRectangle(){
    isDraw=true;
    const rectangles =[];
    canvas.addEventListener('mousedown', startRectangle);
    canvas.addEventListener('mousemove', drawRrectangle);
    canvas.addEventListener('mouseup', stopRectangle);
    canvas.addEventListener('mouseout', stopRectangle);
    function startRectangle(event) {
        isDraw = true;
        startX = event.clientX - canvas.offsetLeft;
        startY = event.clientY - canvas.offsetTop;
        rectangles.push({startX,startY,width:0,height:0});
    }
    function drawRrectangle(event) {
        if (!isDraw) return;
        // const endX = event.clientX - canvas.offsetLeft;
        // const endY = event.clientY - canvas.offsetTop;
        const currentRect = rectangles[rectangles.length - 1];
        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;
        currentRect.width = mouseX - currentRect.startX;
        currentRect.height = mouseY - currentRect.startY;
        // const width = endX - startX;
        // const height = endY - startY;
        // const currentRect = rectangles[rectangles.length - 1];
        // Clear the canvas and redraw the rectangle
      //  ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.beginPath();
        // ctx.rect(startX, startY, width, height);
        // ctx.stroke();
        // ctx.beginPath();
        redrawCanvas();
       
    }
    function stopRectangle() {
        isDraw = false;
    }
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const rect of rectangles) {
            ctx.beginPath();
            ctx.rect(rect.startX, rect.startY, rect.width, rect.height);
            ctx.stroke();
        }
    }
    function clearCanvas() {
        rectangles = [];
        redrawCanvas();
    }
    document.getElementById('clearButton').addEventListener('click', clearCanvas);

}