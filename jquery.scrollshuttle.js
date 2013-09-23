/**
  *
  * ScrollShuttle 1.0.0
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */
(function($){
	$.scrollshuttle = function(options)
	{
		options = $.extend({
			container: '.scrollshuttle',
			content: false,
			duration: 500,
			previousTrigger: '.scrollshuttle-previous',
			nextTrigger: '.scrollshuttle-next'
		}, options);

		var shuttle = (function()
		{
			var shuttleContainer = $(options.container);
			var shuttleInner = shuttleContainer.find(options.content);

			function next()
			{
				newScrollLeft = shuttleContainer.scrollLeft() + (shuttleContainer.outerWidth() - 200);
				shuttleContainer.stop().animate({scrollLeft: newScrollLeft}, options.duration);
			}

			function previous()
			{
				newScrollLeft = shuttleContainer.scrollLeft() - (shuttleContainer.outerWidth() - 200);
				shuttleContainer.stop().animate({scrollLeft: newScrollLeft}, options.duration);
			}

			return {
				next: next,
				previous: previous
			};
		}());

		$(document).on('click', options.nextTrigger, function(e)
		{
			shuttle.next();
			e.preventDefault();
		});

		$(document).on('click', options.previousTrigger, function(e)
		{
			shuttle.previous();
			e.preventDefault();
		});

		return {
			next: shuttle.next,
			previous: shuttle.previous
		};
	};
})(jQuery);