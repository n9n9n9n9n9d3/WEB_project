//Parse initialize
Parse.initialize("zq26lP7dyXL0SyvJ1SOyDjUwn27O9Wxa3eFehdi7", "nrMNihVPIxOwlls7NJD6CtYsfpnxRiP0xXsIGP6T");


window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId: '1461518597495814',
        xfbml: true,
        version: 'v2.3'
    });
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.api('/me/picture?type=large', function(response) {
                $('.navbar-right').prepend("<img src = " + response.data.url + " crossorigin = \"anonymous\" id=preview1 / >");
            });
        }
    });

};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "http://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



var queryCat = function(depend, owl) {
    var Exhibition = Parse.Object.extend("Exhibition");
    var query = new Parse.Query(Exhibition);
    query.equalTo("Catgory", depend);
    query.ascending("Catgory");
    query.find({
        success: function(result) {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var object = result[i];
                var sdate = object.get('Start');
                var edate = object.get('End');
                var content = '<div class=\"owl-item item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i> 55309</br></p></div>';
                console.log(content);
                owl.trigger('add.owl.carousel', [$(content)]);
                owl.trigger('refresh.owl.carousel');

            }
        },
        error: function(error) {
            console.log(error.message);
        }
    });
}


// main function

$(document).ready(function() {

    var currentUser = Parse.User.current();
    var owl = $("#owl-comment");
    var owl2 = $("#owl-high");

    owl.owlCarousel();
    owl2.owlCarousel();


    queryCat("Design", owl);
    queryCat("CulturalRelic", owl2);
    owl2.trigger('destroy.owl.carousel');
    owl.trigger('destroy.owl.carousel');
    owl2.owlCarousel({
        items: 5,
        margin: 10,


    });
    owl.owlCarousel({
        items: 5,
    });
    $(".owl-stage div:first-child").remove();

    if (currentUser) {

        $('.profile').show();
        $('.login').hide();
        $('.logout').show();
        $('.profile').attr("id", currentUser.get('username'));
    } else {
        $('.profile').hide();
        $('.login').show();
        $('.logout').hide();
    }

    $('.profile').on('click', function() {
      $('.self-pic>img').attr("src","images/big.jpg");
        var currentUser = Parse.User.current();
        FB.getLoginStatus(function(response) {
          console.log(response);
            if (response.status === 'connected') {
                FB.api('/me/picture?type=large', function(response) {
                    $('.self-pic>img').attr("src",response.data.url);
                });
            }
        });

    })


    $('.logout').on('click', function(e) {
        e.preventDefault();
        Parse.User.logOut();
        FB.logout(function(response) {});
        alert("登出成功");
        $('.logout').hide();
        window.location = "index.html";
    })



    $(".comment.next").mouseover(function() {
        for (var i = 0; i < 5; i++) {
            owl.trigger('next.owl.carousel', [2000]);
        }
    })


    $(".comment.prev").hover(function() {
        for (var i = 0; i < 3; i++) {
            owl.trigger('prev.owl.carousel', [2000]);
        }
    })


    $(".high.next").mouseover(function() {
        for (var i = 0; i < 3; i++) {
            owl2.trigger('next.owl.carousel', [2000]);
        }
    })

    $(".high.prev").mouseover(function() {
        for (var i = 0; i < 3; i++) {
            owl2.trigger('prev.owl.carousel', [2000]);
        }
    })

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
                $('#mymodal .modal-title').text(object.get('Name'));
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

    })


    $('.nav .dropdown-menu a').on('click', function(event) {
        var button = $(event.currentTarget);
        $('.containt *').remove();
        $('.containt').append('<p class=\"topic\"><i class=\"fa fa-university\"></i>' + button.text() + '</p><hr>');
        var cat = button.attr('id');
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

    $('.easybutton').on('click', function(e) {
        e.preventDefault();
        var key = $('.easysearch').val();
        var link = 'search.html?' + key;
        console.log(link);
        window.location = link;
    })



});
