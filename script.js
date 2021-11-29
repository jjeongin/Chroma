let userColor;

$(document).ready(function(){
    paintingCanvas.initialize();
    $("#circle-container-1").hide();
    $("#circle-container-2").hide();
    // $("#main-page").hide(); // to test canvas page
    // $("#starting-page").hide();

    $("#survey").hide(); // hide survey until the logo gif is finished
    $("#survey-result").hide();
    $("#unmuted-svg").hide(); // main video muted by default
    $("#main-page").hide(); // hide other pages in the beginning
    $("#last-page").hide();

    // #1. STARTING PAGE
    // after logo display, show user survey
    $("#logo-starting-page").show();
    setTimeout(function() {
        $("#logo-starting-page").hide();
        $("#survey").show();
    }, 4000);

    // after user submit survey, hide survey and show survey result
    $("#submit-button-one").click(function(){
        $("#question-one-container").hide();
        $("#question-two-container").show();
        $("#submit-button-one").hide();
        $("#submit-button-two").show();
    });
    // after user submit survey, hide survey and show survey result
    $("#submit-button-two").click(function(){
        $("#question-two-container").hide();
        $("#question-three-container").show();
        $("#submit-button-two").hide();
        $("#submit-button-three").show();
    });
    // after user submit survey, hide survey and show survey result
    $("#submit-button-three").click(function(){
        $("#question-three-container").hide();
        $("#question-four-container").show();
        $("#submit-button-three").hide();
        $("#submit-button-four").show();
    });
    // after user submit survey, hide survey and show survey result
    $("#submit-button-four").click(function(){
        $("#submit-button-four").hide();
        $("#question-four-container").hide();
        $("#survey").hide();

        //Calculate result (0-15)
        let result = 
            parseInt(document.querySelector('input[name="answer-1"]:checked').value) + 
            parseInt(document.querySelector('input[name="answer-2"]:checked').value) * Math.pow(2, 1) + 
            parseInt(document.querySelector('input[name="answer-3"]:checked').value) * Math.pow(2, 2) + 
            parseInt(document.querySelector('input[name="answer-4"]:checked').value) * Math.pow(2, 3);
        
        switch (result) {
            case 0:
                userColor='#98FBE8';
            break;
            case 1:
                userColor='#D9919D';
            break;
            case 2:
                userColor='#54D1F7';
            break;
            case 3:
                userColor='#5C3A92';
            break;
            case 4:
                userColor='#7EE8C8';
            break;
            case 5:
                userColor='#79E002';
            break;
            case 6:
                userColor='#2B5D07';
            break;
            case 7:
                userColor='#EABDA1';
            break;
            case 8:
                userColor='#CA7239';
            break;
            case 9:
                userColor='#AE29F5';
            break;
            case 10:
                userColor='#766731';
            break;
            case 12:
                userColor='#89A502';
            break;
            case 13:
                userColor='#BB842A';
            break;
            case 14:
                userColor='#A23FB1';
            break;
            case 15:
                userColor='#251E5E';
            break;
          default:
                userColor='#BEA8D9';
        }

        //Update colors
        document.getElementById("user-color").style.backgroundColor = userColor;
        var colors = document.getElementsByClassName('user-color-smaller');
        for (var i = 0; i < colors.length; i++) {
          colors[i].style.backgroundColor = userColor;
        }
        $("#survey-result").show();

        // after displaying user color shortly, start main page
        setTimeout(function() {
            $("#starting-page").hide();
            $("#main-page").show();
        }, 2000)
    });

    // #2. MAIN PAGE
    //Checkpoints used to determine which section of the vide owe are in
    let checkpointOne = false; 
    let checkpointTwo = false; 

    // detect the time after the main video has started playing
    var current_time = 0.0;
    const main_video = document.getElementById("main-video");
    main_video.ontimeupdate = function() {pause_video_at_timestamp()};
    main_video.defaultPlaybackRate = 2.0; // change video rate to x2.0
    function pause_video_at_timestamp() {
        current_time = main_video.currentTime;
        console.log(current_time);

        if (57 <= current_time && !checkpointOne) {
            checkpointOne = true;
            main_video.pause();
            $("#continue-button").show();
            $("#circle-container-1").show();
        }

        if (114 <= current_time && !checkpointTwo) {
            checkpointTwo = true;
            main_video.pause();
            $("#continue-button").show();
            $("#circle-container-2").show();
        }
    }

    //Continue past first pause
    $("#continue-button").click(function(){
        main_video.play();
        $("#continue-button").hide();
        $("#circle-container-1").hide();
        $("#circle-container-2").hide();
        redInterview.style.display='none';
        blueInterview.style.display='none';
        yellowInterview.style.display='none';
        orangeInterview.style.display='none';
        greenInterview.style.display='none';
        purpleInterview.style.display='none';
    });

    const blueInterview = document.getElementById("blue-interview");
    const redInterview = document.getElementById("red-interview");
    const yellowInterview = document.getElementById("yellow-interview");
    const greenInterview = document.getElementById("green-interview");
    const orangeInterview = document.getElementById("orange-interview");
    const purpleInterview = document.getElementById("purple-interview");

    //On clicks of circles, show interviews
    $("#blue-circle").click(function(){
        redInterview.pause();
        blueInterview.play();
        yellowInterview.pause();
        orangeInterview.pause();
        greenInterview.pause();
        purpleInterview.pause();
        redInterview.style.display='none';
        blueInterview.style.display='block';
        yellowInterview.style.display='none';
        orangeInterview.style.display='none';
        greenInterview.style.display='none';
        purpleInterview.style.display='none';
    });
    $("#yellow-circle").click(function(){
        redInterview.pause();
        blueInterview.pause();
        yellowInterview.play();
        orangeInterview.pause();
        greenInterview.pause();
        purpleInterview.pause();
        redInterview.style.display='none';
        blueInterview.style.display='none';
        yellowInterview.style.display='block';
        orangeInterview.style.display='none';
        greenInterview.style.display='none';
        purpleInterview.style.display='none';
    });
    $("#red-circle").click(function(){
        redInterview.play();
        blueInterview.pause();
        yellowInterview.pause();
        orangeInterview.pause();
        greenInterview.pause();
        purpleInterview.pause();
        redInterview.style.display='block';
        blueInterview.style.display='none';
        yellowInterview.style.display='none';
        orangeInterview.style.display='none';
        greenInterview.style.display='none';
        purpleInterview.style.display='none';
    });
    $("#orange-circle").click(function(){
        redInterview.pause();
        blueInterview.pause();
        yellowInterview.pause();
        orangeInterview.play();
        greenInterview.pause();
        purpleInterview.pause();
        redInterview.style.display='none';
        blueInterview.style.display='none';
        yellowInterview.style.display='none';
        orangeInterview.style.display='block';
        greenInterview.style.display='none';
        purpleInterview.style.display='none';
    });
    $("#green-circle").click(function(){
        redInterview.pause();
        blueInterview.pause();
        yellowInterview.pause();
        orangeInterview.pause();
        greenInterview.play();
        purpleInterview.pause();
        redInterview.style.display='none';
        blueInterview.style.display='none';
        yellowInterview.style.display='none';
        orangeInterview.style.display='none';
        greenInterview.style.display='block';
        purpleInterview.style.display='none';
    });
    $("#purple-circle").click(function(){
        redInterview.pause();
        blueInterview.pause();
        yellowInterview.pause();
        orangeInterview.pause();
        greenInterview.pause();
        purpleInterview.play();
        redInterview.style.display='none';
        blueInterview.style.display='none';
        yellowInterview.style.display='none';
        orangeInterview.style.display='none';
        greenInterview.style.display='none';
        purpleInterview.style.display='block';
    });

    //On finish of interviews, close them
    blueInterview.onended = function() {
        blueInterview.style.display='none';
    };
    yellowInterview.onended = function() {
        yellowInterview.style.display='none';
    };
    redInterview.onended = function() {
        redInterview.style.display='none';
    };
    orangeInterview.onended = function() {
        orangeInterview.style.display='none';
    };
    greenInterview.onended = function() {
        greenInterview.style.display='none';
    };
    purpleInterview.onended = function() {
        purpleInterview.style.display='none';
    };

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

        setTimeout(function() {
            $("#logo-starting-page").hide();
            $("#survey").show();
        }, 4000)
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
    
    
    this.initialize = function(){
        canvas  = document.getElementById("canvas");
        context = canvas.getContext('2d');
    
        width = window.innerWidth
        height = window.innerHeight
        console.log("Width: " + width)
        canvas.width = width;
        canvas.height = height;
    
        canvas.addEventListener('mousemove', MouseMove, false); 

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
       
       context.fillStyle = userColor;
       context.strokeStyle = userColor;
    
       context.moveTo(startPos.x + a, startPos.y + a);
       context.lineTo(startPos.x + r + a, startPos.y + r + a);
       
       context.stroke();
       context.fill();
       
       context.closePath();
    }
    
    //Changes color
    // var MouseDown = function(e) {
    //     e.preventDefault();
    //     userColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    //     context.fillStyle = userColor;
    //     context.strokeStyle = userColor;
    // }
     
}
var paintingCanvas = new paint();