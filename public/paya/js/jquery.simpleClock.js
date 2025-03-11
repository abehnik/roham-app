(function ($) {
    // jQuery plugin definition  
    var SimpleClock = function (element, options) {
        //default options go here.
        var defaultOptions = {};

        var $element = $(element);
        var obj = this;
        var params = $.extend(defaultOptions, options || {});
        setInterval(function() {
            var today = new Date();
            $element.text(today.toLocaleTimeString());
        }, 1000);
    };
    $.fn.simpleClock = function (options) {
        return this.each(function () {
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data("simpleClock")) return;

            // pass options to plugin constructor
            var clock = new SimpleClock(this, options);

            // Store plugin object in this element's data
            element.data("simpleClock", clock);
        });
    };
})(jQuery);