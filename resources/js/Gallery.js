var Gallery = function() {};
Gallery.prototype = {
	VERSION: '1.0.0',
	IMAGES_FETCH_URL: 'resources/js/mock_images_call.json',
	SELECTORS: {
		MAIN: '.gallery-main',
		IMAGE_LIST: '.gallery-image-list',
		THUMB: '.gallery-image-container',
		SELECTED_IMG: '.gallery-selected-image',
		TOGGLE: '.gallery-image-list-toggle'
	},

	images: [], //populated by data call

	init: function() {
		var me = this;

		$( document ).ready(function() {
			me.attachClickHandlers();
			me.getSelectedGameImages();
		});
	},

	attachClickHandlers: function() {
		var me = this;

		//toggle click handler
		$(this.SELECTORS.TOGGLE).on('click', function(e) {
			me.onToggleClick.call(me, e);
		});
	},

	getSelectedGameImages: function() {
		var me = this;

		//ajax request with mock data to get the images for whichever game the user has navigation to (hardcoded for this exercise)
		//I commented out the call and made it just a var for convenience, since you could get cross-origin errors without proper setup

		// $.getJSON(me.IMAGES_FETCH_URL, {format: 'json'}, function(data) {
		// 		me.onGetSelectedGameImagesSuccess(data);
		// 	})
		//     .fail(function(error) {
		//     	me.onGetSelectedGameImagesFailure(error);
		//     });

		//just call this for convenience
		me.onGetSelectedGameImagesSuccess(mockResponse);
	},

	onGetSelectedGameImagesSuccess: function(data) {
		var me = this;
		me.images = data.response;
		for(var i = 0; i < me.images.length; i++) {
			me.renderThumb(me.images[i]);
		}

		this.attachThumbHandlers();
	},

	onGetSelectedGameImagesFailure: function(error) {
		//simple error output for now...
		alert('Shazbot! ' + error.statusText);
		console.error('Shazbot! ', error);
	},

	renderThumb: function(image) {
		var me = this;
		//hardcoded template for this exercise, but would have it an .html external from this file along with other tpls
		$(me.SELECTORS.IMAGE_LIST).append(
			'<li class="gallery-image-container" data-full-src="' + image.location + '/' + image.file + '">' +
				'<img src="' + image.location + '/thumbs/' + image.file + '"/>' +
				'<span class="image-title">' + image.title + '</span>' +
			'</li>'
		);
	},

	attachThumbHandlers: function() {
		var me = this;
		$(me.SELECTORS.THUMB).on('click', function(e) {
			me.onThumbClick.call(me, e);
		});
	},

	onThumbClick: function(e) {
		//deselect previous
		$(this.SELECTORS.THUMB).removeClass('selected');
		//select current
		$(e.delegateTarget).addClass('selected');

		//apply full image to src of the selected img tag
		var fullImageSrc = $(e.delegateTarget).attr('data-full-src');
		$(this.SELECTORS.MAIN).addClass('selected');
		$(this.SELECTORS.SELECTED_IMG).attr('src', fullImageSrc).fadeIn();
	},

	onToggleClick: function(e) {
		$(this.SELECTORS.IMAGE_LIST).toggleClass('closed');
	}
};

var gallery = new Gallery();
gallery.init();