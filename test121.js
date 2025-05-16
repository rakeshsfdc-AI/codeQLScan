$.extend(Datepicker.prototype, {

    /* Class name added to elements to indicate already configured with a date picker. */

    markerClassName: 'hasDatepicker',

    //Keep track of the maximum number of rows displayed (see #7043)

    maxRows: 4,

    /* Debug logging (if enabled). */

    log: function() {

        if (this.debug)

            console.log.apply('', arguments);

    },

    // TODO rename to "widget" when switching to widget factory

    _widgetDatepicker: function() {

        return this.dpDiv;

    },

    /* Override the default settings for all instances of the date picker.

       @param  settings  object - the new settings to use as defaults (anonymous object)

       @return the manager object */

    setDefaults: function(settings) {

        extendRemove(this._defaults, settings || {});

        return this;

    },

    /* Attach the date picker to a jQuery selection.

       @param  target    element - the target input field or division or span

       @param  settings  object - the new settings to use for this date picker instance (anonymous) */

    _attachDatepicker: function(target, settings) {

        // check for settings on the control itself - in namespace 'date:'

        var inlineSettings = null;

        for (var attrName in this._defaults) {

            var attrValue = target.getAttribute('date:' + attrName);

            if (attrValue) {

                inlineSettings = inlineSettings || {};

                try {

                    inlineSettings[attrName] = eval(attrValue);

                } catch (err) {

                    inlineSettings[attrName] = attrValue;

                }

            }

        }

        var nodeName = target.nodeName.toLowerCase();

        var inline = (nodeName == 'div' || nodeName == 'span');

        if (!target.id) {

            this.uuid += 1;

            target.id = 'dp' + this.uuid;

        }

        var inst = this._newInst($(target), inline);

        inst.settings = $.extend({}, settings || {}, inlineSettings || {});

        if (nodeName == 'input') {

            this._connectDatepicker(target, inst);

        } else if (inline) {

            this._inlineDatepicker(target, inst);

        }

    },

    /* Create a new instance object. */

    _newInst: function(target, inline) {

        var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars

        return {
            id: id,
            input: target, // associated target

            selectedDay: 0,
            selectedMonth: 0,
            selectedYear: 0, // current selection

            drawMonth: 0,
            drawYear: 0, // month being drawn

            inline: inline, // is datepicker inline or not

            dpDiv: (!inline ? this.dpDiv : // presentation div

                bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
        };

    },

    /* Attach the date picker to an input field. */

    _connectDatepicker: function(target, inst) {

        var input = $(target);

        inst.append = $([]);

        inst.trigger = $([]);

        if (input.hasClass(this.markerClassName))

            return;

        this._attachments(input, inst);

        input.addClass(this.markerClassName).keydown(this._doKeyDown).

        keypress(this._doKeyPress).keyup(this._doKeyUp).

        bind("setData.datepicker", function(event, key, value) {

            inst.settings[key] = value;

        }).bind("getData.datepicker", function(event, key) {

            return this._get(inst, key);

        });

        this._autoSize(inst);

        $.data(target, PROP_NAME, inst);

        //If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)

        if (inst.settings.disabled) {

            this._disableDatepicker(target);

        }

    },

    /* Make attachments based on settings. */

    _attachments: function(input, inst) {

        var appendText = this._get(inst, 'appendText');

        var isRTL = this._get(inst, 'isRTL');

        if (inst.append)

            inst.append.remove();

        if (appendText) {

            inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');

            input[isRTL ? 'before' : 'after'](inst.append);

        }

        input.unbind('focus', this._showDatepicker);

        if (inst.trigger)

            inst.trigger.remove();

        var showOn = this._get(inst, 'showOn');

        if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field

            input.focus(this._showDatepicker);

        if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked

            var buttonText = this._get(inst, 'buttonText');

            var buttonImage = this._get(inst, 'buttonImage');

            inst.trigger = $(this._get(inst, 'buttonImageOnly') ?

                $('<img/>').addClass(this._triggerClass).

                attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) :

                $('<button type="button"></button>').addClass(this._triggerClass).

                html(buttonImage == '' ? buttonText : $('<img/>').attr(

                    {
                        src: buttonImage,
                        alt: buttonText,
                        title: buttonText
                    })));

            input[isRTL ? 'before' : 'after'](inst.trigger);

            inst.trigger.click(function() {

                if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])

                    $.datepicker._hideDatepicker();

                else if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {

                    $.datepicker._hideDatepicker();

                    $.datepicker._showDatepicker(input[0]);

                } else

                    $.datepicker._showDatepicker(input[0]);

                return false;

            });

        }

    }
})(jquery);
