function devClose(){
    $('#dev').addClass('opac')
}

function devOut(){
    console.log("test");
    $('#dev').removeClass('opac')
}

$(document).ready(function () {
    setTimeout( function(){
        $('#splash').addClass('opac');
    },2000);
});
