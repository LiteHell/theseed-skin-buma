$(function(){
    $(".notification .delete").click(function(){
        $(this).parent().remove();
    })
    $(".wiki-article-menu-text").addClass("is-hidden-touch");
    $(".navbar .navbar-burger").click(function(){
        var target = $(this).data("target");
        $("#" + target).toggleClass("is-active");
    });
})