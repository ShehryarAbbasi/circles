(function () {   																		// wrap in IIFE
	var url = "https://api.myjson.com/bins/3zpvj"  										// created JSON, with 3 circles in an array, "name", "color", "diameter"
	var urlOriginal = "http://opslocal-c01.dotomi.com/update/local/swfs/circles.json";  // not working .. receiving DNS error possibly, check Server settings/resources
	var myData = $.getJSON(url, function(data) {										// get the data
	            console.log(data);														// log received data for identifying key:value pairs
	    $.each(data.circles, function(i, item) {										// iterate through the items in the array
	         var circleProperties = {													// collect items and define as CSS styles
	            "width": item.diameter+"px",											// set diameter as width and height of div
	            "height": item.diameter+"px",											// 
	            "border-radius": item.diameter/2+"px",									// divide by 2 to make this shape resemble a circle
	            "background-color": item.color 											// set background color of div
	        };
	        $("#"+item.name).css(circleProperties);										// set CSS styles for each item.name
	    });
	    setInterval(move,5000);															// call this function every 5 seconds for continuous animation
	});

	$(".circle").click(function(){																	// watch this div class for clicks
	    var id = $(this).attr("id");																// get the div id of what was clicked
	    var newBgColor = ["yellow","pink","gray", "lavender", "lawngreen", "magenta", "maroon"];	// fill an array with some "random" colors
	    var randomColor = newBgColor[Math.floor(Math.random()*newBgColor.length)];					// pick an index randomly from color array
	    $("#"+id).css("background-color", randomColor);												// change the color of the clicked div id
	});

	function Animation(circleName,circleSpeed,circleDistance) {							// constructor function for (queued) jquery animation
	 	this.circleName = circleName;													
	 	this.circleSpeed = circleSpeed;
	 	this.circleDistance = circleDistance;
	 	$("#"+circleName).animate({left: "+="+circleDistance+"px"}, circleSpeed).animate({left: "-="+circleDistance+"px"}, circleSpeed);
	 }  

	function move() {  																	// this function instantiates a circle's animation
	    var speed1 = 2500, speed2 = 3500, speed3 = 4500;								// variables to store various speeds
	    var dist = 400;																	// variable to store the css distance "px" the circle will travel
	    var cir1 = new Animation("circle1",speed1,dist);								// instanstiates a circle's animation; passes div id, speed, & distance 
	    var cir2 = new Animation("circle2",speed2,-dist);								// negative distance, to move this circle in reverse direction than others
	    var cir3 = new Animation("circle3",speed3,dist);								//
	 }
}()); 																					


/*---- this is a copy of the JSON data which was uploaded to myjson.com------
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