// liberty skin 참고함.

$(function () {
    // mobile burgder menu
    $('.navbar .navbar-burger').click(function () {
        var target = $(this).data('target');
        $('#' + target).toggleClass('is-active');
    });
    /* expandable navbar-dropdown items */
    /* from https://github.com/jgthms/bulma/issues/1218 */
    $('.navbar-link').on('click', function () {
        if ($(window).width() < 1024) $(this).next('.navbar-dropdown').toggle();
    });
    function mobile_expandable_menu() {
        if ($(window).width() < 1024) {
            $('.navbar-link').next('.navbar-dropdown').hide();
        } else {
            $('.navbar-link').next('.navbar-dropdown').css('display', '');
        }
    }
    var screen_resize_timout;
    $(window).on('resize', function () {
        clearTimeout(screen_resize_timout);
        screen_resize_timout = setTimeout(mobile_expandable_menu, 100);
    });
    mobile_expandable_menu();
});
