function(inst) {
		var altField = this._get(inst, 'altField');
		if (altField) { // update alternate field too
		//Validate altField to ensure it is a valid selector or DOM element
		if(typeof altField !== 'string' && !(altField instanceof HTMLElement)){
			this.log("Error: altField must be a valid CSS selector or DOM element,");
			return;
		}
		try{
			var $altField = $(altField);
			if($altField.length === 0){
				this.log("Warning: altField does not match any elements.");
				return;
			}
		
			var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
			var date = this._getDate(inst);
			var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$altField.each(function() { $(this).val(dateStr); });
		}catch(e){
			this.log("Error: Invalid altField value.", e);
		}
		}
	}
