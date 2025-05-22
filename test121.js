 _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);
 
      if (!selector) {
		  console.warn('Invalid or unsafe selector provided in data-target attribute.');
        return;
      }
 
      var target = $__default['default'](selector)[0];
}
