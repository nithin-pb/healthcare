$(document).ready(function () {
    setTimeout( function(){
        $('#splash').addClass('opac');
    },2000);
});

function devClose(){
    $('#dev').addClass('opac');
}

function devOut(){
    $('#dev').removeClass('opac');
}

function openNews(){
    $('#cardTop').addClass('full-height');
}


