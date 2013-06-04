(function ($) {
    var options = {
        selector: 'a.zoom',
        wrapper: 'vidra-zoom-wrapper',
        close: '#zoom-container a.close',
        eventTrigger: '#product-image-overlay',
    }

    var methods = {
        init: function (config) {

            var zoomTrigger = $(options.eventTrigger);
            zoomTrigger.bind('click', methods.onZoomTriggerClick);

            /* Get Options */
            options = $.extend({}, options, config);

            return this.each(function () {
                var selector = $(this);
                selector.bind('click', methods.onClick);
            });
        },
        onZoomTriggerClick: function (e) {
            e.preventDefault();

            var selected = $('#product-image-slider .item-slider.active a');
            selected.click();
        },
        onClick: function (e) {
            e.preventDefault();

            var selected = $(e.currentTarget);
            var href = selected.attr('href');

            methods._showZoom(href);
        },
        onCloseClick: function (e) {
            // Autodescruction
            e.preventDefault();

            var wrapper = $('#' + options.wrapper);

            wrapper.fadeOut(function () {
                wrapper.remove();
            });
        },
        onMouseMove: function (e) {
            var wrapper = $(e.currentTarget);
            var image = wrapper.children("img");

            var imgHeight = image.height();
            var wrapperHeight = wrapper.height();

            var scrollBy = (e.pageY) * (imgHeight - wrapperHeight) / wrapperHeight;
            image.css('top', -scrollBy);
        },
        _showZoom: function (href) {
            console.log('showZoom');

            var zoom = $('<div />').attr('id', options.wrapper);
            var img = $('<img />').attr('src', href);
            var close = $('<a href="#" />').addClass('close smaller-title dark').text('X CLOSE');

            zoom.append(img);
            zoom.append(close);

            $('body').append(zoom);

            zoom.fadeIn();
            zoom.bind('mousemove', methods.onMouseMove);
            close.bind('click', methods.onCloseClick);
        }
    };

    $.fn.vidraZoom = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.vidra.zoom');
        }
    };

})(jQuery);
