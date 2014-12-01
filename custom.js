(function () {   																		// wrap in IIFE
	var url = "https://api.myjson.com/bins/3h2kv"  										// created JSON, with circles in an array, "name", "color", "diameter"
	var urlOriginal = "http://opslocal-c01.dotomi.com/update/local/swfs/circles.json";  // not working (tried callback) receiving Server DNS error possibly
	var myData = $.getJSON(url, function(data) {										// get the data
	            console.log(data);														// log received data for identifying key:value pairs
	    $.each(data.circles, function(i, item) {										// iterate through the items in the array
	         var circleProperties = {													// collect items and define as CSS styles
	            "width": item.diameter+"px",											// set diameter as width and height of div
	            "height": item.diameter+"px",											// 
	            "border-radius": item.diameter/2+"px",									// divide by 2 to make this shape resemble a circle
	            "background-color": item.color 											// set background color of div
	        };
	        var addDiv = '<div class="circle" id="' +item.name+ '"></div>';				// dynamically build div tags based on JSON items
            $("#container").append(addDiv);												// add children divs to the parent div
            $("#"+item.name).css(circleProperties);										// set CSS styles for each div id
	    });
	    binder();																		// call the click event handler
     	setInterval(move, 5000);														// call this function every 5 seconds for continuous animation
	});

	function binder() {
		$(".circle").click(function(){																	// watch this div class for clicks
		    var id = this.id;																			// get the div id of what was clicked
		    var newBgColor = ["yellow","pink","gray","lavender","lawngreen","magenta","maroon"];		// fill an array with some "random" colors
		    var randomColor = newBgColor[Math.floor(Math.random()*newBgColor.length)];					// pick an index randomly from color array
		    $("#"+id).css("background-color", randomColor);												// change the color of the clicked div id
		});
	}

	function Animation(circleName,circleSpeed,circleDistance) {							// constructor function for (queued) jquery animation
	 	this.circleName = circleName;													
	 	this.circleSpeed = circleSpeed;
	 	this.circleDistance = circleDistance;
	 	$("#"+circleName).animate({top: "+="+circleDistance+"px"}, circleSpeed).animate({top: "-="+circleDistance+"px"}, circleSpeed);
	 }  

	function move() {  																	// this function instantiates a circle's animation
	    var speed = [2500,3500,4500];													// this array holds different speeds for a circle
	    var dist = [200,400,600];														// this array holds different distances for a circle
        $.each($(".circle"), function () {												// iterate over each div id inside the .circle class
	        var randomSpeed = speed[Math.floor(Math.random()*speed.length)];			// each iteration randomly picks a value from the speed array
	        var randomDist = dist[Math.floor(Math.random()*dist.length)];				// each iteration randomly picks a value from the distance array
	        var cirId = this.id;														// each iteration sets the current div id which it is looking at
		    var cirAnime = new Animation(cirId,randomSpeed,randomDist);					// each iteration instantiates an animation sequence 
	 	});
	}
}()); 																					


/*---- this is a copy of the JSON data format which was uploaded to myjson.com------
{
    "circles": [
        {
            "name": "circle1",
            "color": "red",
            "diameter": "50"
        },
        {
            "name": "circle2",
            "color": "blue",
            "diameter": "75"
        },
        {
            "name": "circle3",
            "color": "green",
            "diameter": "100"
        }
    ]
}
-----------------------------------------------------------------------------*/