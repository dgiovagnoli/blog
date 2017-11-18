/* ----------------- Start Document ----------------- */
(function($){
"use strict";

$(document).ready(function(){


	/*----------------------------------------------------*/
	/* Navigation
	/*----------------------------------------------------*/
	$('ul.menu').superfish({
		 delay:       200,                 // delay on mouseout
		 speed:       200,                         // faster animation speed
		 speedOut:    100,                         // speed of the closing animation
		 animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
		 autoArrows:  true,                        // disable generation of arrow mark-up
		 onShow: function() {
				 var borderSpan = $('<span style="display:none; top:0px;" class="hover-border"></span>');
			$( this ).append(borderSpan);
			},
			onHide: function() {
				 $( "span.hover-border" ).remove();
			}, 
	});

	// Search
	$('li.search').click(function(e){
		e.preventDefault();
		$('.search-container').fadeIn(150);
	});

	$('.search-container .close-search a').click(function(e){
		e.preventDefault();
		$('.search-container').fadeOut(150);
	});

	$(document).mouseup(function (e) {
		 var container = $(".search-container");
		 if (!container.is(e.target) && container.has(e.target).length === 0) { container.fadeOut(150); }
	});


	/*--------------------------------------------------*/
	/*  Mobile Navigation
	/*--------------------------------------------------*/
	var jPanelMenu = $.jPanelMenu({
	  menu: '#responsive',
	  animated: false,
	  duration: 200,
	  keyboardShortcuts: false,
	  closeOnContentClick: true
	});


	// Desktop devices
	$('.menu-trigger').click(function(){
	  var jpm = $(this);

	  if( jpm.hasClass('active') )
	  {
	    jPanelMenu.off();
	    jpm.removeClass('active');
	  }
	  else
	  {
	    jPanelMenu.on();
	    jPanelMenu.open();
	    jpm.addClass('active');
			// Removes SuperFish Styles
		$('#jPanelMenu-menu').removeClass('menu');
		$('ul#jPanelMenu-menu li').removeClass('dropdown');
		$('ul#jPanelMenu-menu li ul').removeAttr('style');
		$('ul#jPanelMenu-menu li div').removeClass('mega');
		$('ul#jPanelMenu-menu li div').removeAttr('style');
		$('ul#jPanelMenu-menu li div div').removeClass('mega-container');
	  }
	  return false;
	});

	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth>992) {
			jPanelMenu.close();
		}
	});


	// Mobile Search Menu Trigger
	$('.search-trigger')
	.on('click', function(){
		$('.responsive-search').slideToggle(200);
		$('.search-trigger').toggleClass("active");
	});


	/*----------------------------------------------------*/
	/*  Flexslider
	/*----------------------------------------------------*/
	$('.testimonials-slider').flexslider({
		 animation: "fade",
		 directionNav: false
	});


	$('.simple-slider').flexslider({
		animation: "fade",
		controlNav: false,
		prevText: "",           //String: Set the text for the "previous" directionNav item
		nextText: ""
	});


	/*----------------------------------------------------*/
	/*  Owl Carousel
	/*----------------------------------------------------*/
	$('.logo-carousel').owlCarousel({
	  loop: false,
	  margin:10,
	  nav:true,
	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:3
			},
			1000:{
				 items:5
			}
	  },
	  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});	

	$('.owl-carousel').owlCarousel({
	  loop: false,
	  margin:30,
	  nav:true,
	  responsive:{
			0:{
				 items:1
			},
			600:{
				 items:1
			},
			768:{
				 items:2
			},
			1000:{
				 items:3
			}
	  },
	  navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});


	/*----------------------------------------------------*/
	/*  Back to Top
	/*----------------------------------------------------*/
	  var pxShow = 400; // height on which the button will show
	  var fadeInTime = 400; // how slow / fast you want the button to show
	  var fadeOutTime = 400; // how slow / fast you want the button to hide
	  var scrollSpeed = 400; // how slow / fast you want the button to scroll to top.

	  $(window).scroll(function(){
		 if($(window).scrollTop() >= pxShow){
			$("#backtotop").fadeIn(fadeInTime);
		 } else {
			$("#backtotop").fadeOut(fadeOutTime);
		 }
	  });

	  $('#backtotop a').click(function(){
          $('html, body').animate({ scrollTop: $("#navigation").offset().top }, scrollSpeed);
		 return false;
      });







	/*----------------------------------------------------*/
	/*  Counters
	/*----------------------------------------------------*/
    $('.counter').counterUp({
        delay: 100,
        time: 1600
    });


	/*----------------------------------------------------*/
	/*  See All Projects Button
	/*----------------------------------------------------*/
	function resizeBox() {
		var divHeight = $('.projects.latest a img, .project-category img, .full-width.projects a img').height(); 
		$('.see-all').css('min-height', divHeight+'px');
	}

	resizeBox();

	$(window).resize(function(){
		resizeBox();
	});


	/*----------------------------------------------------*/
	/*  Projects Filtering
	/*----------------------------------------------------*/

	$('.option-set.alt li').on('click',function(event) {
	  event.preventDefault();

	  var item = $(".projects a"),
	  image = item.find('.projects a img');
	  item.removeClass('clickable unclickable');
	  image.stop().animate({opacity: 1});
	  var filter = $(this).children('a').data('filter');
	  item.filter(filter).addClass('clickable');
	  item.filter(':not('+filter+')').addClass('unclickable');
	  item.filter(':not('+filter+')').find('.themes-list a img').stop().animate({opacity: 0.2});
	});

	$('#filters a').click(function(e){
		 e.preventDefault();

		 //var selector = $(this).attr('data-filter');

		 $(this).parents('ul').find('a').removeClass('selected');
		 $(this).addClass('selected');
	});

	$('.projects a').on('click',function(e) {
	  if($(this).hasClass('unclickable')){
			e.preventDefault();
		}
	});



	/*----------------------------------------------------*/
	/*  Responsive Tables
	/*----------------------------------------------------*/
	$('.responsive-table').stacktable();


	/*----------------------------------------------------*/
	/*  Isotope
	/*----------------------------------------------------*/

	$(window).load(function(){
	  var $container = $('.isotope-wrapper');
	  $container.isotope({ itemSelector: '.isotope-item', layoutMode: 'masonry' });
	});

	$('#filters a').click(function(e){
	  e.preventDefault();

	  var selector = $(this).attr('data-filter');
	  $('.projects.isotope-wrapper').isotope({ filter: selector });

	  $(this).parents('ul').find('a').removeClass('selected');
	  $(this).addClass('selected');
	});


	/*----------------------------------------------------*/
	/*  Magnific Popup
	/*----------------------------------------------------*/   
	  
	$('body').magnificPopup({
		 type: 'image',
		 delegate: 'a.mfp-gallery',

		 fixedContentPos: true,
		 fixedBgPos: true,

		 overflowY: 'auto',

		 closeBtnInside: true,
		 preloader: true,

		 removalDelay: 0,
		 mainClass: 'mfp-fade',

		 gallery:{enabled:true},

		 callbacks: {
			  buildControls: function() {
					console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
			  }
		 }
	});


	$('.popup-with-zoom-anim').magnificPopup({
		 type: 'inline',

		 fixedContentPos: false,
		 fixedBgPos: true,

		 overflowY: 'auto',

		 closeBtnInside: true,
		 preloader: false,

		 midClick: true,
		 removalDelay: 300,
		 mainClass: 'my-mfp-zoom-in'
	});


	$('.mfp-image').magnificPopup({
		 type: 'image',
		 closeOnContentClick: true,
		 mainClass: 'mfp-fade',
		 image: {
			  verticalFit: true
		 }
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		 disableOn: 700,
		 type: 'iframe',
		 mainClass: 'mfp-fade',
		 removalDelay: 160,
		 preloader: false,

		 fixedContentPos: false
	});



	/*----------------------------------------------------*/
	/* Sticky Kit
	/*----------------------------------------------------*/ 
	var winWidth = $(window).width();
	
	if(winWidth>768) {
		$(".sticky").stick_in_parent({
			 parent: '.sticky-wrapper',
			 offset_top: 20
		});

		$('.sticky')
		.on("sticky_kit:bottom", function(e) {
			 $(this).parent().css('position', 'static');
		})
		.on("sticky_kit:unbottom", function(e) {
			 $(this).parent().css('position', 'relative');
		});
	}
	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth < 769) {
			$(".sticky").trigger("sticky_kit:detach");
		} else {
			$(".sticky").stick_in_parent({
				 parent: '.sticky-wrapper',
				 offset_top: 20
			});

			$('.sticky')
			.on("sticky_kit:bottom", function(e) {
				 $(this).parent().css('position', 'static');
			})
			.on("sticky_kit:unbottom", function(e) {
				 $(this).parent().css('position', 'relative');
			});
		}
	});

	/*----------------------------------------------------*/
	/*  Before & After Slider
	/*----------------------------------------------------*/   

	$(window).load(function() {
		$(".before-after").twentytwenty();
	});


	/*----------------------------------------------------*/
	/*  Photo Grid
	/*----------------------------------------------------*/
	 $('body').imagesLoaded()
	     .always( function() {
		$('.small').photoGrid({
			rowHeight: $(window).height() / 4
		});

		$('.big').photoGrid({
		 	rowHeight: $(window).height() / 2
		});  

    });

	 $(window).resize(function (){
		$('.small').photoGrid({
			rowHeight: $(window).height() / 4
		});

		$('.big').photoGrid({
		 	rowHeight: $(window).height() / 2
		});  

	 });

	/*----------------------------------------------------*/
	/*  Tabs
	/*----------------------------------------------------*/ 

	var $tabsNav    = $('.tabs-nav'),
	$tabsNavLis = $tabsNav.children('li');

	$tabsNav.each(function() {
		 var $this = $(this);

		 $this.next().children('.tab-content').stop(true,true).hide()
		 .first().show();

		 $this.children('li').first().addClass('active').stop(true,true).show();
	});

	$tabsNavLis.on('click', function(e) {
		 var $this = $(this);

		 $this.siblings().removeClass('active').end()
		 .addClass('active');

		 $this.parent().next().children('.tab-content').stop(true,true).hide()
		 .siblings( $this.find('a').attr('href') ).fadeIn();

		 e.preventDefault();
	});
	var hash = window.location.hash;
	var anchor = $('.tabs-nav a[href="' + hash + '"]');
	if (anchor.length === 0) {
		 $(".tabs-nav li:first").addClass("active").show(); //Activate first tab
		 $(".tab-content:first").show(); //Show first tab content
	} else {
		 console.log(anchor);
		 anchor.parent('li').click();
	}


	/*----------------------------------------------------*/
	/*  Accordions
	/*----------------------------------------------------*/
	var $accor = $('.accordion');

	 $accor.each(function() {
		 $(this).addClass('ui-accordion ui-widget ui-helper-reset');
		 $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
		 $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
		 $(this).find("div").hide().first().show();
		 $(this).find("h3").first().removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-accordion-header-active ui-state-active ui-corner-top');
		 $(this).find("span").first().addClass('ui-accordion-icon-active');
	});

	var $trigger = $accor.find('h3');

	$trigger.on('click', function(e) {
		 var location = $(this).parent();

		 if( $(this).next().is(':hidden') ) {
			  var $triggerloc = $('h3',location);
			  $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
			  $triggerloc.find('span').removeClass('ui-accordion-icon-active');
			  $(this).find('span').addClass('ui-accordion-icon-active');
			  $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
		 }
		  e.preventDefault();
	});


	/*----------------------------------------------------*/
	/*  Filter by Price
	/*----------------------------------------------------*/
	$( "#slider-range" ).slider({
	  range: true,
	  min: 0,
	  max: 500,
	  values: [ 0, 500 ],
	  slide: function( event, ui ) {
		 event = event;
		 $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	  }
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	  " - $" + $( "#slider-range" ).slider( "values", 1 ) );


	/*----------------------------------------------------*/
	/*  Tooltips
	/*----------------------------------------------------*/

	$(".tooltip.top").tipTip({
	  defaultPosition: "top"
	});

	$(".tooltip.bottom").tipTip({
	  defaultPosition: "bottom"
	});

	$(".tooltip.left").tipTip({
	  defaultPosition: "left"
	});

	$(".tooltip.right").tipTip({
	  defaultPosition: "right"
	});


	/*----------------------------------------------------*/
	/*  Product Quantity
	/*----------------------------------------------------*/
	var thisrowfield;
	$('.qtyplus').click(function(e){
	  e.preventDefault();
	  thisrowfield = $(this).parent().parent().parent().find('.qty');

	  var currentVal = parseInt(thisrowfield.val());
	  if (!isNaN(currentVal)) {
		 thisrowfield.val(currentVal + 1);
	  } else {
		 thisrowfield.val(0);
	  }
	});

	$(".qtyminus").click(function(e) {
	  e.preventDefault();
	  thisrowfield = $(this).parent().parent().parent().find('.qty');
	  var currentVal = parseInt(thisrowfield.val());
	  if (!isNaN(currentVal) && currentVal > 0) {
		 thisrowfield.val(currentVal - 1);
	  } else {
		 thisrowfield.val(0);
	  }
	});


// ------------------ End Document ------------------ //
});

})(this.jQuery);