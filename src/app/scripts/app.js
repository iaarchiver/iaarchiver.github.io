$(function () {

	$('.sidebar').scrollable();

	function refresh(){
		$('.sidebar').scrollable();
	}
	$(window).resize(refresh);

	var $wrapper = $('.wrapper'),
		$logo = $('.logo'),
		$sidebar = $('.sidebar');

	// sidebar toggle ///////////////////////////////////////////////////////////
	var isHidden = true;

	function showSidebar(callb){
		$logo.stop(true,false).animate({
			right: '326px'
		}, 250, 'swing');
		$sidebar.stop(true,false).animate({
			opacity: 1
		},250);

		$wrapper.stop(true,false).animate({
			marginLeft: '-320px'
		}, 250, 'swing', function(){
			isHidden = false;
			if (callb) callb();
		});
	}

	function hideSidebar(callb){
		$logo.stop(true,false).animate({
			right: '6px'
		}, 250, 'swing');
		$sidebar.stop(true,false).animate({
			opacity: 0.3
		},250);

		$wrapper.stop(true,false).animate({
			marginLeft: 0
		},250, 'swing', function(){
			isHidden = true;
			if (callb) callb();
		});
	}

	$logo.on({ 'mouseenter': function(){
		if (isHidden){
			showSidebar();
		}else{
			hideSidebar();
		}
	}});

	$wrapper.on({ 'mouseenter': function(){
		if (!isHidden) hideSidebar();
	}});


	// sidebar-nav //////////////////////////////////////////////////////////////
	var isCollapsed = true;

	function expandSidebar(callb){
		$sidebar.stop(true,false).animate({
			width: '100%'
		}, 250, 'swing');
		$logo
		.stop(true,false).animate({
			right: document.body.scrollWidth+'px' // safari-bug must set px here
		}, 250, 'swing');
		$wrapper.stop(true,false).animate({
			marginLeft: '-100%'
		}, 250, 'swing', function(){
			isCollapsed = false;
			if (callb) callb();
			refresh();
		});
	}
	function collapseSidebar(callBefore){
		// ignore all mouse events while hiding sidebar
		document.body.style.pointerEvents = 'none';
		if (callBefore) callBefore();
		$sidebar.stop(true,false).animate({
			width: '320px'
		}, 250, 'swing');
		$logo.stop(true,false).animate({
			right: '326px'
		}, 250, 'swing');
		$wrapper.stop(true,false).animate({
			marginLeft: '-320px'
		}, 250, 'swing', function(){
			isCollapsed = true;	
			document.body.style.pointerEvents = 'auto';
			refresh();
		});
	}
	
	$('.sidebar .home-button').on({'click': function(){
		hideSidebar(function(){
			location.href='/';
		});
	}});
	
	$('.sidebar .show-archive').on({'click': function(){
		if (isCollapsed){
			expandSidebar(function(){
				$('.sidebar-list').addClass('expanded');
			});
		}else{
			collapseSidebar(function(){
				$('.sidebar-list').removeClass('expanded');
			});
		}
	}});

	$('.sidebar .hide-button').on({'click': function(){
		document.body.style.pointerEvents = 'none';
		hideSidebar(function(){
			// collapse after hide-sidebar (for hide-button)
			if (!isCollapsed){
				$sidebar.stop(true,false).animate({
					width: '320px'
				}, 250, 'swing');
				$('.sidebar-list').removeClass('expanded');
				isCollapsed = true;
			}
			document.body.style.pointerEvents = 'auto';
		});
	}})

	// anchors in sidebar ///////////////////////////////////////////////////////
	$('.sidebar-list a').each(function(){
		$.data(this,'href',this.href)
		$(this).attr('href', '#');
	});

	$('.sidebar-list a').on({'click': function(){
		var self = this;

		// ignore all mouse events while hiding sidebar
		document.body.style.pointerEvents = 'none';
		hideSidebar(function(){
			document.body.style.pointerEvents = 'auto';
			location.href = $(self).data('href');
		});
	}});


	// search ///////////////////////////////////////////////////////////////////
<<<<<<< HEAD
<<<<<<< HEAD
	$('a.search-button').on({'click': function(){
		$('#sidebar-search').toggle().focus();
	}});
=======
>>>>>>> 96d13a2... fixed sidebar-search
=======
	$('a.search-button').on({'click': function(){
		$('#sidebar-search').toggle().focus();
	}});
>>>>>>> 65f3637... changed sidebar-nav
	// override .contains filter (ignore case)
	$.expr[':'].contains = function(a, i, m) {
		return $(a).text().toUpperCase()
					.indexOf(m[3].toUpperCase()) >= 0;
	};
	$('#sidebar-search').on({
		'keyup': function(){
			var keywords = $('#sidebar-search').val().split(' '),
				selector = '.sidebar-list li';

			$(selector).hide();
			for (var i = 0; i < keywords.length; i++){
				selector += ':contains('+ keywords[i] +')';
			}
			$(selector).show();
		}
	})
});
