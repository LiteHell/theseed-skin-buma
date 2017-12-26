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
	get: function(n, d) {return localStorage.getItem('buma_' + n) || (d ? d : 'skinDefault')},
	set: function(n, v) {localStorage.setItem('buma_' + n, v);}
}
function processSkinSettings() {
	var style = document.createElement("style");
	switch(skinSettings.get('hideDeletedOnWiki')) {
		case 'hide':
			style.innerHTML += ".wiki-content del {display: none;}";
			break;
		case 'undelete':
			style.innerHTML += ".wiki-content del {text-decoration: none;}";
			break;
		case 'doNoting':
		case 'skinDefault':
		default:
			break;
	}
	switch(skinSettings.get('noVideoForGif')) {
		case 'yes':
			forceNoVideo = true;
		case 'no':
		case 'skinDefault':
		default:
			break;
	}
	$(".settings-modal input").each(function(){
		var input = $(this);
		var settingVal = skinSettings.get(input.attr("name"));
		if (settingVal == input.val())
			input.prop('checked', true);
	})
	$(".settings-modal .delete, .settings-modal .modal-background").click(function(evt){
		$(".settings-modal").removeClass("is-active");
	});
	document.head.appendChild(style);
}
$(function(){
	// notification delete button
    $(".notification .delete").click(function(){
        $(this).parent().remove();
	})
	// hide wiki menu text on mobile
	$(".wiki-article-menu-text").addClass("is-hidden-touch");
	// mobile burgder menu
    $(".navbar .navbar-burger").click(function(){
        var target = $(this).data("target");
        $("#" + target).toggleClass("is-active");
	});
	// wiki search
    $("#wikiSearch").keypress(function (evt) {
		if (evt.key != "Enter") return;
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
					response(data);
				},
				error: function(data) {
					response([]);
				}
			});
		},
		select: function(evt, ui) {
			if(ui.item.value) {
				location.href = "/w/" + encodeURIComponent(ui.item.value);
			}
		}
	});
	// skin settings
	processSkinSettings();
	$(".settings-modal input").on("change input", function(evt) {
		var setting = evt.target;
		skinSettings.set(setting.name, setting.value);
	})
	$("#skin-settings").click(function (evt){
		evt.preventDefault();
		$(".settings-modal").toggleClass("is-active");
	})
	/* expandable navbar-dropdown items */
	/* from https://github.com/jgthms/bulma/issues/1218 */
	function mobile_expandable_menu() {
		if( $(window).width() < 768 ) {
			$('.navbar-link').next('.navbar-dropdown').hide();
			$('.navbar-link').on('click', function(){
				$(this).next('.navbar-dropdown').toggle();
			});
		} else {
			$('.navbar-link').next('.navbar-dropdown').css('display','');
			$('.navbar-link').unbind('click');
		}
	}
	var screen_resize_timout;
	$(window).on("resize", function (e) {
		clearTimeout(screen_resize_timout);
		screen_resize_timout = setTimeout(mobile_expandable_menu, 500);
	});
	mobile_expandable_menu();
	// process wiki images
    processWikiImages(false);
})
