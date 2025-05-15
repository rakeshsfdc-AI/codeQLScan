function(input, inst) {

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
