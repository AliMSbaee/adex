/* Add here all your JS customizations */
(function ($) {
    $('#ApplyDiscountCheckbox').on('change', function () {
        var dropdown = $('#discountsDropdown');
        if (this.checked) {
            dropdown.fadeIn(100);
        } else {
            dropdown.fadeOut(100);
        }
    })
}).apply(this, [jQuery]);