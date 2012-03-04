

    function initialize() {
      var myOptions = {
        center: new google.maps.LatLng(20, 0),
        zoom: 2,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };
      map = new google.maps.Map(document.getElementById("map_canvas"),
          myOptions);
    }
    $(document).ready(function() {
    	initialize();
    	$('#about').click(function() {cal()});
    });
    
      	sqrt = Math.sqrt;
      	abs = Math.abs;
      	unset = function(data) {console.log("unset called")};
      	
    	//calculation 
	function cal() { 
	   	
    	var line1 = "1 38081U 12006E   12061.78114031  .00034901  00000-0  92131-3 0   496";
    	var line2 = "2 38081  69.4865 199.7253 0777030  22.5855 340.7542 14.06304007  2436";
    	
    	var pred = new jsPredict();
    	var masat = new tle("MASAT",line1,line2);
    	var geo = new geodetic(47,19,100);
    	var plan = [];
    	for(var i=0 ; i < 100 ; i++) {
		  	predict_data = {};
		  	ret = pred.track_next(masat,geo,predict_data,pred.current_daynum() + i /1000);
		  	
		  	var myLatlng = new google.maps.LatLng(predict_data.lat,predict_data.lon);
		  	plan.push(myLatlng);
		  	/*
		  	var marker = new google.maps.Marker({
		    	position: myLatlng,
		    	map: map,
		    	title:"Hello World!"
				});*/
  		}
	  	var marker = new google.maps.Marker({
	    	position: plan[0],
	    	map: map,
	    	title:"Hello World!"
  		});
  		
		  var flightPath = new google.maps.Polyline({
				path: plan,
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 2,
				map : map
			});
	}
