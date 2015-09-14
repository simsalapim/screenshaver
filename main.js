var hairCoordinates = [];
var hairsShaved = 0;
var amountOfHairs = 500;

$(document).ready(function(){
	//disable scrolling
	$('html, body').css({
	    'overflow': 'hidden',
	    'height': '100%'
	});

	for(var i = 0; i < amountOfHairs; i++){
		addHair();
	}

	var mouseIsDown = false;
	$(document).mousedown(function() {
	    mouseIsDown = true;
	   	var audio = $( this ).find( ".shavingsound" )[0].play();
	}).mouseup(function() {
	    mouseIsDown = false;
	    var audio = $( this ).find( ".shavingsound" )[0];
  		audio.pause();
	});

	//grow the hairs
	window.setInterval(function(){
		$("#hairs img").css({"height":"+=4px"});
	}, 1000);

	$(document).on('mousemove', function(e){
		if(mouseIsDown){
			for( var i = 0; i < hairCoordinates.length; i ++ ){
				if((hairCoordinates[i][0] - e.pageX) < 100 && (hairCoordinates[i][0] - e.pageX) > 0){
					if((hairCoordinates[i][1] - e.pageY) < 100 && (hairCoordinates[i][1] - e.pageY) > 0){
						var image = $("#hairs img")[i];
						$(image).detach().appendTo('#shaved-hairs');
						 $(image).animate({top: "+=1000"}, 1000, function(){
						});
					 	hairCoordinates.splice(i,1);
						hairsShaved ++;
						if(hairsShaved == amountOfHairs){
							$("#done").css({"visibility":"visible"})
							$('#shaved-hairs').html('');
							var audio = $( this ).find( ".applause" )[0].play();

						}
						else if(hairsShaved == 50){
							$( "#wow" ).fadeIn( 1000, function() {
								$( "#wow" ).fadeOut( 1000);
							 });
						}
						else if(hairsShaved == 200){
							$( "#body-part" ).fadeIn( 2000, function() {
								$( "#body-part" ).fadeOut( 2000);
							 });
						}

						else if(hairsShaved == amountOfHairs-100){
							$( "#almost-done" ).fadeIn( 1000, function() {
								$( "#almost-done" ).fadeOut( 1000);
							 });
						}
					}

				}
			}
		}
	    $('#razor').css({
	       left:  e.pageX + 10,
	       top:   e.pageY + 10,
	    });
	});

});

function generateRandom(max) {
    var num = Math.floor(Math.random() * max);
    return num;
}

function addHair() {
	var hairNumber = generateRandom(5);
    $("#hairs").append("<img src='images/hair"+hairNumber+".png'>");
    var left = generateRandom($( window ).width());
    var top = generateRandom($( window ).height());
    var rotation = generateRandom(30);
    $("#hairs img").last().css({"position":"absolute","top": top + "px", "left": left + "px", "transform":"rotate(" + rotation + "deg)"});
    hairCoordinates.push([left, top])
}