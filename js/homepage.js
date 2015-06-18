//Parse initialize
Parse.initialize("zq26lP7dyXL0SyvJ1SOyDjUwn27O9Wxa3eFehdi7", "nrMNihVPIxOwlls7NJD6CtYsfpnxRiP0xXsIGP6T");

//query function

var queryCat = function (depend,owl) {
  var Exhibition=Parse.Object.extend("Exhibition");
  var query=new Parse.Query(Exhibition);
  query.equalTo("Catgory",depend);
  query.ascending("Catgory");
  query.find({
    success:function(result){
      for(var i=0;i<result.length;i++){
        var object=result[i];
        var sdate=object.get('Start');
        var edate=object.get('End');
        var content='<div class=\"owl-item item\" id=\"'+object.id+'\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"'+object.get('img')+'\"><h4>'+object.get('Name')+'</h4><p><i class=\"fa fa-map-marker\"></i>'+object.get('Place')+'</br><i class=\"fa fa-calendar\"></i>'+sdate.getFullYear().toString()+'/'+(sdate.getMonth()+1).toString()+'/'+sdate.getDate().toString()+'~'+edate.getFullYear().toString()+'/'+(edate.getMonth()+1).toString()+'/'+edate.getDate().toString()+'</br><i class=\"fa fa-thumbs-o-up\"></i> 55309</br></p></div>';
        console.log(content);
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
    
    owl.owlCarousel();
    owl2.owlCarousel();

    
    queryCat("Art",owl);
    queryCat("Art",owl2);
    owl2.trigger('destroy.owl.carousel');
    owl.trigger('destroy.owl.carousel');
    owl2.owlCarousel({
        items: 4,
    });
    owl.owlCarousel({

        loop:true,
        items: 4,
    });
    $(".owl-stage div:first-child").remove();

    $(".comment.next").mouseover(function() {
        for (var i = 0; i < 5; i++) {
            owl.trigger('next.owl.carousel',[2000]);
        }
    })


    $(".comment.prev").hover(function() {
      for(var i=0;i<3;i++){
        owl.trigger('prev.owl.carousel',[2000]);
      }
    })


    $(".high.next").mouseover(function() {
        for (var i = 0; i < 3; i++) {
            owl2.trigger('next.owl.carousel',[2000]);
        }
    })

    $(".high.prev").mouseover(function() {
        for (var i = 0; i < 3; i++) {
            owl2.trigger('prev.owl.carousel',[2000]);
        }
    })

    $('#myModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.attr('id');
  var modal = $(this);
  var Exhibition=Parse.Object.extend("Exhibition");
  var query=new Parse.Query(Exhibition);
  query.equalTo("objectId",recipient);
  query.find({
    success:function(result){
        var object=result[0];
        var sdate=object.get('Start');
        var edate=object.get('End');
        $('.modal-title').text(object.get('Name'));
        $('#place>i').text(object.get('Place'));
        $('.real-pic>img').attr('src',object.get('Real_pic'));
        console.log(sdate.getFullYear().toString());
        $('#time>i').text(sdate.getFullYear().toString()+'/'+sdate.getMonth().toString()+'/'+sdate.getDate().toString()+'~'+edate.getFullYear().toString()+'/'+edate.getMonth().toString()+'/'+edate.getDate().toString());
    },
    error:function(error){
      console.log(error.message);
    }
  });
 
})

});
