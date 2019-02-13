/**
 * Created by Ali on 1/31/2019.
 */

(function() {

    'use strict';


    // Income Line Chart
    new Chartist.Line('#incomeChart', {
        labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [{
            name: 'Total Income',
            data: [7, 9, 8.5, 8, 7, 8, 6.5]
        }, {
            name: 'Tax',
            data: [5, 6, 6.5, 7, 5.5, 5, 4]
        }, {
            name: 'Net Income',
            data: [2, 3, 2, 1, 1.5, 3, 2.5]

        }
        ]
    });

    var $chart = $('#incomeChart');

    var $toolTip = $chart
        .append('<div class="tooltip"></div>')
        .find('.tooltip')
        .hide();

    $chart.on('mouseenter', '.ct-point', function() {
        var $point = $(this),
            value = $point.attr('ct:value'),
            seriesName = $point.parent().attr('ct:series-name');
        $toolTip.html(seriesName + '<br>' + value).show();
    });

    $chart.on('mouseleave', '.ct-point', function() {
        $toolTip.hide();
    });

    $chart.on('mousemove', function(event) {
        $toolTip.css({
            left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
            top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
        });
    });



    // Order Pie Chart
    // var data = {
    //     series: [5, 6, 9, 12, 6, 9, 4]
    // };
    //
    // var labels = ['Pending', 'Delivered', 'Canceled', 'New', 'Delivered with lost', 'In-kitchen', 'Delivered with complaint'],
    //     colors = ['c92ecb', '41b44e', '918e90', '4fa2d0', 'd62114', 'd0760b', '000000'];
    //
    // var sum = function(a, b) {
    //     return a + b
    // };
    //
    // new Chartist.Pie('#orderChart', data, {
    //     labelInterpolationFnc: function(value, index) {
    //         var label = labels[index];
    //         return Math.round(value / data.series.reduce(sum) * 100) + '% ' + label;
    //     },
    //     labelOffset: 100,
    //     chartPadding: 20
    // }).on('draw', function(context) {
    //     if (context.type === 'slice') {
    //         context.element.attr({
    //             style: 'fill: #'+ colors[context.index] +';'
    //         });
    //     } else if (context.type === 'label') {
    //         context.element.attr({
    //             style: 'stroke: #'+ colors[context.index] +';'
    //         });
    //     }
    // })


    var plot = $.plot('#flotPie', flotPieData, {
        series: {
            pie: {
                show: true,
                combine: {
                    color: '#999',
                    threshold: 0.1
                }
            }
        },
        legend: {
            show: false
        },
        grid: {
            hoverable: true,
            clickable: true
        }
    });

    $("#customerSearch").select2({
        placeholder: "Select a customer",
        allowClear: true,
        ajax: {
            url: 'https://api.github.com/search/repositories',
            dataType: 'json'
        },
        theme: "bootstrap"
    })

}).apply(this, [jQuery]);