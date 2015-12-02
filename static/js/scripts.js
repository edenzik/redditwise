console.log("hy");
$('#submit-button').hide();
$('#search-textarea').focus(function(){
        $('#submit-button').fadeIn(500);
        console.log("fired");
});
$('#search-textarea').focusout(function(){
        $('#submit-button').fadeOut(500);
        console.log("fired");
});


$('#submit-button').click(function(){
        $('#submit-button').hide();
        $('#search-textarea').off("focus");
        $('#search-textarea').prop("disabled", 'disabled');



        $('#search-loading').fadeIn(800);
        $.post( "api", {content:$('#search-textarea').val()},function( data ) {
                $('#search-box').fadeOut(800);
                $('.mdl-grid').fadeOut(800);
        });
});

$('#get-started-button').click(function(){

        $('#search-box').effect( "shake" );


});
