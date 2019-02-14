/**
 * Created by Ali.Elsbaee on 2/13/2019.
 */

(function () {

    'use strict';

    $(document).on('click','.delete-row',function () {
        $(this).magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in',
            modal: true
        }).magnificPopup('open');

        $(document).on('click', '.modal-confirm', function (e) {
            e.preventDefault();
            $.magnificPopup.instance.st.el.closest('tr').remove();
            $.magnificPopup.close();
        });
    });

}).apply(this, [jQuery]);