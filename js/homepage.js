$(document).ready(function() {
 
  var owl = $("#owl-example");
 
  owl.owlCarousel({
      items : 3, //10 items above 1000px browser width
  });
 
  // Custom Navigation Events
  $(".next").hover(function(){
    owl.trigger('next.owl.carousel');
  })
  $(".prev").hover(function(){
    owl.trigger('prev.owl.carousel');
  })
  
 
});