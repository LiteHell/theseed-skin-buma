// liberty skin 참고함.

var forceNoVideo = false;
function processWikiImages() {
    var isVideoAvailable = (function(){
        if(forceNoVideo) return false;
		var v = document.createElement('video');
		return v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.4D401E').replace(/no/, '');
	 })();
	$(".wiki-article img.wiki-image-loading").removeClass('wiki-image-loading').each(function () {
		var img = $(this);
		var playAsVideo = img.attr('data-video-src') && isVideoAvailable;
		if(playAsVideo) {
			var videoTag = $("<video class='wiki-image' loop autoplay muted playsinline>");
			videoTag.attr('src', img.attr('data-video-src'));
			videoTag.attr('poster', '/skins/buma/img/Loading.gif');
			if(img.attr('width')) videoTag.attr('width', img.attr('width'));
			if(img.attr('height')) videoTag.attr('height', img.attr('height'));
			img.after(videoTag);
			img.remove();
		} else {
			img.attr('src', $(this).attr("data-src"));
		}
	});
}
var skinSettings = {
	get: function(n, d) {return localStorage.getItem('buma_' + n) || (d ? d : 'skinDefault');},
	set: function(n, v) {localStorage.setItem('buma_' + n, v);}
};
function processSkinSettings() {
	var style = document.createElement("style");
	switch(skinSettings.get('hideDeletedOnWiki')) {
		case 'hide':
			style.innerHTML += ".wiki-content del {display: none;}";
			break;
		case 'undelete':
			style.innerHTML += ".wiki-content del {text-decoration: none;}";
			break;
		default:
		case 'doNoting':
		case 'skinDefault':
			break;
	}
	switch(skinSettings.get('noVideoForGif')) {
		case 'yes':
			forceNoVideo = true;
			break;
		default:
		case 'no':
		case 'skinDefault':
			break;
	}
	switch(skinSettings.get('foldHeadingsByDefault')) {
		case 'yes':
			$(".wiki-heading-content").hide();
			break;
		default:
		case 'no':
		case 'skinDefault':
			break;
	}
	switch(skinSettings.get('behaviorWhenDblClick')) {
		case 'edit':
			$('.wiki-article').dblclick(function (evt) {
				var topmost = $(evt.target);
				var headingContent = topmost.parent('.wiki-heading-content');
				if (headingContent.length !== 0) {
					var heading = headingContent.prev('.wiki-heading')[0];
					location.href = heading.querySelector('.wiki-edit-section a').href;
				} else {
					if($(".edit-anchor").length === 0) return;
					location.href = $(".edit-anchor")[0].href;
				}
			});
			break;
		case 'history':
			$('.wiki-article').dblclick(function () {
				if ($(".history-anchor").length === 0) return;
				location.href = $(".history-anchor")[0].href;
			});
			break;
		default:
		case 'doNothing':
		case 'skinDefault':
			break;
	}
	switch(skinSettings.get('enableJumpButtons')) {
		case 'yes':
		case 'skinDefault':
			break;
		case 'no':
			$('.jump-buttons').hide();
			break;
	}
	$(".settings-modal input").each(function(){
		var input = $(this);
		var settingVal = skinSettings.get(input.attr("name"));
		if (settingVal === input.val())
			input.prop('checked', true);
	});
	$(".settings-modal .delete, .settings-modal .modal-background").click(function(){
		$(".settings-modal").removeClass("is-active");
	});
	document.head.appendChild(style);
}
$(function(){
	// notification delete button
    $(".notification .delete").click(function(){
        $(this).parent().remove();
	});
	// mobile burgder menu
    $(".navbar .navbar-burger").click(function(){
        var target = $(this).data("target");
        $("#" + target).toggleClass("is-active");
	});
	// wiki search
    $("#wikiSearch").keypress(function (evt) {
		if (evt.key !== "Enter") return;
		evt.preventDefault();
		var val = $(this).val();
		if (val.length > 0) {
			location.href = "/go/" + encodeURIComponent(val);
        }
    });
	$("#wikiSearch").autocomplete({
		delay: 100,
		source: function(req, res) {
			$.ajax({
				url: '/complete/' + encodeURIComponent(req.term),
				dataType : 'json',
				success: function(data) {
					res(data);
				},
				error: function() {
					res([]);
				}
			});
		},
		select: function(evt, ui) {
			if(ui.item.value) {
				location.href = "/w/" + encodeURIComponent(ui.item.value);
			}
		}
	});
	// wiki search buttons
	$("#wikiSearchBtn").click(function(evt) {
		evt.preventDefault();
		location.href = "/go/" + encodeURIComponent($("#wikiSearch").val());
	});
	$("#wikiGoRandomBtn").click(function(evt) {
		evt.preventDefault();
		location.href = "/random";
	})
	// skin settings
	processSkinSettings();
	$(".settings-modal input").on("change input", function(evt) {
		var setting = evt.target;
		skinSettings.set(setting.name, setting.value);
	});
	$("#skin-settings").click(function (evt){
		evt.preventDefault();
		$(".settings-modal").toggleClass("is-active");
	});
	/* expandable navbar-dropdown items */
	/* from https://github.com/jgthms/bulma/issues/1218 */
	$('.navbar-link').on('click', function(){
		if ($(window).width() < 1024 )
			$(this).next('.navbar-dropdown').toggle();
	});
	function mobile_expandable_menu() {
		if( $(window).width() < 1024 ) {
			$('.navbar-link').next('.navbar-dropdown').hide();
		} else {
			$('.navbar-link').next('.navbar-dropdown').css('display','');
		}
	}
	var screen_resize_timout;
	$(window).on("resize", function () {
		clearTimeout(screen_resize_timout);
		screen_resize_timout = setTimeout(mobile_expandable_menu, 100);
	});
	mobile_expandable_menu();
	// process wiki images
	processWikiImages(false);
	// fix bootstrap alerts
	$(".wiki-article .alert.fade.in").removeClass("fade in");
	// fix ugly close buttons in bootstrap alerts
	var dismissibleAlerts = $(".wiki-article .alert.alert-dismissible:has(button.close)");
	dismissibleAlerts.find("button.close").remove();
	setTimeout(function() {
		dismissibleAlerts.fadeOut(200, function(){$(this).remove();});
	}, 3000);
	// jump buttons
	$(".jump-buttons .jump-up").click(function(evt){
		evt.preventDefault();
		$('#wiki-main-title').get(0).scrollIntoView();
	});
	$(".jump-buttons .jump-down").click(function(evt){
		evt.preventDefault();
		$('footer').get(0).scrollIntoView();
	});
	// dark theme
	$("#toggle-dark-theme").click(function(evt){
		evt.preventDefault();
		$("body").toggleClass("dark-buma");
		sessionStorage.setItem('dark_mode', $("body").hasClass("dark-buma") ? "true" : "false");
	});
	$("body").toggleClass("dark-buma", JSON.parse(sessionStorage.getItem("dark_mode")) || false)
});
