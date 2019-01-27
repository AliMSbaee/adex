/**
 * Created by Ali on 1/26/2019.
 */

(function() {

    'use strict';



    // basic
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

            var addTitle = $(additions[key]).val(),
                addPrice = $(additions[key]).attr('data-addition-price');
            tableRows.each(function (key2) {
                if ($(tableRows[key2]).find('.td-title').text() === addTitle) {
                    var newQty =  parseInt($(this).find('.td-qty').text()) + 1;
                    $(this).find('.td-qty span').text(newQty);
                    $(this).find('.td-price').text(newQty*addPrice);
                    newAddition = false;
                }
            });

            if (newAddition) newReceiptRow(qty,addTitle,'-',addPrice*qty)
        });
    });

    function newReceiptRow (qty,title,size,piecePrice) {
        var record = $('<tr><td class="td-qty"><i class="fa fa-plus-circle qty-change-plus text-success"></i><span>'+qty+'</span><i class="fa fa-minus-circle qty-change-minus text-danger"></i></td> <td class="font-weight-bold td-title">'+title+'</td> <td class="td-size">'+size+'</td> <td class="td-price">'+qty*piecePrice+'</td> <td class="actions"> <a href="" class="delete-row text-danger"><i class="far fa-trash-alt"></i></a> </td> </tr>');
        record.appendTo($('#receipt'));
    }

    $('.customer-search-result').on('click',function () {
        var name = $(this).find('p.title').text(),
            phone = $(this).find('p.phone').text(),
            address = $(this).find('p.address').text(),
            customer = $('#customer-info');

        customer.find('.name').text(name);
        customer.find('.phone').text(phone);
        customer.find('.address').text(address);
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

    $(document).on('click','.delete-row',function () {
        $(this).parents('tr').remove()
    });


}).apply(this, [jQuery]);