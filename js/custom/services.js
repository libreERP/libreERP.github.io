app.factory('userProfileService', function(){
  var userProfiles = [];
  var userSocialPosts = [];
  var userSocialAlbums = [];
  var userSocialPictures = [];

  return {
    get : function(userUrl , refetch){
      if (typeof userProfiles[userUrl]=="undefined" || refetch) {
        if (userUrl=='mySelf') {
          me = myProfile();
          userProfiles["mySelf"] = me;
          userProfiles[me.url] = me;
        } else {
          var user = getUser(userUrl);
          userProfiles[userUrl]= user
        }
      }
      return userProfiles[userUrl];
    },
  }
});


function myProfile(){
  var httpRequest = new XMLHttpRequest()
  httpRequest.open('GET', "/api/HR/users/?mode=mySelf&format=json" , false);
  httpRequest.send(null);
  if (httpRequest.status === 200) { // successfully
    var temp = JSON.parse(httpRequest.responseText);
    me = temp[0];
    me.url = me.url.split('?')[0]
    return me;
  }
}

function getUser(urlGet , mode){
  // console.log(urlGet);
  var httpRequest = new XMLHttpRequest()
  if (urlGet.indexOf('api/HR')==-1) {
    urlGet = '/api/HR/users/'+ urlGet + '/'
  }
  if (urlGet.indexOf('json')==-1) {
    urlGet += '?format=json';
  }
  httpRequest.open('GET', urlGet , false);
  httpRequest.send(null);
  if (httpRequest.status === 200) { // successfully
    user = JSON.parse(httpRequest.responseText);
    user.url = user.url.split('?')[0];
    return user
  }
}
