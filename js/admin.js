
//submit post
function writeUserData() {
    var username = "nithin";
    var test;
    var postValue = document.getElementById("post").value;
    var priority = document.getElementById("date").value;
    var source = document.getElementById("source").value;
    var date = NOW();
  
    //formElements2= new Date(formElements2);
    debugger;
    firebase
      .database()
      .ref("posts/" + date)
      .set(
        {
          postValue: postValue,
          modifiedBY: username,
          relevance: priority,
          source: source,
          date:date
  
        },
        function(error) {
          if (error) {
            // The write failed...
            alert("data failed")
          } else {
            // Data saved successfully!
            alert("data inserted")
          }
          debugger;
        }
      );
  }

  


  function insertDistrictDataHotspot(){
    var distName = document.getElementById("dist_name_hotspot").value;
    var hotspotName = document.getElementById("hotspot_val").value;
    var date = NOW();
  
    //formElements2= new Date(formElements2);
    debugger;
    firebase
      .database()
      .ref("state/kerala/" + distName+"/hotspots")
      .set(
        {
          hotspotName: hotspotName
  
        }, 
        function(error) {
          if (error) {
            // The write failed...
            alert("data failed")
          } else {
            // Data saved successfully!
            alert("data inserted")
          }
          debugger;
        }
      );
  }
  
  
  function insertDistrictData(){
    var distName = document.getElementById("dist_name").value;
    var observation = document.getElementById("observation").value;
    var isolation = document.getElementById("isolation").value;
    var hospital = document.getElementById("hospital").value;
    var hospitalToday = document.getElementById("hospital_today").value;
    var date = NOW();
  
    //formElements2= new Date(formElements2);
    debugger;
    firebase
      .database()
      .ref("state/kerala/" + distName)
      .set(
        {
          observation: observation,
          isolation: isolation,
          hospital: hospital,
          hospitalToday: hospitalToday
  
        }, 
        function(error) {
          if (error) {
            // The write failed...
            alert("data failed")
          } else {
            // Data saved successfully!
            alert("data inserted")
          }
          debugger;
        }
      );
  }
  
  function quickNotificationInsertion(){
    var quickCases = document.getElementById("quick_case").value;
    var quickNot = document.getElementById("quick_case_val").value;
    firebase
    .database()
    .ref("totalCount/"+quickCases)
    .set(
      {
        [quickCases]:quickNot
  
      }, 
      function(error) {
        if (error) {
          // The write failed...
          alert("data failed")
        } else {
          // Data saved successfully!
          alert("data inserted")
        }
        debugger;
      }
    );
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