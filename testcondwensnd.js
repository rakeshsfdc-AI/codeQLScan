 function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
		//validate that altField is a valid CSS selector or DOM element 
		if(typeof altField === 'string'){
			if(!/^[a-zA-Z0-9_\-#.:]+$/.test(altField) || $(altField).length === 0 ){
				console.warn("Invalid or unsafe altField selector:", altField);
				return;
			     }
			}else if(!(altField instanceof HTMLElement)){
				console.warn("altField is not a valid DOM element:", altField);
				return;
			}
		
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	}
