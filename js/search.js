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



function EasySearch(event) {
    event.preventDefault();
    var Exhibition = Parse.Object.extend("Exhibition");
    var query = new Parse.Query(Exhibition);
    var key = $('.easysearch').val();
    key = decodeURI(key);
    console.log(key);
    query.matches('Name', ".*" + key + ".*");
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
                var content = '<div class=\"item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i>' + result[i].get('like') + '</br></p></div>';
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
    var qstring = window.location.search;
    console.log(window.location.search);
    if (qstring.length > 0) {
        qstring = qstring.slice(1);
        $('.easysearch').val(qstring);
        document.getElementById("easybutton").click();
    }

    $('.profile').on('click', function() {
        $('.self-pic>img').attr("src", "images/big.jpg");
        var currentUser = Parse.User.current();
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                FB.api('/me/picture?type=large', function(response) {
                    $('.self-pic>img').attr("src", response.data.url);
                });
            }
        });

    })

    $('#proModal').on('show.bs.modal', function(event) {
        console.log('display!!!');
        $('.collected *').remove();
        var Collection = Parse.Object.extend("Collection");
        var query = new Parse.Query(Collection);
        query.include("Exhibition");
        query.include("User");
        query.equalTo('User', Parse.User.current());
        query.find({
            success: function(result) {
                for (var i = 0; i < result.length; i++) {
                    $('.collected').append('<li class="ccc">' + result[i].get('Exhibition').get('Name') + '</li>');
                }
            },
            error: function(error) {
                console.log(error.message);
            }
        });

    })

    $('#ccsubmit').on('click', function(event) {
        event.preventDefault();
        if ($('textarea').val().length === 0) {
            alert('請輸入留言內容');
            return;
        }
        if (Parse.User.current()) {
            var Comment = Parse.Object.extend("Comment");
            var Exhibition = Parse.Object.extend("Exhibition");
            var key = $('#myModal>.modal-dialog').attr('id');
            var ex = new Exhibition();
            ex.id = key;
            var obj = new Comment();
            obj.set("User", Parse.User.current());
            obj.set("Exhibition", ex);
            obj.set("Comment", $('textarea').val());
            obj.save(null, {
                success: function(obj) {
                    alert('留言成功!');
                    $('textarea').val('');
                    var Comment = Parse.Object.extend('Comment');
                    var queryc = new Parse.Query(Comment);
                    var ex = new Exhibition();
                    ex.id = $('#myModal>.modal-dialog').attr('id');
                    queryc.include('Exhibition');
                    queryc.equalTo('Exhibition', ex);
                    queryc.descending("updatedAt");
                    queryc.find({
                        success: function(result) {
                            $('.cc3 *').remove();
                            var dic = result.length < 3 ? result.length : 3;
                            for (var i = 0; i < dic; i++) {
                                $('.cc3').append('<div class="cc3s">' + '“' + result[i].get('Comment') + '”' + '</div>');
                            }
                        },
                        error: function(error) {
                            console.log(error.message);
                        }
                    });
                },
                error: function(obj, error) {
                    console.log(error);
                    alert('留言失敗!');
                }
            });
        } else {
            alert('請先登入');
            window.location = "logIn.html"
        }
    })

    $('#collect').on('click', function() {
        if (Parse.User.current()) {
            var key = $('#myModal>.modal-dialog').attr('id');
            var Exhibition = Parse.Object.extend("Exhibition");
            var Collection = Parse.Object.extend("Collection");
            var row = new Collection();
            var ex = new Exhibition();
            ex.id = key;
            row.set("User", Parse.User.current());
            row.set("Exhibition", ex);
            row.save(null, {
                success: function(row) {
                    alert('收藏成功!');
                },
                error: function(row, error) {
                    console.log(error);
                    alert('收藏失敗');
                }
            });
        } else {
            alert('請先登入');
            window.location = "logIn.html";
        }
    })

    $('#myModal').on('show.bs.modal', function(event) {
    	$('#liking').removeAttr('disabled');
    	$('#intro').parent().addClass("active");
    	$('#ccsubmit').parent().removeClass("active");
    	      $('.button1').addClass("active");
      $('.button2').removeClass("active");
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.attr('id');
        $('#myModal>.modal-dialog').attr('id', recipient);
        var modal = $(this);
        var Exhibition = Parse.Object.extend("Exhibition");
        var query = new Parse.Query(Exhibition);
        query.equalTo("objectId", recipient);
        query.find({
            success: function(result) {
                var object = result[0];
                var sdate = object.get('Start');
                var edate = object.get('End');
                $('#myModalLabel').text(object.get('Name'));
                console.log(object.get('Name'));
                console.log($('#myModalLabel').text());
                $('#place>i').text(object.get('Place'));
                $('.real-pic>img').attr('src', object.get('Real_pic'));
                $('#intro>span').html(object.get('Intro'));
                $('#like>i').text(object.get('like'));
                $('#price>i').text(object.get('Price'));
                $('#time>i').text(sdate.getFullYear().toString() + '/' + sdate.getMonth().toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + edate.getMonth().toString() + '/' + edate.getDate().toString());
            },
            error: function(error) {
                console.log(error.message);
            }
        });
        var Comment = Parse.Object.extend('Comment');
        var queryc = new Parse.Query(Comment);
        var ex = new Exhibition();
        ex.id = recipient;
        queryc.include('Exhibition');
        queryc.equalTo('Exhibition', ex);
        queryc.descending("updatedAt");
        queryc.find({
            success: function(result) {
                $('.cc3 *').remove();
                var dic = result.length < 3 ? result.length : 3;
                for (var i = 0; i < dic; i++) {
                    $('.cc3').append('<div class="cc3s">' + '“' + result[i].get('Comment') + '”' + '</div>');
                }
            },
            error: function(error) {
                console.log(error.message);
            }
        });

    })

    if (currentUser) {
        $('.login').hide();
        $('.logout').show();
    } else {
        $('.login').show();
        $('.logout').hide();
    }

    $('.logout').on('click', function(e) {
        e.preventDefault();
        Parse.User.logOut();
        FB.logout(function(response) {});
        alert("登出成功");
        $('.logout').hide();
        window.location = "index.html";
    })

    $('#liking').on('click', function(event) {
        if (Parse.User.current()) {
            $('#liking').attr('disabled', false);
            var key = $('#myModal>.modal-dialog').attr('id');
            var Exhibition = Parse.Object.extend("Exhibition");
            var query = new Parse.Query(Exhibition);
            query.equalTo('objectId', key);
            query.find({
                success: function(result) {
                    console.log(result[0].get('like'));
                    var likenum = result[0].get('like');
                    likenum++;
                    $('#like>i').text(likenum);
                    $('#' + key + ' .fa-thumbs-o-up').text('');
                    $('#' + key + ' .fa-thumbs-o-up').text(likenum);
                    result[0].set('like', likenum);
                    result[0].save(null, {
                        success: function(item) {
                            console.log('save success');
                            $('#liking').attr('disabled', true);
                        },
                        error: function(item, error) {
                            console.log(error.message);
                        }
                    })
                },
                error: function(error) {
                    console.log(error.message);
                }
            });

        } else {
            alert('請先登入');
            window.location = "logIn.html";
        }

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
                    var content = '<div class=\"item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i>' + object.get('like') + '</br></p></div>';
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
        var name = $('.nameinput').val();
        var day = new Date();
        var test = new Date(2000, 7, 20);
        if (name.length !== 0) {
            query.matches('Name', ".*" + name + ".*");
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
                    var content = '<div class=\"item\" id=\"' + object.id + '\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"' + object.get('img') + '\"><h4>' + object.get('Name') + '</h4><p><i class=\"fa fa-map-marker\"></i>' + object.get('Place') + '</br><i class=\"fa fa-calendar\"></i>' + sdate.getFullYear().toString() + '/' + (sdate.getMonth() + 1).toString() + '/' + sdate.getDate().toString() + '~' + edate.getFullYear().toString() + '/' + (edate.getMonth() + 1).toString() + '/' + edate.getDate().toString() + '</br><i class=\"fa fa-thumbs-o-up\"></i> ' + result[i].get('like') + '</br></p></div>';
                    $(".containt").append(content);
                }
            },
            error: function(error) {
                console.log(error.message);
            }
        });

    });


});
