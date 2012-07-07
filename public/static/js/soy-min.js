// This file was automatically generated from cloudnode.soy.
// Please don't edit this file by hand.

if (typeof cloudnode == 'undefined') { var cloudnode = {}; }
if (typeof cloudnode.global == 'undefined') { cloudnode.global = {}; }


cloudnode.global.startPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content">');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.endPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('</div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.page = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>', soy.$$escapeHtml(opt_data.title), '</h1><div class="subhead">', soy.$$escapeHtml(opt_data.subTitle), '</div><div class="post">', opt_data.html, '</div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.buttonBar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="qfbuttondiv">', (opt_data.status != 'empty') ? '<a id="start" class="btn" onclick="controlApp(\'' + soy.$$escapeHtml(opt_data.appName) + '\', true)" label="Start" href="#">Start</a><a id="stop" class="btn" onclick="controlApp(\'' + soy.$$escapeHtml(opt_data.appName) + '\', false)" label="Stop" href="#">Stop</a>' : '', '<a id="manage" class="btn" label="Manage" href="/myapps/', soy.$$escapeHtml(opt_data.appName), '">Manage</a>', (opt_data.gitrepo) ? '<a href="#" class="btn" onclick="gitWeb(\'' + soy.$$escapeHtml(opt_data.gitrepo) + '\'); return false;" label="Git-Web">Git-Web</a>' : '', '</div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.appPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Applications</h1><div class="subhead" style="float:left;">Your Apps at Cloudnode</div><div class="qfbuttondiv" style="float:right; margin-top: -20px;"><a id="newapp" class="btn" label="New Application" href="/myapps?new">New Application</a></div><div class="clear"></div><div class="app-container"><ul class="apps">');
  var appList38 = opt_data.apps;
  var appListLen38 = appList38.length;
  for (var appIndex38 = 0; appIndex38 < appListLen38; appIndex38++) {
    var appData38 = appList38[appIndex38];
    output.append('<li><div class="manage">');
    switch (appData38.running) {
      case 'true':
        output.append('<a  style="float: left; padding-left: 12px; margin-right: 10px;" href="http://', soy.$$escapeHtml(appData38.name), '.cloudno.de">', soy.$$escapeHtml(appData38.name), '</a>');
        break;
      case 'empty':
        output.append('<span style="float: left; padding-left: 12px; margin-right: 10px;">', soy.$$escapeHtml(appData38.name), ' - repository is empty</span>');
        break;
      default:
        output.append('<span style="float: left; padding-left: 12px; margin-right: 10px;">', soy.$$escapeHtml(appData38.name), ' - Running: ', soy.$$escapeHtml(appData38.running), '</span>');
    }
    cloudnode.global.buttonBar({appName: appData38.name, gitrepo: appData38.gitrepo, status: appData38.running}, output);
    output.append('<div class="clear"></div></div></li>');
  }
  output.append('</ul></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.newAppPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Provision a New VM</h1><div class="subhead">Select a datacenter and application type</div><div class="post">', opt_data.html, '</div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.appDetailPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Application</h1><div class="subhead">', soy.$$escapeHtml(opt_data.appName), '</div>', (opt_data.message) ? '<div class="post" style="margin-bottom: 15px;">' + opt_data.message + '</div>' : '', '<div class="header"><b>Details</b></div><div class="group"><div class="detail"><dl><dt>Boot File</dt><dd>', soy.$$escapeHtml(opt_data.appInfo.start), '</dd></dl><dl><dt>Repository</dt><dd>', soy.$$escapeHtml(opt_data.appInfo.gitrepo), '</dd></dl><dl><dt>Internal Port</dt><dd>', soy.$$escapeHtml(opt_data.appInfo.port), '</dd></dl><dl><dt>Running State</dt><dd>', soy.$$escapeHtml(opt_data.appInfo.running), '</dd></dl><dl><dt>Process ID</dt><dd>', soy.$$escapeHtml(opt_data.appInfo.pid), '</dd></dl><dl><dt>Status</dt><dd>', soy.$$escapeHtml(opt_data.appInfo.status), '</dd></dl>', (opt_data.addInfo) ? '<dl><dt>Data Center</dt><dd>' + soy.$$escapeHtml(opt_data.addInfo.center) + '</dd></dl><dl><dt>Application Type</dt><dd>' + soy.$$escapeHtml(opt_data.addInfo.type) + '</dd></dl><dl><dt>Description</dt><dd>' + soy.$$escapeHtml(opt_data.addInfo.description) + '</dd></dl><dl><dt>Public Access</dt><dd>' + soy.$$escapeHtml(opt_data.addInfo.publicApp) + '</dd></dl><dl><dt>Author</dt><dd>' + soy.$$escapeHtml(opt_data.addInfo.author) + '</dd></dl><dl><dt>Created On</dt><dd>' + soy.$$escapeHtml(opt_data.addInfo.created) + '</dd></dl>' : '', '</div><div style="margin-left: 220px; margin-top: 9px;">', (opt_data.appInfo.running != 'empty') ? '<a href="#" class="btn" onclick="controlApp(\'' + soy.$$escapeHtml(opt_data.appName) + '\', true)">Start</a><a href="#" class="btn" onclick="controlApp(\'' + soy.$$escapeHtml(opt_data.appName) + '\', false)">Stop</a><a href="#" class="btn" onclick="getLog(\'' + soy.$$escapeHtml(opt_data.appName) + '\'); return false;">Get Log</a><a href="#" class="btn" onclick="getEnv(\'' + soy.$$escapeHtml(opt_data.appName) + '\'); return false;">Get Env</a>' : '', '<a href="#" class="btn" onclick="gitWeb(\'', soy.$$escapeHtml(opt_data.appInfo.gitrepo), '\')">Git-Web</a><a href="#" class="btn" onclick="deleteApp(\'', soy.$$escapeHtml(opt_data.appName), '\')">Delete App</a></div><div style="clear: both; color: black; margin: 48px 15px 0 15px; border-top: 1px solid #ddd;"><pre id="log"></pre></div></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.accountPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Account Settings</h1><div class="subhead">Your Account at cloudnode</div><div class="post">', opt_data.html);
  cloudnode.global.sidetabs({form: opt_data.form._text, avatar: opt_data.avatar, user: opt_data.user, active: opt_data.active, complete: opt_data.complete}, output);
  output.append('</div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.signupPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Signup</h1><div class="subhead">Create an account at Cloudnode</div>', (opt_data.user) ? '<h4 class="message">OpenID verified! Your new account will be associated with this ID.</h4>' : '<h4 class="error-msg">OpenID not verified! Please sign in using a verified OpenID.</h4>', (! opt_data.validEmail) ? '<h4 class="error-msg">Email address is not valid.</h4>' : '', (! opt_data.validName) ? '<h4 class="error-msg">User name is not valid.</h4>' : '', '<small>*Please add required fields.</small><div class="qfcontainer"><div class="callout"><div class="header"><h2>Create Cloudnode Account</h2></div><div class="group">', opt_data.form, '</div></div></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.welcomePage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Welcome At Cloudnode</h1><div class="subhead">Your account is now ready to use</div>From here you can manage your account and your applications. During the beta phase<br/>you will need a coupon code to provision a new App and a new Node VM. Make sure to<br/>read the <a href="http://docs.cloudno.de/quick-start-guide">Quick Start Guide</a> to learn how to deploy an app using Git.<br/><br/>In the next step you should review your account settings and complete your account information.<br/>Especially make sure to upload your SSH public key and verify its fingerprint to make sure that<br/>you have access to the hosting platform.</br></br>Thanks for choosing Cloudnode.</div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.userExistsPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Account Exists</h1><div class="subhead">You already have an account at Cloudnode</div>You are now logged in into your existing account.<br/><br/>Thanks for returning.</div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.userNameTakenPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>User Name \'', soy.$$escapeHtml(opt_data.userName), '\' is Already Taken</h1><div class="subhead">Another user has already registered an account at Cloudnode using the name ', soy.$$escapeHtml(opt_data.userName), '.</div>You may have already registered an account using a different OpenID.<br/>If not, your need to configure your account at your OpenID provider to use a different user name.<br/>You can then repeat the steps to create an account at Cloudnode.<br/><br/>Sorry for the inconvenience.</div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.signinPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="widget"><h4>Sign In With Your OpenID</h4><ul class="providers"><li id="twitter" /></ul></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.signupBasicPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Sign up for Cloudnode Node.js Hosting Basic</h1><div class="subhead">Get started with Cloudnode hosting. You won\'t need to create a new username or password.</div>', (opt_data.invite == 'HkfsU6f') ? '<div class="left-col" style="height: 300px; margin-left: 80px; margin-top: 30px;"><h4>Sign up With your OpenID / OAuth account</h4><ul class="providers"><li id="google" onclick="window.location=\'/login/google\'"></li><li id="yahoo" onclick="window.location=\'/login/yahoo\'"></li><li id="twitter" onclick="window.location=\'/login/twitter\'"></li></ul></div>' : '<div style="width: 280px; opacity: 0.8; background-color: #1f1f1f; padding: 25px; position: absolute; z-index: 1000; color: white; font: bold 12px arial,sans-serif;">Cloudnode is currently in private beta. To stay updated as the project develops and to get an invite, join our beta. Hope to see you soon!<br/><br/>Thanks for your patience!<br/><br/><a href="/">Join the beta</a></div><div class="left-col" style="height: 300px; margin-left: 80px; margin-top: 30px;"><h4>Sign up With your OpenID / OAuth account</h4><ul class="providers"><li id="google"></li><li id="yahoo"></li><li id="twitter"></li></ul></div>', '<div class="right-col" style="right: 80px;"><div class="features" style="width: 380px;"><h3>Cloudnode Node.js Hosting Basic Features</h3><div class="rule"></div><ul class="features"><li>Completely free plan</li><li>Up to 3 VMs / applications</li><li>Support for custom domains</li><li>25 MB CouchDB space</li><li>250.000 request/month</li><li>Git source control</li></ul></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.adminLinks = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.adminPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Administration</h1><div class="subhead">Use these functions to administer the Cloudnode platform</div>');
  if (opt_data.user.isAdmin != '1') {
    output.append('<h4 class="error-msg">You need to be a member of the admin group to use this function!</h4>');
  } else {
    switch (opt_data.func) {
      case 'waitlist':
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div><h2>Wait List</h2><table>');
        var leadList202 = opt_data.list;
        var leadListLen202 = leadList202.length;
        for (var leadIndex202 = 0; leadIndex202 < leadListLen202; leadIndex202++) {
          var leadData202 = leadList202[leadIndex202];
          output.append('<tr><td>', soy.$$escapeHtml(leadData202.email), '</td><td>', soy.$$escapeHtml(leadData202.stamp), '</td></tr>');
        }
        output.append('</table><div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        break;
      case 'userlist':
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        cloudnode.global.fancyTable({header: opt_data.header, columns: opt_data.columns, list: opt_data.list, links: opt_data.links, defwidth: 150}, output);
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        break;
      case 'sessionlist':
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        cloudnode.global.fancyTable({header: opt_data.header, columns: opt_data.columns, list: opt_data.list, links: opt_data.links, defwidth: 150, type: opt_data.func}, output);
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        break;
      case 'applist':
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        cloudnode.global.fancyTable({header: opt_data.header, columns: opt_data.columns, list: opt_data.list, links: opt_data.links, defwidth: 130, type: opt_data.func}, output);
        output.append('<div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div>');
        break;
      default:
        output.append('<ul><li><a href="http://monit.cloudno.de/">Monit Service Manager</a></li><li><a href="http://gitweb.cloudno.de/mrtg/">MRTG Index Page</a></li><li><a href="/admin/waitlist">Wait list</a></li><li><a href="/admin/userlist">User list</a></li><li><a href="/admin/sessionlist">Session list</a></li><li><a href="/admin/applist">Applications</a></li></ul>');
    }
  }
  output.append('</div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.databasePage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Databases</h1><div class="subhead" style="float: left">Your databases at Cloudnode</div><div class="qfbuttondiv" style="float:right; margin-top: -20px;"><a id="newdb" class="btn" label="New Database" href="/database?new">New Database</a></div><div class="clear"></div>');
  switch (opt_data.func) {
    case 'dblist':
      cloudnode.global.fancyTable({header: opt_data.header, columns: opt_data.columns, list: opt_data.list, links: opt_data.links, defwidth: 130, type: opt_data.func}, output);
      break;
    default:
  }
  output.append('</div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.newDBPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Create a New CouchDB Database</h1><div class="subhead">Enter a Unique Database / URL Name</div><div class="post">', opt_data.html, '</div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.dbDetailPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>CouchDB</h1><div class="subhead">Database Details</div><div class="header"><b>Database: ', soy.$$escapeHtml(opt_data.dbInfo.db_name), '</b></div><div class="group"><div class="detail"><dl><dt>Created:</dt><dd>', soy.$$escapeHtml(opt_data.dbMeta.created), '</dd></dl><dl><dt>User Name:</dt><dd>', soy.$$escapeHtml(opt_data.dbMeta.user), '</dd></dl><dl><dt>API Key:</dt><dd>', soy.$$escapeHtml(opt_data.dbMeta.apikey), '</dd></dl><dl><dt>Secure External URL:</dt><dd>https://', soy.$$escapeHtml(opt_data.dbMeta.user), ':', soy.$$escapeHtml(opt_data.dbMeta.apikey), '@cloudno.de/couchdb/', soy.$$escapeHtml(opt_data.dbInfo.db_name), '</dd></dl><dl><dt>Internal URL:</dt><dd>http://', soy.$$escapeHtml(opt_data.dbMeta.user), ':', soy.$$escapeHtml(opt_data.dbMeta.apikey), '@81.169.133.153:5984/', soy.$$escapeHtml(opt_data.dbInfo.db_name), '</dd></dl><dl><dt>Compact Running:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.compact_running), '</dd></dl><dl><dt>Doc Count:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.doc_count), '</dd></dl><dl><dt>Disk Size:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.disk_size), '</dd></dl><dl><dt>Disk Format Version:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.disk_format_version), '</dd></dl><dl><dt>Purge Seq:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.purge_seq), '</dd></dl><dl><dt>Instance Start Time:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.instance_start_time), '</dd></dl><dl><dt>Committed Update Seq:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.committed_update_seq), '</dd></dl><dl><dt>Doc Del Count:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.doc_del_count), '</dd></dl><dl><dt>Update Seq:</dt><dd>', soy.$$escapeHtml(opt_data.dbInfo.update_seq), '</dd></dl></div><div style="margin-left: 220px; margin-top: 10px;"><a href="/database" class="btn">Back</a><a href="/api/authdb?name=', soy.$$escapeHtml(opt_data.dbInfo.db_name), '" class="btn">View In Futon</a></div><div style="clear: both; margin: 48px 15px 0 15px;"></div></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.userDetailPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>User Info</h1><div class="subhead">', soy.$$escapeHtml(opt_data.userInfo.displayName), '</div><div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div><div class="header"><b>Account Details</b></div><div class="group"><div class="detail"><dl><dt>ID</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.id), '</dd></dl><dl><dt>OpenID</dt><dd>', soy.$$escapeHtml(opt_data.openID), '</dd></dl><dl><dt>Login IP</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.loginIP), '</dd></dl><dl><dt>Display Name</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.displayName), '</dd></dl><dl><dt>Full Name</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.first), ' ', soy.$$escapeHtml(opt_data.userInfo.last), '</dd></dl><dl><dt>Locale</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.lang), '</dd></dl><dl><dt>Provider</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.provider), '</dd></dl><dl><dt>E-Mail</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.email), '</dd></dl><dl><dt>API Key</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.apikey), '</dd></dl><dl><dt>SSH Key Name</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.sshKeyName), '</dd></dl><dl><dt>SSH Public Key</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.sshKey), '</dd></dl><dl><dt>Key Fingerprint</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.fingerPrint), '</dd></dl><dl><dt>Join Date</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.joinDate), '</dd></dl><dl><dt>Login Date</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.loginDate), '</dd></dl><dl><dt>Registered E-Mail</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.registeredEmail), '</dd></dl><dl><dt>User Name</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.userName), '</dd></dl><dl><dt>Public Email</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.publicEmail), '</dd></dl><dl><dt>Website</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.website), '</dd></dl><dl><dt>Company</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.company), '</dd></dl><dl><dt>Location</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.location), '</dd></dl><dl><dt>Bio</dt><dd>', soy.$$escapeHtml(opt_data.userInfo.bio), '</dd></dl></div><div style="margin-left: 220px; margin-top: 10px;"><a href="#" class="btn" onclick="deleteUser(\'', soy.$$escapeHtml(opt_data.userInfo.displayName), '\', \'', soy.$$escapeHtml(opt_data.openID), '\'); return false;">Delete Account</a><a href="#" class="btn" onclick="">Email User</a></div><div style="clear: both; margin: 48px 15px 0 15px;"></div></div><div style="margin-top: 10px; margin-bottom: 10px;"><a href="/admin/waitlist">Wait List</a> | <a href="/admin/userlist">Users</a> | <a href="/admin/sessionlist">Sessions</a> | <a href="/admin/applist">Applications</a></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.sessionDetailPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Session Info</h1><div class="subhead">', soy.$$escapeHtml(opt_data.sessionInfo.displayName), '</div><div class="header"><b>Session Details</b></div><div class="group"><div class="detail"><dl><dt>ID</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.id), '</dd></dl><dl><dt>SessionID</dt><dd>', soy.$$escapeHtml(opt_data.sessionID), '</dd></dl><dl><dt>Display Name</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.displayName), '</dd></dl><dl><dt>Login IP</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.loginIP), '</dd></dl><dl><dt>Provider</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.providerName), '</dd></dl><dl><dt>E-Mail</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.email), '</dd></dl><dl><dt>Login Date</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.loginDate), '</dd></dl><dl><dt>Identifier</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.identifier), '</dd></dl><dl><dt>User ID</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.userid), '</dd></dl><dl><dt>Full Name</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.fullname), '</dd></dl><dl><dt>Language</dt><dd>', soy.$$escapeHtml(opt_data.sessionInfo.lang), '</dd></dl></div></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.contactPage = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="page-container"><div class="page"><div id="page-inner-hilite"><div id="page-inner"><div class="padded content"><h1>Contact Us</h1><div class="subhead">Imprint</div>According to &sect; 6 of German Telecommunications Law<br /><br />Responsible editor and webmaster to the planning, implementation and maintenance of this<br />website and services as well as the administration (admin-c) of the domain cloudno.de is:<br /><br />Microlog GmbH, Salzstr. 4, 33178 Borchen, Germany<br /><br />USt-ID Nr.: DE126333381<br />Commercial register: Amtsgericht Paderborn, HRB 1982<br />represented by the CEO: Dipl.-Ing. H. Schroeder<br /><br />Phone Germany: +49 529 222-00, USA: +1 253 353-2832<br />', (! opt_data.validEmail) ? '<h4 class="error-msg">Email address is not valid.</h4>' : '', (! opt_data.validName) ? '<h4 class="error-msg">Name is not valid.</h4>' : '', (! opt_data.validMessage) ? '<h4 class="error-msg">Message is not valid.</h4>' : '', '<div class="qfcontainer"><div class="callout"><div class="header"><h2>Enter your feedback</h2></div><div class="group">', opt_data.form, '</div></div></div></div></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.user = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.user != null) ? '<div class="rpx_box2">Signed in as <span class="rpx_name">' + soy.$$escapeHtml(opt_data.user.displayName) + '</span>. <a href="/rpx/signout">Sign out</a>' : '<div class="rpx_box2">Sign in using:<a class="login-google" href="/login/google">Google</a><a class="login-yahoo" href="/login/yahoo">Yahoo</a><a class="login-twitter" href="/login/twitter">Twitter</a></div><div class="top_nav"><a href="/signup/basic">Sign up! </a><span class="free">Free</span>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.footer = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="footer-container"><div id="footer-text" class="footer">All code and programs belong to their respective creators.<br /><b>&#169; 2011 <a href="http://cloudno.de" title="Cloudnode Node.js Hosting"> Cloudnode</a>. All Rights Reserved. </b>Powered by <a href="http://github.com/dvbportal/nodester" title="Powered by Nodester">Nodester</a> (Cloudnode Fork) and <a href="http://github.com/dvbportal/appjet" title="Powered by AppJet">AppJet</a> <span style="font-size: 1.0em">&#9992;</span>. All pages are valid <a href="http://validator.w3.org/check/referer" title="Check valid XHTML 1.0">XHTML 1.0</a>. <span style="margin-left: 10px;"><a href="http://docs.cloudno.de/about" title="About Cloudnode">About</a> | <a href="/contact" title="Contact">Contact / Imprint</a> | <a href="#privacy" title="Privacy Policy">Privacy</a></span></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.header = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="header-container"><div class="top-header">');
  cloudnode.global.user(opt_data, output);
  output.append('</div><!-- div class="top_nav"><a href="http://status.cloudno.de">Status</a></div --></div>');
  if (opt_data.user != null) {
    cloudnode.global.navbar({active: opt_data.active, isAdmin: opt_data.user.isAdmin}, output);
  } else {
    cloudnode.global.navbar({active: opt_data.active, isAdmin: false}, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.navbar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="top-nav-outer"><div class="top-nav"><div class="top-nav-inner"><div id="logo"><a href="/"></a></div><div id="global-nav"><ul id="nav"><li id="global-nav-apps" ', (opt_data.active == 0) ? ' class="active"' : '', '><a href="/myapps">My Apps</a></li><li id="global-nav-database" ', (opt_data.active == 2) ? ' class="active"' : '', '><a href="/database">My Databases</a></li><li id="global-nav-account" ', (opt_data.active == 1) ? ' class="active"' : '', '><a href="/account">My Account</a></li><li id="global-nav-wiki"><a href="http://docs.cloudno.de">Docs</a></li><li id="global-nav-support"><a href="http://support.cloudno.de">Support</a></li><li id="global-nav-blog"><a href="http://blog.cloudno.de">Blog</a></li>', (opt_data.isAdmin == '1') ? '<li id="global-nav-admin" ' + ((opt_data.active == 5) ? ' class="active"' : '') + '><a href="/admin/">Admin</a></li>' : '', '</ul></div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.fancyTable = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="header"><b>', soy.$$escapeHtml(opt_data.header), '</b></div><div class="group"><div class="sub-header"><dl>');
  var columnList461 = opt_data.columns;
  var columnListLen461 = columnList461.length;
  for (var columnIndex461 = 0; columnIndex461 < columnListLen461; columnIndex461++) {
    var columnData461 = columnList461[columnIndex461];
    output.append((columnIndex461 == 0) ? '<dt><a href="?sortby=' + soy.$$escapeHtml(columnData461.key) + '">' + soy.$$escapeHtml(columnData461.name) + '</a></dt>' : ((opt_data.defwidth) ? '<dd style="width: ' + soy.$$escapeHtml(opt_data.defwidth) + 'px;">' : '<dd>') + '<a href="?sortby=' + soy.$$escapeHtml(columnData461.key) + '">' + soy.$$escapeHtml(columnData461.name) + '</a></dd>');
  }
  output.append('</dl></div>');
  var rowList484 = opt_data.list;
  var rowListLen484 = rowList484.length;
  for (var rowIndex484 = 0; rowIndex484 < rowListLen484; rowIndex484++) {
    var rowData484 = rowList484[rowIndex484];
    output.append('<dl class="row">');
    var columnList486 = opt_data.columns;
    var columnListLen486 = columnList486.length;
    for (var columnIndex486 = 0; columnIndex486 < columnListLen486; columnIndex486++) {
      var columnData486 = columnList486[columnIndex486];
      if (columnIndex486 == 0) {
        output.append('<dt>');
        switch (opt_data.type) {
          case 'sessionlist':
            output.append('<a href="/admin/session?id=', soy.$$escapeHtml(rowData484[opt_data.links[columnData486.key]]), '">', soy.$$escapeHtml(rowData484[columnData486.key]), '</a>');
            break;
          case 'applist':
            output.append('<a href="http://', soy.$$escapeHtml(rowData484[opt_data.links[columnData486.key]]), '.cloudno.de/">', soy.$$escapeHtml(rowData484[columnData486.key]), '</a>');
            break;
          case 'dblist':
            output.append('<a href="/database?name=', soy.$$escapeHtml(rowData484[opt_data.links[columnData486.key]]), '">', soy.$$escapeHtml(rowData484[columnData486.key]), '</a>');
            break;
          default:
            output.append(soy.$$escapeHtml(rowData484[columnData486.key]));
        }
        output.append('</dt>');
      } else {
        output.append((opt_data.defwidth && ! (columnIndex486 == columnListLen486 - 1)) ? '<dd style="width: ' + soy.$$escapeHtml(opt_data.defwidth) + 'px;">' : '<dd>', (opt_data.links[columnData486.key]) ? '<a href="/admin/user?id=' + soy.$$escapeHtml(rowData484[opt_data.links[columnData486.key]]) + '">' + soy.$$escapeHtml(rowData484[columnData486.key]) + '</a>' : rowData484[columnData486.key], '</dd>');
      }
    }
    output.append('</dl>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.sidetabs = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="htabs"><ul class="sidetabs"><li id="profile"><a href="#profile" ', (opt_data.active == 'profile') ? 'class="selected" ' : '', ' onClick="return tab(this)">Public Profile</a></li><li id="admin"><a href="#admin" ', (opt_data.active == 'admin') ? 'class="selected" ' : '', ' onClick="return tab(this)">API Tokens</a></li><li id="email"><a href="#email" ', (opt_data.active == 'email') ? 'class="selected" ' : '', ' onclick="return tab(this)">Email Addresses</a></li><li id="ssh"><a href="#ssh" ', (opt_data.active == 'ssh') ? 'class="selected" ' : '', ' onclick="return tab(this)">SSH Public Keys</a></li><li id="bio"><a href="#bio" ', (opt_data.active == 'bio') ? 'class="selected" ' : '', ' onclick="return tab(this)">Your Bio</a></li><div style="margin-top: 130px; margin-right: 15px;">Profile Complete<div class="bar"><span id="bar" style="width:', soy.$$escapeHtml(opt_data.complete), '%; display: block;">17%</span></div></div></ul>');
  cloudnode.global.profileTab(opt_data, output);
  cloudnode.global.adminTab(opt_data, output);
  cloudnode.global.emailTab(opt_data, output);
  cloudnode.global.sshKeyTab(opt_data, output);
  cloudnode.global.bioTab(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.profileTab = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="profile" class="tab-content ', (opt_data.active != 'profile') ? ' hidden ' : '', '"><div class="columns"><div class="column-main"><div class="column-group"><div class="column-fields">', opt_data.form, '<div style="margin-top: 10px; margin-bottom: 50px;"><a id="editprofile" class="btn" onclick="submitProfile(); return false;" label="Update Information" href="#">Update Information</a><div class="inline-msg hidden">Profile saved successfully!</div></div><div class="avatar"><img src="', soy.$$escapeHtml(opt_data.avatar), '" alt="Avatar" /><p><strong>Change your avatar at <a href="http://gravatar.com">gravatar.com</a></strong><br />We are using ', soy.$$escapeHtml(opt_data.user.email), '</div><br /></div></div></div><div class="column-sidebar"><div class="explain"><h2>Tip</h2>This information will show up on your public profile page. Avatars come from gravatar.com and must be G-rated.</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.adminTab = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="admin" class="tab-content ', (opt_data.active != 'admin') ? ' hidden ' : '', '"><div class="columns"><div class="column-main"><div class="column-group"><div class="column-fields"><h4>API Tokens</h4><br />', (opt_data.user.nodesterKey) ? 'Your API token is <b>' + soy.$$escapeHtml(opt_data.user.apikey) + '</b> - keep it <b>secrect</b>!<br />' : '<span id="api-key" style="color: red;"><br/>Your API Token will be shown after you have created your first application.</span>', (opt_data.user.dbApiKey) ? 'Your CouchDB token is <b>' + soy.$$escapeHtml(opt_data.user.dbApiKey) + '</b> - keep it <b>secrect</b>!<br />' : '', '</div></div></div><div class="column-sidebar"><div class="explain"><h2>Tip</h2> You will need these to use the command line client or to use the platform API.</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.emailTab = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="email" class="tab-content ', (opt_data.active != 'email') ? ' hidden ' : '', '"><div class="columns"><div class="column-main"><div class="column-group"><div class="column-fields"><ul class="field-pills"><li class="email-pill"><span>', soy.$$escapeHtml(opt_data.user.email), '</span><a href="#remove-email" title="Remove E-Mail Address" class="remove">Delete</a></li></ul><p><a href="#add-email" onclick="return addPill(\'email-pill\')">Add another email address</a></p><div class="email-pill hidden"><form action="#add-email"><input name="email" type="text" style="margin-bottom: 8px;" /><button class="btn" type="submit">Add</button><br />or <a href="#" onclick="return closePill(\'email-pill\')">Cancel</a></form></div></div></div></div><div class="column-sidebar"><div class="explain"><h2>Tip</h2>We use these to identify your commits on Cloudnode. Learn how to setup Git with your email address.</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.sshKeyTab = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="ssh" class="tab-content ', (opt_data.active != 'ssh') ? ' hidden ' : '', '"><div class="columns"><div class="column-main"><div class="column-group"><div class="column-fields"><ul class="field-pills"><li class="email-pill">', (opt_data.user.sshKeyName) ? '<span id="ssh-key">' + soy.$$escapeHtml(opt_data.user.sshKeyName) + ' <a href="#view-sshKey" onclick="$(\'#view-key\').removeClass(\'hidden\');"> (view)</a></span><a href="#remove-sshkey" title="Remove SSH Key" class="remove" onclick="return removeKey(\'' + soy.$$escapeHtml(opt_data.user.sshKeyName) + '\')">Delete</a>' : '<span id="ssh-key" style="color: red;">No SSH Public Key! Please add your key.</span><a href="#remove-sshkey" title="Remove SSH Key" class="remove">Delete</a>', '</li></ul>', (! opt_data.user.sshKeyName) ? '<p><a href="#add-sshKey" onclick="return addPill(\'ssh-pill\')">Add your SSH Public key</a></p>' : '', '<div class="ssh-pill hidden"><form action="javascript:submitKey();" style="height: 300px;" id="ssh-form"><label for="keyname" class="qflabel">Key Name*</label><input name="keyname" id="keyname" type="text" style="margin-bottom: 8px;" /><label for="sshkey" class="qflabel">Public SSH Key*</label><textarea name="sshkey" id="sshkey" cols="49" rows="10" style="margin-bottom: 8px; width: 420px;"></textarea><button class="btn" type="submit">Add</button><br />or <a href="#" onclick="return closePill(\'ssh-pill\')">Cancel</a></form></div>', (opt_data.user.sshKey) ? '<textarea class="hidden" id="view-key" cols="49" rows="10" style="width: 420px;">' + soy.$$escapeHtml(opt_data.user.sshKey) + '</textarea>' : '', (opt_data.user.fingerPrint) ? '<div class="fingerprint">RSA fingerprint is: ' + soy.$$escapeHtml(opt_data.user.fingerPrint) + '</div>' : '', '</div></div></div><div class="column-sidebar"><div class="explain"><h2>Tip</h2>We use these for git repository access. Every git push command updates your node VM with a new application version. See the <a href="http://docs.cloudno.de/git">docs</a> for additional help.</br></br>For additional information see our FAQ about using <a href="http://docs.cloudno.de/troubleshooting#ssh">ssh keys</a>.</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};


cloudnode.global.bioTab = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="bio" class="tab-content ', (opt_data.active != 'bio') ? ' hidden ' : '', '"><div class="columns"><div class="column-main"><div class="column-group"><div class="column-fields"><textarea id="biotext" cols="50" rows="13" style="margin-bottom: 10px;">', soy.$$escapeHtml(opt_data.user.bio), '</textarea><a id="editaccount" class="btn" style="margin-bottom: 40px; margin-left: 3px;" onclick="submitBio(); return false;" label="Update Information" href="#">Update Information</a><div class="inline-msg hidden">Profile saved successfully!</div></div></div></div><div class="column-sidebar"><div class="explain"><h2>Tip</h2>Filling in your bio will help people to find you on cloudnode. This information will show up on your public profile page.</div></div></div></div>');
  return opt_sb ? '' : output.toString();
};
