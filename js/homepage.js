//Parse initialize
Parse.initialize("zq26lP7dyXL0SyvJ1SOyDjUwn27O9Wxa3eFehdi7", "nrMNihVPIxOwlls7NJD6CtYsfpnxRiP0xXsIGP6T");

//query function

var queryCat = function (depend,owl) {
  var Exhibition=Parse.Object.extend("Exhibition");
  var query=new Parse.Query(Exhibition);
  query.equalTo("Catgory",depend);
  query.find({
    success:function(result){
      for(var i=0;i<result.length;i++){
        var object=result[i];
        var content='<div class=\"owl-item item\"><img src=\"'+object.get('img')+'\"><h4>'+object.get('Name')+'</h4><p><i class=\"fa fa-map-marker\"></i>'+object.get('Place')+'</br><i class=\"fa fa-calendar\"></i>'+object.get('Start_Date')+'~</br>'+object.get('End_Date')+'</br><i class=\"fa fa-thumbs-o-up\"></i> 55309</br></p></div>';
        owl.trigger('add.owl.carousel',[$(content)]);
        owl.trigger('refresh.owl.carousel');

      }
    },
    error:function(error){
      console.log(error.message);
    }
  });
}


// main function

$(document).ready(function() {

    var owl = $("#owl-comment");
    var owl2 = $("#owl-high");

    owl.owlCarousel({
        items: 3, //10 items above 1000px browser width
    });

    owl2.owlCarousel({
        items: 3,
    });

    queryCat("Art",owl2);


    // Custom Navigation Events
    $(".comment.next").mouseover(function() {
        for (var i = 0; i < 5; i++) {
            owl.trigger('next.owl.carousel');
        }
    })


    $(".comment.prev").hover(function() {
        owl.trigger('prev.owl.carousel');
    })


    $(".high.next").mouseover(function() {
        for (var i = 0; i < 5; i++) {
            owl2.trigger('next.owl.carousel');
        }
    })

    $(".high.prev").mouseover(function() {
        for (var i = 0; i < 5; i++) {
            owl2.trigger('prev.owl.carousel');
        }
    })

});
