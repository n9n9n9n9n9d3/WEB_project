Parse.initialize("zq26lP7dyXL0SyvJ1SOyDjUwn27O9Wxa3eFehdi7", "nrMNihVPIxOwlls7NJD6CtYsfpnxRiP0xXsIGP6T");


  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
      //appId: '1461518597495814',
      //xfbml: true,
      //version: 'v2.3'
      appId      : '392550567607968',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


function fblogin(){
			Parse.FacebookUtils.logIn(null, {
			  success: function(user) {
			    if (!user.existed()) {
			      alert("註冊完成並且透過臉書登入");
			    } else {
			      alert("透過臉書登入成功");
			    }
			    window.location="index.html";
			  },
			  error: function(user, error) {
			    alert("使用者取消登入或沒有授權");
			  }
			});
		}
