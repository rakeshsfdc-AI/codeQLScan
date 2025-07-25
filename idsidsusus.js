  Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {

      var selector = Util.getSelectorFromElement(this);
 
      if (!selector) {

		  console.warn('Invalid or unsafe selector provided in data-target attribute.');

        return;

      }
 
      var target = $__default['default']($.find(selector))[0];
 
      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {

        return;

      }
 
      var config = _extends({}, $__default['default'](target).data(), $__default['default'](this).data());
 
      var slideIndex = this.getAttribute('data-slide-to');
 
      if (slideIndex) {

        config.interval = false;

      }
 
      Carousel._jQueryInterface.call($__default['default'](target), config);
 
      if (slideIndex) {

        $__default['default'](target).data(DATA_KEY$2).to(slideIndex);

      }
 
      event.preventDefault();

    };
 
