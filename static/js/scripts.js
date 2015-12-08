$('#submit-button').hide();
$('#search-box').hide();
$('#comment-box').hide();
$('#parent-comment-box').hide();
$('#search-textarea').focus(function(){
        $('#submit-button').fadeIn(500);
        $('#search-label').css('visibility', 'hidden');
});

var g = new JustGage({
        id: "gauge",
        value: 0,
        min: 0,
        max: 100,
        levelColors: [
                "#FF0000",
                "#FFFF00",
                "#00FF00"
        ],
        title: "Comment Score"
});
$('#gauge').hide();

var reddit_comment_content = {comment:"",parent_comment:""};
var comment_input = function(){
        reddit_comment_content.comment = $('#search-textarea').val();
        $('#comment-content').html($('#search-textarea').val());
        $('#search-textarea').val("");
        $('#comment-box').fadeIn(800);
        $('#button-icon').text("done");
        $('#search-textarea').val("");
        $('#search-label').html("What are you respoding to? (parent comment)");
        $('#search-label').css('visibility', 'visible');
        $('#search-label').hide();
        $('#search-label').fadeIn(800);
        $('#submit-button').unbind();
        $('#submit-button').click(parent_input);

}

var parent_input = function(){
        reddit_comment_content.parent_comment = $('#search-textarea').val();
        $('#parent-comment-box').fadeIn(800);
        $('#button-icon').text("done");
        $('#submit-button').unbind();

        $('#parent-comment-content').html($('#search-textarea').val());
        $('#search-textarea').unbind();
        $('#search-textarea').attr("disabled", "disabled");
        $('#submit-button').fadeOut(400,function(){
                $('#search-label').css('visibility', 'hidden');

                $('#search-loading').fadeIn(800);
        });
        $.post( "api", reddit_comment_content,function( data ) {



                g.refresh(data);
                $('#button-icon').text("cached");
                $('#search-loading').css('visibility','hidden');
                        
                $('#submit-button').fadeIn(800);
                $('#submit-button').unbind();

                $('#submit-button').click(function(){//ugly reload page logic
                        $.ajax({
                                url: "",
                                context: document.body,
                                success: function(s,x){
                                        $(this).html(s);
                                }
                        });
                });


        });
}


$('#submit-button').click(comment_input);

$('#get-started-button').click(function(){
        $('#intro-card').fadeOut(800);
        $('#gauge').fadeIn(800);
        $('#search-box').fadeIn(800);
});
