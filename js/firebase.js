// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBvL1zAnXHQxwkMi2uXBwibyypyEraGFcQ",
  authDomain: "our-health-live.firebaseapp.com",
  databaseURL: "https://our-health-live.firebaseio.com",
  projectId: "our-health-live",
  storageBucket: "our-health-live.appspot.com",
  messagingSenderId: "967186134732",
  appId: "1:967186134732:web:c603aae1a159d0226b3469",
  measurementId: "G-SKVRPP5FLY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
function writeUserData(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
}

retrieveData();
retrievePost();
retrieveQuickCounts();

function retrieveData() {
  var totalObservation = 0;
  var totalIsolation = 0;
  var totalHospital = 0;
  var totalHospitalToday = 0 ;
  firebase
    .database()
    .ref("state/kerala")
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        totalHospitalToday= totalHospitalToday+parseInt(childNodes.val().hospitalToday);
        totalHospital= totalHospital+parseInt(childNodes.val().hospital);
        totalIsolation= totalIsolation+parseInt(childNodes.val().isolation);
        totalObservation= totalObservation+parseInt(childNodes.val().observation);
          $("#district").append('<p id="'+childNodes.key+'" onClick=retrieveHotSpotData(this.id)>'+childNodes.key+'</p>');  
          $("#table").append(
            '<tr><td class ="t-a-l">' +
              childNodes.key +           
              "</td><td>" +
              childNodes.val().observation +
              "</td><td>" +
              childNodes.val().isolation +
              "</td><td>" +
              childNodes.val().hospital +
              "</td><td>" +
              childNodes.val().hospitalToday +
              "</td></tr>"
          ).trigger("update");
      });

      $("#table").append(
        '<tr class="total"><td class="t-a-l"> Total' +
          "</td><td>" +
          totalObservation+
          "</td><td>" +
          totalIsolation+
          "</td><td>" +
          totalHospital+
          "</td><td>" +
          totalHospitalToday+
          "</td></tr>"
      );
    });
}

function retrieveHotSpotData(distName) {
  var id='#'+distName;
  $('.hotspot-select').removeClass('hotspot-select');
  $(id).addClass('hotspot-select');
  var placeName = null;
  firebase
    .database()
    .ref("state/kerala/"+distName)
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        if(childNodes.val().hotspotName!=undefined){
          $("#district-val").empty();          
          var hostspotPlaces = childNodes.val().hotspotName.split(",");
          console.log(hostspotPlaces.length);
          for(var i=0; i<=hostspotPlaces.length;i++)
          {
            if(hostspotPlaces[i]!=undefined)
            {
              $("#district-val").append('<p>'+hostspotPlaces[i]+'</p>');
              
            }            
          }
        }
         
      });
    });
}

function retrievePost() {
  firebase
    .database()
    .ref("posts/").startAt().orderByChild("date")
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        if(childNodes.val().source=="state")
        {
        $("#conOne").append(
          "<ul><li>" +
            childNodes.val().postValue +
            "<p>"+childNodes.key+"</p>"+
          "</li></ul>"
        );
        $('#last_update').text("Source: DHS Kerala, Last modified on: "+childNodes.key);
        }
        else if(childNodes.val().source=="WHO")
        {
          $("#conTwo").append(
            "<ul><li>" +
              childNodes.val().postValue +
              "<p>"+childNodes.key+"</p>"+
            "</li></ul>"
          );          
        }
      });
    });
}

function distData(){
  var distName=document.getElementById("dist_name_search").value;
  firebase
  .database()
  .ref("state/kerala/")
  .on("value", function(snap) {
    $("td").remove();
    snap.forEach(function(childNodes) {
        if(childNodes.key ==distName){
        $("#table").append(
          '<tr><td class ="t-a-l">' +
            childNodes.key +
            "</td><td>" +
            childNodes.val().observation +
            "</td><td>" +
            childNodes.val().isolation +
            "</td><td>" +
            childNodes.val().hospital +
            "</td><td>" +
            childNodes.val().hospitalToday +
            "</td></tr>"
        );
        }
        else if(distName=="select"){
          $("#table").append(
            '<tr><td class ="t-a-l">' +
              childNodes.key +
              "</td><td>" +
              childNodes.val().observation +
              "</td><td>" +
              childNodes.val().isolation +
              "</td><td>" +
              childNodes.val().hospital +
              "</td><td>" +
              childNodes.val().hospitalToday +
              "</td></tr>"
          );
        }
    });
  });
}

//retrieve Quick notification

function retrieveQuickCounts() {
  firebase
    .database()
    .ref("totalCount/").startAt()
    .on("value", function(snap) {
      snap.forEach(function(childNodes) {
        if(childNodes.key=="keralaPositive")
        {
          $('#keralaPositive').text(childNodes.val().keralaPositive);
        }
        else if(childNodes.key=="keralaPositiveAdmitted")
        {
          $('#keralaPositiveAdmitted').text(childNodes.val().keralaPositiveAdmitted);        
        }
        else if(childNodes.key=="worldPositiveAdmitted")
        { 
          $('#worldPositiveAdmitted').text(childNodes.val().worldPositiveAdmitted);      
        }
        else if(childNodes.key=="worldDeath")
        {  
          $('#worldDeath').text(childNodes.val().worldDeath);   
        }
        else if(childNodes.key=="worldRecover")
        { 
          $('#worldRecover').text(childNodes.val().worldRecover);      
        }
      });
    });
}

function NOW() {
  var date = new Date();
  var aaaa = date.getFullYear();
  var gg = date.getDate();
  var mm = date.getMonth() + 1;

  if (gg < 10) gg = "0" + gg;

  if (mm < 10) mm = "0" + mm;

  var cur_day = aaaa + "-" + mm + "-" + gg;

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (hours < 10) hours = "0" + hours;

  if (minutes < 10) minutes = "0" + minutes;

  if (seconds < 10) seconds = "0" + seconds;

  return cur_day + " " + hours + ":" + minutes + ":" + seconds;
}
