// liberty skin 참고함.

$(function () {
    // notification delete button
    $('.notification .delete').click(function () {
        $(this).parent().remove();
    });
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
    // fix bootstrap alerts
    $('.wiki-article .alert.fade.in').removeClass('fade in');
    // fix ugly close buttons in bootstrap alerts
    var dismissibleAlerts = $('.wiki-article .alert.alert-dismissible:has(button.close)');
    dismissibleAlerts.find('button.close').remove();
    setTimeout(function () {
        dismissibleAlerts.fadeOut(200, function () {
            $(this).remove();
        });
    }, 3000);
    // jump buttons
    $('.jump-buttons .jump-up').click(function (evt) {
        evt.preventDefault();
        $('#wiki-main-title').get(0).scrollIntoView();
    });
    $('.jump-buttons .jump-down').click(function (evt) {
        evt.preventDefault();
        $('footer').get(0).scrollIntoView();
    });
});
