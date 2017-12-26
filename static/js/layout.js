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
	set: function(n, v) {localStorage.setItem('buma_' + n, v);},
	isMobile: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4))
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
