function isValidEmail(a){return/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,5})$/.test(a)}function isValidName(a){return void 0!=a&&2<=a.length}function isValidSubdomain(a){return/^[0-9a-z][0-9a-z-]{1,18}[0-9a-z]$/i.test(a)}$(function(){$("select, input:checkbox, input:radio, input:file").uniform();$(":button").addClass("btn");$(":submit").addClass("btn");$("form").removeClass("quickform")});function submitForm(){var a=$("form");null!=a&&a.submit&&a.submit();return!1}
function submit(){var a=$("#email").val();validateForm()&&($("#form :input").each(function(){$(this).attr("disabled",!0)}),$.ajax({type:"POST",url:"/lead",data:{email:a},success:function(){_gaq.push(["_trackPageview","/process-form-complete"]);$("#form").fadeOut(500,function(){$("#form").html("<p id='thanks'><span class=\"underline\">Thanks for your interest!</span> You are now on our list and you will soon receive an invite code. Once your account is ready, we will provide you with additional information and details. We keep you informed.</p>");
$("#form").fadeIn(500)})}}))}function validateForm(){return validateItem("email",isValidEmail)}function validateAppForm(){return validateItem("subdomain",isValidSubdomain)&&validateItem("description",isValidName)&&validateItem("coupon",isValidName)}function validateDBForm(){return validateItem("dbname",isValidName)}function validateItem(a,b){var c=$("#"+a),d=c.val();if(b(d))return $(c).removeClass("error"),!0;$(c).addClass("error");return!1}var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-276011-5"]);
_gaq.push(["_setDomainName",".cloudno.de"]);_gaq.push(["_trackPageview"]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();
function tab(a){var b=$("li#"+a.hash).siblings();b.each(function(a){""!=b[a].id&&($(b[a].firstChild).removeClass("selected"),$("div#"+b[a].id).addClass("hidden"))});$(a).addClass("selected");$("div"+a.hash).removeClass("hidden");return!1}function addPill(a){$("div."+a).removeClass("hidden");return!1}function closePill(a){$("div."+a).addClass("hidden");return!1}function validate(a){var b=a.val();if(isValidName(b))$(a).removeClass("error");else return $(a).addClass("error"),!1;return!0}
function submitKey(){var a=$("#keyname"),b=$("#sshkey");if(!validate(a)||!validate(b))return!1;$("form :input").each(function(){$(this).attr("disabled",!0)});$.post("/account",{keyname:a.val(),sshkey:b.val()},function(a){a.success?window.location="/account?ssh":alert(a.status);$("form :input").each(function(){$(this).attr("disabled",!1)})},"json")}
function removeKey(a){if(!confirm('Are you sure you want to delete the public SSH key for "'+a+'" ?'))return!1;$.post("/api/removekey",{keyname:a},function(a){a.success?window.location="/account?ssh":alert(a)},"json");return!1}function deleteDB(a){if(!confirm('Are you sure you want to delete the database "'+a+'" ?'))return!1;$.post("/api/deletedb",{dbname:a},function(a){a.success?window.location="/database":alert(a.status)},"json");return!1}
function submitProfile(){var a=$("#publicemail"),b=$("#website"),c=$("#company"),d=$("#location");if(a.val()&&!validateItem("publicemail",isValidEmail)||b.val()&&!validateItem("website",isValidName)||c.val()&&!validateItem("company",isValidName)||d.val()&&!validateItem("location",isValidName))return!1;a.attr("disabled",!0);b.attr("disabled",!0);c.attr("disabled",!0);d.attr("disabled",!0);$.post("/api/profile",{email:a.val(),website:b.val(),company:c.val(),location:d.val()},function(e){e.success&&
($(".inline-msg").removeClass("hidden"),a.attr("disabled",!1),b.attr("disabled",!1),c.attr("disabled",!1),d.attr("disabled",!1),$("span#bar").width($("span#bar").width()+10),setTimeout(function(){$(".inline-msg").addClass("hidden")},3E3))},"json")}
function submitBio(){var a=$("#biotext");if(!validateItem("biotext",isValidName))return!1;$("#biotext").attr("disabled",!0);$.post("/api/bio",{bio:a.val()},function(a){a.success&&($(".inline-msg").removeClass("hidden"),$("#biotext").attr("disabled",!1),$("span#bar").width($("span#bar").width()+10),setTimeout(function(){$(".inline-msg").addClass("hidden")},3E3))},"json")}
function controlApp(a,b){$.ajax({type:"POST",url:"/api/control/"+a,data:{running:b},success:function(a){"success"==a?window.location.reload():alert(a)}})}function deleteApp(a){confirm('Are you sure you want to delete the app "'+a+' and its repository"? This action cannot be undone.')&&$.ajax({type:"POST",url:"/api/deleteapp/"+a,data:{},success:function(a){"success"==a?window.location="/myapps":alert(a)}})}
function getLog(a){$.ajax({type:"GET",url:"/api/applogs/"+a,dataType:"json",data:{},success:function(a){if(a.success){var c="<h4>Application Log</h4><br />",d;for(d in a.lines)c+=a.lines[d]+"<br/>";$("#log").html(c)}else alert(a.success)}})}function getEnv(a){$.ajax({type:"GET",url:"/api/env/"+a,dataType:"json",data:{},success:function(a){if("success"==a.status){var c="<h4>Environment</h4><br />",d;for(d in a.message)c+=d+" = "+a.message[d]+"<br/>";$("#log").html(c)}else alert(a.success)}})}
function getCoupon(){$.get("/api/coupon",function(a){a.success?$("#coupon").val(a.coupon):alert("No coupons left, please retry in a few days.")},"json")}function deleteUser(a,b){confirm('Are you sure you want to delete the account "'+a+"? This action cannot be undone.")&&$.ajax({type:"POST",url:"/api/deleteuser",data:{id:b},success:function(a){"success"==a?window.location="/admin/userlist":alert(a)}})}
function gitWeb(a){a=a.substr(30);window.location="http://gitweb.cloudno.de/git-web/gitweb.cgi?p="+a;return!1};