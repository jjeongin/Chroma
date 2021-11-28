$(document).ready(function(){
    $("#main-page").hide();
    $("#starting-page").hide();


    // $("#survey").hide();
    // $("#survey-result").hide();
    // $("#unmuted-svg").hide();
    // $("#main-page").hide();
    // $("#last-page").hide();

    // function show_survey(){
    //     $("#survey").show();
    // }

     // after logo display, show user survey
    $("#logo-starting-page").delay(4000).queue(function(){ // gif length is 4.86 sec
        $("#logo-starting-page").hide();
        $("#survey").show();
    })

    // after user submit survey, hide survey and show survey result
    $("#submit-button").click(function(){
        $("#survey").hide();
        $("#survey-result").show();

        // after displaying user color shortly, start main page
        setTimeout(function() {
            $("#starting-page").hide();
            $("#main-page").show();
        }, 2500)
    })

    // mute and unmute the main video
    $("#muted-svg").click(function(){ // if muted before
        $("#main-video").prop('muted', false);
        $("#muted-svg").hide();
        $("#unmuted-svg").show();
    })
    $("#unmuted-svg").click(function(){ // if not muted before
        $("#main-video").prop('muted', true);
        $("#unmuted-svg").hide();
        $("#muted-svg").show();
    })

    // allow users to draw on canvas
    const canvas = document.getElementById("user-canvas");
    var user_color = "#ACD3ED";
    const ctx = canvas.getContext("2d");
    var coord = { x: 0, y: 0 };

    document.addEventListener("mousedown", start);
    document.addEventListener("mouseup", stop);

    // Resizes the canvas to the available size of the window.
    function resize(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
    
    // Updates the coordianates of the cursor when 
    // an event e is triggered to the coordinates where 
    // the said event is triggered.
    function reposition(event) {
        coord.x = event.clientX - canvas.offsetLeft;
        coord.y = event.clientY - canvas.offsetTop;
    }

    function start(event) {
        document.addEventListener("mousemove", draw);
        reposition(event);
    }

    function stop() {
        document.removeEventListener("mousemove", draw);
    }

    function draw(event) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = user_color;
        ctx.moveTo(coord.x, coord.y); // cursor (starting point for drawing) moves to this coord
        reposition(event); // mouse position updated constantly
        ctx.lineTo(coord.x, coord.y); // line traced from start coord to this coord
        ctx.stroke(); // draw the line
    }
});