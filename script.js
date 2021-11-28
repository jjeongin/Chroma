$(document).ready(function(){
    // $("#main-page").hide(); // to test canvas page
    // $("#starting-page").hide();

    $("#survey").hide(); // hide survey until the logo gif is finished
    $("#survey-result").hide();
    $("#unmuted-svg").hide(); // main video muted by default
    $("#main-page").hide(); // hide other pages in the beginning
    $("#last-page").hide();

    // #1. STARTING PAGE
    // after logo display, show user survey
    $("#logo-starting-page").delay(4000).queue(function(){ // gif length is 4.86 sec
        $("#logo-starting-page").hide();
        $("#survey").show();
    });

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
    const canvas = document.getElementById("user-canvas");
    const ctx = canvas.getContext("2d");
    var coord = { x: 0, y: 0 };
    var start_drawing;
    var user_color = "#ACD3ED"; // sample user color

    resize(); // resize in the beginning
    document.addEventListener("mousedown", start);
    document.addEventListener("mouseup", stop);
    document.addEventListener('mousemove', draw); // draw path along the mouse move
    window.addEventListener('resize', resize);

    // resize the canvas according to the current window
    function resize(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
    
    // update the position of the cursor
    function reposition(event) {
        coord.x = event.clientX - canvas.offsetLeft;
        coord.y = event.clientY - canvas.offsetTop;
    }

    function start(event) {
        start_drawing = true;
        reposition(event);
    }

    function stop() {
        start_drawing = false;
    }

    function draw(event) {
        if (start_drawing) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = user_color;
            ctx.moveTo(coord.x, coord.y); // cursor (starting point for drawing) moves to this coord
            reposition(event); // mouse position updated constantly
            ctx.lineTo(coord.x, coord.y); // line traced from start coord to this coord
            ctx.stroke(); // draw the line
        }
    }

    $("#restart-button").click(function(){
        // reset settings
        $("#survey").hide(); // hide survey until the logo gif is finished
        $("#survey-result").hide();
        $("#unmuted-svg").hide(); // main video muted by default
        $("#last-page").hide();
        coord = { x: 0, y: 0 };
        start_drawing = false;
        // user_color = ; // reset user color to default

        $("#starting-page").show();
    });
});