Parse.initialize("zq26lP7dyXL0SyvJ1SOyDjUwn27O9Wxa3eFehdi7", "nrMNihVPIxOwlls7NJD6CtYsfpnxRiP0xXsIGP6T");
$(document).ready(function() {


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
                $('#time>i').text(sdate.getFullYear().toString() + '/' + sdate.getMonth().toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + edate.getMonth().toString() + '/' + edate.getDate().toString());
            },
            error: function(error) {
                console.log(error.message);
            }
        });

    });


    $('.search-submit').on("click", function() {
        var Exhibition = Parse.Object.extend("Exhibition");
        var query = new Parse.Query(Exhibition);
        var time = $('.time-select option:selected').attr('value');
        var place = $('.place-select option:selected').attr('value');
        var area = $('.area-select option:selected').attr('value');
        var cat = $('.cat-select option:selected').attr('value');
        var day = new Date();
        var test = new Date(2000, 7, 20);

        switch (time) {
            case "on":
                query.greaterThan("End", day);
                query.lessThan("Start", day);
                break;
            case "passed":
            	query.lessThan("End",day);
            	day.setDate(day.getDate()+20);
            	console.log(day);
            	break;
            case "week":
            	query.greaterThan("Start",day);
            	day.setDate(day.getDate()+7);
            	query.lessThan("Start",day);
            	break;
            case "month":
            	var day2= new Date(day);
            	day2.setDate(day2.getDate()+7);
            	console.log(day2+"xxxx");
            	query.greaterThan("Start",day2);
            	day.setMonth(day.getMonth()+1);
            	console.log(day);
            	query.lessThan("Start",day);
            	break;
            case"more":
            	day.setMonth(day.getMonth()+1)
            	query.greaterThan("Start",day);
            default:
                break;
        }


        query.find({
            success: function(result) {
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
