$(document).ready(function() {
  setTimeout(function() {
    $("#splash").addClass("opac");
    loadCountryData();
  }, 2000);

 setTimeout( function(){
        $('#maintenance').addClass('remove-maintenance');
    },4000);

  setTimeout( function(){
    $('#maintenance').addClass('remove-maintenance2');
  },4600);
});



function devClose() {
  $("#dev").addClass("opac");
  $("#developes-note").removeClass("developes-note");
  $("#donation-div").addClass("opac");
}

setTimeout(function() {
  $('#mydiv').fadeOut('fast');
}, 1000);

function devOut() {
  $("#dev").removeClass("opac");
}

function openNews() {
  $("#cardTop").toggleClass("full-height");
}

function minimize() {}

function donationOpen() {
  $("#donation-div").addClass("donation-div");
  $("#developes-note").addClass("developes-note");
  $("#donation-div").removeClass("opac");
}

function openHotspot(){
  $("#hotspot-item").toggleClass("hotspot-item");
  $("#hotspot-item").toggleClass("h-o")
  $(".rounded-card").toggleClass("p-t-25")  
  retrieveHotSpotData('Kannur');
}

function loadCountryData() {
  $.ajax({
    url: "https://api.covid19api.com/summary",
    dataType: "json",
    success: function(data) {
      var result = data.Countries;
      var total_cases = 0;
      var total_recovered = 0;
      var total_unresolved = 0;
      var total_new_cases_today = 0;
      var total_new_deaths_today = 0;
      var total_active_cases = 0;
      var total_serious_cases = 0;
      var total_deaths = 0;
      var trHTML = "";
      for (var i = 0; i < result.length; i++) {
        var object = result[i];
        if (object.Country == undefined) {
          continue;
        }
        if (object.Country == "India") {
          $("#total_cases").text(object.TotalConfirmed);
          $("#total_recovered").text(object.TotalRecovered);
          $("#total_deaths").text(object.TotalDeaths);
          $("#total_new_cases_today").text(
              object.NewConfirmed
          );
          $("#total_new_deaths_today").text(
              object.NewDeaths
          );
          $("#total_active_cases").text(object.TotalConfirmed - object.TotalRecovered);
        }

        $("#world-table").append(
            '<tr><td class ="t-a-l">' +
            object.Country +
            "</td><td>" +
            object.TotalConfirmed +
            "</td><td>" +
            object.TotalDeaths +
            '</td><td class="unresolved">' +
            object.NewConfirmed +
            "</td><td>" +
            object.NewDeaths +
            "</td><td>" +
            object.TotalRecovered +
            '</td><td class="unresolved">' +
            object.NewRecovered +
            "</td></tr>"
        ).trigger("update");
        $("#world-table").tablesorter({ sortList: [[1,1]]});
        $("#table").tablesorter({ sortList: [[3,1]]});
      }
    }

  });
}
