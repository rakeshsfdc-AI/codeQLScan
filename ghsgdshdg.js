function(a) {
            var b = this._get(a, "altField");
            if (b) {
                var c = this._get(a, "altFormat") ||
                    this._get(a, "dateFormat"),
                    e = this._getDate(a),
                    f = this.formatDate(c, e, this._getFormatConfig(a));
                d(b).each(function() {
                    d(this).val(f)
                })
            }
        }
