/**
 * Created by Ali on 1/26/2019.
 */

(function() {

    'use strict';


    $('.add-meal').on('click',function () {
        var modal = $(this).closest('.modal-block'),
            title = modal.find('.card-title').text(),
            size = modal.find('.meal-size').val(),
            qty = parseInt(modal.find('.spinner-input').val()),
            additions = modal.find('.additions option:selected'),
            piecePrice = parseInt(modal.find('.meal-size option:selected').attr('data-price')),
            newMeal = true,
            newAddition = true;

        var tableRows = $('#receipt').find('tr');
        tableRows.each(function (key) {
            if ($(tableRows[key]).find('.td-title').text() === title) {
                if ($(tableRows[key]).find('.td-size').text() === size) {
                    var newQty =  parseInt($(this).find('.td-qty').text()) + qty;
                    $(this).find('.td-qty span').text(newQty);
                    $(this).find('.td-price').text(newQty*piecePrice);
                    newMeal = false;
                }
            }
        });
        if (newMeal) newReceiptRow(qty,title,size,piecePrice);


        additions.each(function (key) {
            var addTitle = $(additions[key]).text(),
                addPrice = $(additions[key]).attr('data-addition-price');
            tableRows.each(function (key) {
                if ($(tableRows[key]).find('.td-title').text() === addTitle) {
                    newAddition = false;
                    var newQty =  parseInt($(this).find('.td-qty').text()) + qty;
                    $(this).find('.td-qty span').text(newQty);
                    $(this).find('.td-price').text(newQty*addPrice);
                    return false;
                }
            });
            if (newAddition) {
                newReceiptRow(qty,addTitle,'-',addPrice);
            }
            newAddition = true;
        });
    });

    function newReceiptRow (qty,title,size,piecePrice) {
        var record = $('<tr><td class="td-qty"><i class="fa fa-plus-circle qty-change-plus text-success"></i><span>'+qty+'</span><i class="fa fa-minus-circle qty-change-minus text-danger"></i></td> <td class="font-weight-bold td-title">'+title+'</td> <td class="td-size">'+size+'</td> <td class="td-price">'+qty*piecePrice+'</td> <td class="actions"> <a href="#reportOrder" class="ws-normal report-order"><i class="far fa-flag"></i></a><a href="#confirmDelete" class="ws-normal delete-row text-danger"><i class="far fa-trash-alt"></i></a> </td> </tr>');
        record.appendTo($('#receipt'));
    }




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
            modal: true,
        }).magnificPopup('open');

        $(document).on('click', '.modal-confirm', function (e) {
            e.preventDefault();
            $.magnificPopup.instance.st.el.closest('tr').remove();
            $.magnificPopup.close();
        });
    });



    $(document).on('click','.report-order',function () {
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
            modal: true,
        }).magnificPopup('open');

        $(document).on('click', '.modal-confirm', function (e) {
            e.preventDefault();
            $.magnificPopup.instance.st.el.closest('tr').remove();
            $.magnificPopup.close();
        });
    });






    $(document).on('click','.qty-change-plus',function () {
        var qty = parseInt($(this).siblings('span').text()),
            tr = $(this).parents('tr'),
            piecePrice = parseInt(tr.find('.td-price').text())/qty;
        $(this).siblings('span').text(++qty);
        updatePrice(tr,piecePrice*qty);
    });

    $(document).on('click','.qty-change-minus',function () {
        var qty = parseInt($(this).siblings('span').text()),
            tr = $(this).parents('tr'),
            piecePrice = parseInt(tr.find('.td-price').text())/qty;
        if (qty !== 1) {
            $(this).siblings('span').text(--qty);
            updatePrice(tr,piecePrice*qty);
        }
    });

    function updatePrice(target,price) {
        target.find('.td-price').text(price);
    }














    //Customer Search
    var data = [{
        id: 0,
        text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
        html: '<p class="customer-name text-primary h5 font-weight-bold m-0">Ali Muhammad</p><p class="customer-phone m-0"><i class="fas fa-phone-square mr-1"></i>01012537756</p><p class="customer-address m-0"><i class="fas fa-map-marker-alt mr-1"></i>Adab st Mansoura, Egypt</p>',
        title: 'Ali Muhammad',
        phone: '01012537756',
        address: 'Adab st Mansoura, Egypt'
    }, {
        id: 1,
        text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
        html: '<p class="customer-name text-primary h5 font-weight-bold m-0">Ali Muhammad</p><p class="customer-phone m-0"><i class="fas fa-phone-square mr-1"></i>01012537756</p>',
        title: 'Ali Muhammad',
        phone: '01012537756',
        children: [{
            id: 2,
            text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
            html: '<p class="customer-address m-0 ml-3"><i class="fas fa-map-marker-alt mr-1"></i>Adab st Mansoura, Egypt</p>',
            title: 'Ali Muhammad',
            phone: '01012537756',
            address: 'Adab st Mansoura, Egypt'
        }, {
            id: 3,
            text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
            html: '<p class="customer-address m-0 ml-3"><i class="fas fa-map-marker-alt mr-1"></i>Tahreer Square Cairo, Egypt</p>',
            title: 'Ali Muhammad',
            phone: '01012537756',
            address: 'Tahreer Square Cairo, Egypt'
        }]
    }, {
        id: 4,
        text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
        html: '<p class="customer-name text-primary h5 font-weight-bold m-0">Ali Muhammad</p><p class="customer-phone m-0"><i class="fas fa-phone-square mr-1"></i>01012537756</p><p class="customer-address m-0"><i class="fas fa-map-marker-alt mr-1"></i>Adab st Mansoura, Egypt</p>',
        title: 'Ali Muhammad',
        phone: '01012537756',
        address: 'Adab st Mansoura, Egypt'
    }, {
        id: 5,
        text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
        html: '<p class="customer-name text-primary h5 font-weight-bold m-0">Ali Muhammad</p><p class="customer-phone m-0"><i class="fas fa-phone-square mr-1"></i>01012537756</p>',
        title: 'Ali Muhammad',
        phone: '01012537756',
        children: [{
            id: 6,
            text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
            html: '<p class="customer-address m-0 ml-3"><i class="fas fa-map-marker-alt mr-1"></i>Adab st Mansoura, Egypt</p>',
            title: 'Ali Muhammad',
            phone: '01012537756',
            address: 'Adab st Mansoura, Egypt'
        }, {
            id: 7,
            text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
            html: '<p class="customer-address m-0 ml-3"><i class="fas fa-map-marker-alt mr-1"></i>Tahreer Square Cairo, Egypt</p>',
            title: 'Ali Muhammad',
            phone: '01012537756',
            address: 'Tahreer Square Cairo, Egypt'
        }]
    }, {
        id: 8,
        text: '<p class="customer-name text-primary font-weight-bold m-0">Ali Muhammad</p>',
        html: '<p class="customer-name text-primary h5 font-weight-bold m-0">Ali Muhammad</p><p class="customer-phone m-0"><i class="fas fa-phone-square mr-1"></i>01012537756</p><p class="customer-address m-0"><i class="fas fa-map-marker-alt mr-1"></i>Adab st Mansoura, Egypt</p>',
        title: 'Ali Muhammad',
        phone: '01012537756',
        address: 'Adab st Mansoura, Egypt'
    }];

    $("#customerSearch").select2({
        placeholder: "Select a customer",
        allowClear: true,
        data: data,
        escapeMarkup: function(markup) {
            return markup;
        },
        templateResult: function(data) {
            return data.html;
        },
        templateSelection: function(data) {
            return data.text;
        },
        theme: "bootstrap"
    }).on('select2:select', function (e) {
        $('#customerInfoPhone').text(e.params.data.phone);
        $('#customerInfoAddress').text(e.params.data.address);
    })
}).apply(this, [jQuery]);