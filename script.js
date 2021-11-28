$(document).ready(function(){
    paintingCanvas.initialize();
    $(".circle-container").hide();
    $("#main-page").hide(); // to test canvas page
    $("#starting-page").hide();

    // $("#survey").hide(); // hide survey until the logo gif is finished
    // $("#survey-result").hide();
    // $("#unmuted-svg").hide(); // main video muted by default
    // $("#main-page").hide(); // hide other pages in the beginning
    // $("#last-page").hide();

    // #1. STARTING PAGE
    // after logo display, show user survey
    $("#logo-starting-page").show();
    setTimeout(function() {
        $("#logo-starting-page").hide();
        $("#survey").show();
    }, 4000)

    // after user submit survey, hide survey and show survey result
    $("#submit-button").click(function(){
        $("#survey").hide();
        $("#survey-result").show();

        // after displaying user color shortly, start main page
        setTimeout(function() {
            $("#starting-page").hide();
            $("#main-page").show();
        }, 2500)
    });

    // #2. MAIN PAGE
    // detect the time after the main video has started playing
    var current_time = 0.0;
    const main_video = document.getElementById("main-video");
    main_video.ontimeupdate = function() {pause_video_at_timestamp()};
    function pause_video_at_timestamp() {
        current_time = main_video.currentTime;
        console.log(current_time);

        if (57 <= current_time) {
            console.log("paused");
            main_video.pause();
        }
    }

    // mute and unmute the main video
    $("#muted-svg").click(function(){ // if muted before
        $("#main-video").prop('muted', false); // unmute the video
        $("#muted-svg").hide(); // change button image
        $("#unmuted-svg").show();
    });
    $("#unmuted-svg").click(function(){ // if not muted before
        $("#main-video").prop('muted', true); // mute the video
        $("#unmuted-svg").hide();
        $("#muted-svg").show();
    });

    // if the main video has ended, show the last page where user can draw with their own color
    $("#main-video").on('ended',function(){
        $("#main-page").hide();
        $("#last-page").show();
    });

    // #3. LAST PAGE
    // allow users to draw on canvas
    // const canvas = document.getElementById("user-canvas");
    // const ctx = canvas.getContext("2d");
    // var coord = { x: 0, y: 0 };
    // var start_drawing;
    // var user_color = "#ACD3ED"; // sample user color

    // resize(); // resize in the beginning
    // document.addEventListener("mousedown", start);
    // document.addEventListener("mouseup", stop);
    // document.addEventListener('mousemove', draw); // draw path along the mouse move
    // window.addEventListener('resize', resize);

    // // resize the canvas according to the current window
    // function resize(){
    //     ctx.canvas.width = window.innerWidth;
    //     ctx.canvas.height = window.innerHeight;
    // }
    
    // // update the position of the cursor
    // function reposition(event) {
    //     coord.x = event.clientX - canvas.offsetLeft;
    //     coord.y = event.clientY - canvas.offsetTop;
    // }

    // function start(event) {
    //     start_drawing = true;
    //     reposition(event);
    // }

    // function stop() {
    //     start_drawing = false;
    // }

    // function draw(event) {
    //     if (start_drawing) {
    //         ctx.beginPath();
    //         ctx.lineWidth = 5;
    //         ctx.lineCap = "round";
    //         ctx.strokeStyle = user_color;
    //         ctx.moveTo(coord.x, coord.y); // cursor (starting point for drawing) moves to this coord
    //         reposition(event); // mouse position updated constantly
    //         ctx.lineTo(coord.x, coord.y); // line traced from start coord to this coord
    //         ctx.stroke(); // draw the line
    //     }
    // }

    $("#restart-button").click(function(){
        // reset settings
        $("#survey").hide(); // hide survey until the logo gif is finished
        $("#survey-result").hide();
        $("#unmuted-svg").hide(); // main video muted by default
        $("#last-page").hide();
        // user_color = ; // reset user color to default

        $("#starting-page").show(); // restart the starting page
        $("#logo-starting-page").show(); // redisplay the starting logo
    });
});

//Drawing
//The following function for the mouse tracking paint effect has been adapted from Tim Holman's "Oil Painting" found here
//https://codepen.io/tholman/pen/ifDak

// Oil Painting
// Ported from flash project - http://wonderfl.net/c/92Ul

function paint(){
  
    var canvas;
    var context;

    var width;
    var height;

    var startPos; 
    var prevPos;
    var dist = {x: 0, y: 0};
    var colour = '#'+Math.floor(Math.random()*16777215).toString(16);
    
    
    this.initialize = function(){
        canvas  = document.getElementById("canvas");
        context = canvas.getContext('2d');
    
        width = window.innerWidth
        height = window.innerHeight
        console.log("Width: " + width)
        canvas.width = width;
        canvas.height = height;
    
        canvas.addEventListener('mousemove', MouseMove, false);
        canvas.addEventListener('click', MouseDown, false);
        canvas.addEventListener('dblclick', Clear, false);  

        startPos = {x: width/2, y: height/2};
        prevPos = {x: -1, y: -1};
    }
    
    
    var MouseMove = function(e) {
        // console.log(e.clientX + ", " + e.clientY)
        var distance = Math.sqrt(Math.pow(prevPos.x - startPos.x, 2) +
                                 Math.pow(prevPos.y - startPos.y, 2));
                                 
        var a = distance * 10 * (Math.pow(Math.random(), 2) - 0.5);
        
        var r = Math.random() - 0.5;
        
        var size = (Math.random() * 15) / distance;
        
        dist.x = (prevPos.x - startPos.x) * Math.sin(0.5) + startPos.x;
        dist.y = (prevPos.y - startPos.y) * Math.cos(0.5) + startPos.y;
        
        startPos.x = prevPos.x;
        startPos.y = prevPos.y;

        //Check if just starting
        if(startPos.x == -1 && startPos.y == -1){
            startPos.x = e.clientX;
            startPos.y = e.clientY;
        }

        //Normalize to scaled canvas
        // console.log(e.clientY + ", " + parseInt($("#canvas").css("height")) + ", " + canvas.height)
        let x = (e.clientX / parseInt($("#canvas").css("width"))) * canvas.width;
        let y = (e.clientY / parseInt($("#canvas").css("height"))) * canvas.height;

        // console.log(x + ", " + y)

        prevPos.x = x;
        prevPos.y = y;
       
       // ------- Draw -------
       var lWidth = (Math.random()+20/10-0.5)*size+(1-Math.random()+30/20-0.5)*size;
       context.lineWidth = lWidth;
       context.strokeWidth = lWidth;
       
       context.lineCap = 'round';
        context.lineJoin = 'round';
       context.beginPath(); 
       context.moveTo(startPos.x, startPos.y);
       context.quadraticCurveTo(dist.x, dist.y, prevPos.x, prevPos.y);
       
       context.fillStyle = colour;
       context.strokeStyle = colour;
    
       context.moveTo(startPos.x + a, startPos.y + a);
       context.lineTo(startPos.x + r + a, startPos.y + r + a);
       
       context.stroke();
       context.fill();
       
       context.closePath();
    }
    
    //Changes color
    var MouseDown = function(e) {
        e.preventDefault();
        colour = '#'+Math.floor(Math.random()*16777215).toString(16);
        context.fillStyle = colour;
        context.strokeStyle = colour;
    }
    
    //Clear paint
    var Clear = function(e) {
        e.preventDefault();
        context.clearRect(0, 0, width, height);
    }   
}
var paintingCanvas = new paint();