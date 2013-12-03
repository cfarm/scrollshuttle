/**
  *
  * ScrollShuttle 1.2.0
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
      scrollOffset: 200,
      scrollMax: false,
      scrollMin: false,
			previousTrigger: '.scrollshuttle-previous',
			nextTrigger: '.scrollshuttle-next'
		}, options);

		var shuttle = (function() {
			var shuttleContainer = $(options.container);
			var shuttleInner = shuttleContainer.find(options.content);

			function next()
			{
				newScrollLeft = shuttleContainer.scrollLeft() + calculateOffset();
				shuttleContainer.stop().animate({scrollLeft: newScrollLeft}, options.duration);
			}

			function previous()
			{
				newScrollLeft = shuttleContainer.scrollLeft() - calculateOffset();
				shuttleContainer.stop().animate({scrollLeft: newScrollLeft}, options.duration);
			}

      function calculateOffset() {
        var offset = 0;

        if ( options.scrollOffset.toString().substr(-1) == '%' ) {
          offset = shuttleContainer.outerWidth() - (shuttleContainer.outerWidth() * (parseInt(options.scrollOffset)/100));
        } else {
          offset = shuttleContainer.outerWidth() - options.scrollOffset;
        }

        if ( options.scrollMax && offset > options.scrollMax ) offset = options.scrollMax;
        if ( options.scrollMin && offset < options.scrollMin ) offset = options.scrollMin;
        
        return offset;
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