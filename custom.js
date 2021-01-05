(function () {   																			// wrap in IIFE
	var url = "https://api.npoint.io/47c68c769a4bc36298c7";									// created JSON, with circles in an array, "name", "color", "diameter"
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	var newBgColor = ["#1abc9c","#2ecc71","#3498db","#e67e22","#9b59b6","#f1c40f","#34495e"];		// fill an array with some "random" colors
	var speed = [2500,5000,10000];																	// this array holds different speeds for a circle, higher = slower
	var dist = [200,400,600,800,1000];																// this array holds different distances for a circle, higher = further
	function randomSpeed() {return speed[Math.floor(Math.random()*speed.length)];}					// each iteration randomly picks a value from the speed array
	function randomDist() {return dist[Math.floor(Math.random()*dist.length)];}						// each iteration randomly picks a value from the distance array
	function randomColor() {return newBgColor[Math.floor(Math.random()*newBgColor.length)];}		// pick an index randomly from color array
	
	var myData = $.getJSON(url, function(data) {													// get the data from the URL
		console.log(data);
		var fill = Math.floor(windowWidth/(data.circles.length*10));
		console.log("fill: ", fill);
		count=0;
		for (var i=0;i<=fill;i++) {
			$.each(data.circles, function(i, item) {										// iterate through the items in the array
				var circleProperties = {													// collect items and define as CSS styles
				   "width": item.diameter+"px",												// set diameter as width and height of div
				   "height": item.diameter+"px",											// 
				   "border-radius": item.diameter/2+"px",									// divide by 2 to make this shape resemble a circle
				   "background-color": randomColor() 										// set background color of div
			   };
			   var addDiv = '<div class="circle" id="' +item.name+count+ '"></div>';		// dynamically build div tags based on JSON items
			   $("#container").append(addDiv);												// add children divs to the parent div
			   $("#"+item.name+count).css(circleProperties);								// set CSS styles for each div id
		   });
		   count++;
		}
		
	   	binder();																			// call the click event handler when circle is clicked
		setInterval(move, 500);			

	});


	function binder() {
		$(".circle").click(function(){														// watch this div class for clicks
		    var id = this.id;																// get the div id of what was clicked
		    $("#"+id).css("background-color", randomColor());								// change the color of the clicked div id
		});
	}

	function Animation(circleName,circleSpeed,circleDistance) {								// constructor function for (queued) jquery animation
	 	this.circleName = circleName;													
	 	this.circleSpeed = circleSpeed;
	 	this.circleDistance = circleDistance;
	 	$("#"+circleName).animate({top: "+="+circleDistance+"px"}, circleSpeed).animate({top: "-="+circleDistance+"px"}, circleSpeed);
	 }  

	function move() {  																		// this function instantiates a circle's animation
        $.each($(".circle"), function () {													// iterate over each div id inside the .circle class
	        var cirId = this.id;															// each iteration sets the current div id which it is looking at
			var cirAnime = new Animation(cirId,randomSpeed(),randomDist());					// each iteration instantiates an animation sequence 
	
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
