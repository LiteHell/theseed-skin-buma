function prepareSearchInput(_container) {
    let container = $(_container);
    let searchBtn = $(container.find('.searchBtn'))
    let randomBtn = container.has('.randomBtn') ? $(container.find('.randomBtn')) : null;
    let cancelBtn = container.has('.cancelBtn') ? $(container.find('.cancelBtn')) : null;
    let queryInput = $(container.find('.query input'))

    
	// wiki search
    queryInput.keypress(function (evt) {
		if (evt.key !== "Enter") return;
		evt.preventDefault();
		var val = $(this).val();
		if (val.length > 0) {
			location.href = "/go/" + encodeURIComponent(val);
        }
    });
	queryInput.autocomplete({
		delay: 100,
		source: function(req, res) {
            //return res([req.term + ' ' + Date.now(), req.term + ' 2', req.term + ' 3']) // DEBUG PURPOSE
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
	searchBtn.click(function(evt) {
		evt.preventDefault();
		location.href = "/go/" + encodeURIComponent(queryInput.val());
	});
	if(randomBtn) randomBtn.click(function(evt) {
		evt.preventDefault();
		location.href = "/random";
    })
    if(cancelBtn) cancelBtn.click(function(evt) {
        evt.preventDefault();
        container.addClass("disabled");
    })
}

$(function(){
    $(".toggle-dark").click(function() {
        $("body").toggleClass("dark-mode")
    });
    $(".toggle-mobile-search").click(function() {
        $(".mobile-search").toggleClass("disabled");
    });
    prepareSearchInput($(".mobile-search"));
    prepareSearchInput($(".desktop-search"));
});