Parse.initialize("zq26lP7dyXL0SyvJ1SOyDjUwn27O9Wxa3eFehdi7", "nrMNihVPIxOwlls7NJD6CtYsfpnxRiP0xXsIGP6T");




	function EasySearch(event){
		event.preventDefault();
		var Exhibition = Parse.Object.extend("Exhibition");
		var query = new Parse.Query(Exhibition);
		var key=$('.easysearch').val();
		key=decodeURI(key);
		console.log(key);
		query.matches('Name',".*"+key+".*");
		query.find({
            success: function(result) {
            	console.log(result);
            	$(".containt>.item").remove();
                if (result.length === 0) {
                    alert('No match exhibition found');
                    return;
                }
                console.log(result);
                $(".containt>.item").remove();
                for (var i = 0; i < result.length; i++) {
                    var object = result[i];
                    var sdate = object.get('Start');
                    var edate = object.get('End');
                    var content = '<div class=\"item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i> 55309</br></p></div>';
                    $(".containt").append(content);
                }
            },
            error: function(error) {
                console.log(error.message);
            }
        })
}

$(document).ready(function() {
	var currentUser = Parse.User.current();
	  var qstring=window.location.search;
	  console.log(window.location.search);
	  if(qstring.length>0){
	  	qstring=qstring.slice(1);
	  	$('.easysearch').val(qstring);
	  	document.getElementById("easybutton").click();
	  }


    $('#myModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.attr('id');
        var modal = $(this);
        var Exhibition = Parse.Object.extend("Exhibition");
        var query = new Parse.Query(Exhibition);
        query.equalTo("objectId", recipient);
        query.find({
            success: function(result) {
                var object = result[0];
                var sdate = object.get('Start');
                var edate = object.get('End');
                $('.modal-title').text(object.get('Name'));
                $('#place>i').text(object.get('Place'));
                $('.real-pic>img').attr('src', object.get('Real_pic'));
                console.log(sdate.getFullYear().toString());
                $('#intro>span').html(object.get('Intro'));                
                $('#time>i').text(sdate.getFullYear().toString() + '/' + sdate.getMonth().toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + edate.getMonth().toString() + '/' + edate.getDate().toString());
            },
            error: function(error) {
                console.log(error.message);
            }
        });

    });

	if(currentUser){
      $('.login').hide();
      $('.logout').show();
    }
    else{
      $('.login').show();
      $('.logout').hide();
    }

    $('.logout').on('click',function(e){
      e.preventDefault();
      Parse.User.logOut();
      FB.logout(function(response) {});
      alert("登出成功");
      $('.logout').hide();
      window.location="index.html";
    })


	$('.nav .dropdown-menu a').on('click',function(event){
		var button = $(event.currentTarget);
		$('.containt *').remove();
		$('.containt').append('<p class=\"topic\"><i class=\"fa fa-university\"></i>'+button.text()+'</p><hr>');
		var cat=button.attr('id');
		console.log(cat);
		var Exhibition = Parse.Object.extend("Exhibition");
    	var query = new Parse.Query(Exhibition);
   		query.equalTo("Catgory", cat);
    	query.ascending("Start");
    query.find({
        success: function(result) {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var object = result[i];
                var sdate = object.get('Start');
                var edate = object.get('End');
                var content = '<div class=\"item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i> 55309</br></p></div>';
                $('.containt').append(content);
                console.log(content);
            }
        },
        error: function(error) {
            console.log(error.message);
        }
	});
});



    $('.search-submit').on("click", function() {
        $('.containt>h1').text('Search Result');

        var Exhibition = Parse.Object.extend("Exhibition");
        var query = new Parse.Query(Exhibition);
        var time = $('.time-select option:selected').attr('value');
        var area = $('.area-select option:selected').attr('value');
        var cat = $('.cat-select option:selected').attr('value');
        var name= $('.nameinput').val();
        var day = new Date();
        var test = new Date(2000, 7, 20);
        if(name.length!==0){
        	query.matches('Name',".*"+name+".*");
        }

        switch (time) {
            case "on":
                query.greaterThan("End", day);
                query.lessThan("Start", day);
                break;
            case "passed":
                query.lessThan("End", day);
                day.setDate(day.getDate() + 20);
                console.log(day);
                break;
            case "week":
                query.greaterThan("Start", day);
                day.setDate(day.getDate() + 7);
                query.lessThan("Start", day);
                break;
            case "month":
                var day2 = new Date(day);
                day2.setDate(day2.getDate() + 7);
                console.log(day2 + "xxxx");
                query.greaterThan("Start", day2);
                day.setMonth(day.getMonth() + 1);
                console.log(day);
                query.lessThan("Start", day);
                break;
            case "more":
                day.setMonth(day.getMonth() + 1)
                query.greaterThan("Start", day);
            default:
                break;
        }

        switch (area) {
            case '1':
                query.equalTo("Area", 1);
                console.log('north');
                break;
            case '2':
                query.equalTo("Area", 2);
                break;
            case '3':
                query.equalTo("Area", 3);
                break;
            case '4':
                query.equalTo("Area", 4);
                break;
            default:
                break;
        }

        if (cat !== "none") {
            query.equalTo("Catgory".cat);
        }




        query.find({
            success: function(result) {
            	$(".containt>.item").remove();
                if (result.length === 0) {
                    alert('No match exhibition found');
                    return;
                }
                console.log(result);
                $(".containt>.item").remove();
                for (var i = 0; i < result.length; i++) {
                    var object = result[i];
                    var sdate = object.get('Start');
                    var edate = object.get('End');
                    var content = '<div class=\"item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i> 55309</br></p></div>';
                    $(".containt").append(content);
                }
            },
            error: function(error) {
                console.log(error.message);
            }
        });

    });


});
