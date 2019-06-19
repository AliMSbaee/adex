/**
 * Created by Ali.Elsbaee on 4/24/2019.
 */

(function() {
  "use strict";

  var orders = {},
    receipt = $("#receipt").find("tbody"),
    orderDetails = $("#orderDetails").find("tbody");

  window.chooseOrder = function(orderBtn) {
    let $this = $(orderBtn),
      orderId = $this.attr("id");
    $this
      .parent()
      .addClass("active")
      .siblings()
      .removeClass("active");
    $this.find("span.badge").fadeOut();
    return updateOrderTable(orderId);
  };

  var updateOrderTable = function(orderId) {
    var order = orders[orderId];

    receipt.empty();
    orderDetails.find("#orderId").text(orderId);
    orderDetails.find("#orderDateTime").text(order.dateTime);
    orderDetails.find("#orderClientName").text(order.clientName);
    orderDetails.find("#orderArea").text(order.area);

    $.each(order.items, function(key, value) {
      var row = $("<tr></tr>").append(
        "<td>" +
          value.qty +
          "</td><td>" +
          value.name +
          "</td><td>" +
          value.size +
          "</td>"
      );
      row.appendTo(receipt);
    });
  };

  var createOrderCard = function(
    id,
    clientName,
    dateTime,
    newStatus,
    expectedTime,
    status
  ) {
    var timeOfOrder = new Date(dateTime).getTime(),
      spentTime = (Date.now() - timeOfOrder) / 60000;
    var orderCard = $(
      '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 px-2 ' +
        (status === "cancelled"
          ? "order-cancelled"
          : spentTime > expectedTime
          ? "order-danger"
          : "order-primary") +
        ' order-card">' +
        '<a href="#" role="button" id=' +
        id +
        ' onclick="chooseOrder(this)">' +
        '<section class="card text-center mt-4 text-color-quaternary">' +
        '<header class="card-header p-0">' +
        (newStatus ? '<span class="badge bg-success m-0">New</span>' : "") +
        '<h2 class="m-2">654315</h2>' +
        "</header>" +
        '<div class="card-body p-2">' +
        '<h4 class="font-weight-semibold m-0">' +
        clientName +
        "</h4>" +
        (status === "cancelled"
          ? '<h3 class="m-0 font-weight-bold">Cancelled</h3>'
          : '<h3 class="m-0 font-weight-bold timer"></h3>') +
        "</div>" +
        "</section>" +
        "</a>" +
        "</div>"
    );
    return orderCard;
  };

  var updateOrdersCards = function(newOrders) {
    $.each(newOrders, function(key, value) {
      if (!orders.hasOwnProperty(key)) {
        newOrders[key].new = true;
        orders[key] = newOrders[key];
      }
      var orderCard = createOrderCard(
        key,
        orders[key].clientName,
        orders[key].dateTime,
        orders[key].new,
        orders[key].expectedTime,
        orders[key].status
      );
      value.new = false;
      $("#orderCardsWrapper").append(orderCard);
      orderCard.find(".timer").countimer({
        initSeconds:
          (Date.now() - new Date(orders[key].dateTime).getTime()) / 1000
      });
    });
  };

  $(document).ready(function() {
    //---------------- Ajax call here each 60 sec
    //---------------- Success:
    //------------ After success you have to update orders using updateOrdersCards() function

    var newOrders = {
      1846464: {
        dateTime: "12 june 2019  15:14:00",
        clientName: "Omar Negm",
        area: "Maadi-Cairo",
        expectedTime: 100,
        status: "running",
        items: {
          1: {
            name: "Chicken Nuggets",
            qty: 1,
            size: "large"
          },
          2: {
            name: "Meat balls",
            qty: 4,
            size: "small"
          },
          3: {
            name: "Burger",
            qty: 2,
            size: "medium"
          }
        }
      },
      1846465: {
        dateTime: "21 May 2019  01:13:00",
        clientName: "Fatma Zayed",
        area: "Cairo-Egypt",
        expectedTime: 60,
        status: "cancelled",
        items: {
          1: {
            name: "Chicken Burger",
            qty: 7,
            size: "large"
          },
          2: {
            name: "Nodels",
            qty: 3,
            size: "small"
          },
          3: {
            name: "Shawerma",
            qty: 6,
            size: "medium"
          }
        }
      },
      1846466: {
        dateTime: "21 May 2019 05:13:00",
        clientName: "Ali Sbaee",
        area: "Mansoura-Egypt",
        expectedTime: 20,
        status: "running",
        items: {
          1: {
            name: "Chicken Burger",
            qty: 7,
            size: "large"
          },
          2: {
            name: "Nodels",
            qty: 3,
            size: "small"
          },
          3: {
            name: "Shawerma",
            qty: 6,
            size: "medium"
          },
          4: {
            name: "Chicken Burger",
            qty: 7,
            size: "large"
          },
          5: {
            name: "Nodels",
            qty: 3,
            size: "small"
          },
          6: {
            name: "Shawerma",
            qty: 6,
            size: "medium"
          },
          7: {
            name: "Chicken Burger",
            qty: 7,
            size: "large"
          },
          8: {
            name: "Nodels",
            qty: 3,
            size: "small"
          },
          9: {
            name: "Shawerma",
            qty: 6,
            size: "medium"
          },
          10: {
            name: "Chicken Burger",
            qty: 7,
            size: "large"
          },
          11: {
            name: "Nodels",
            qty: 3,
            size: "small"
          },
          12: {
            name: "Shawerma",
            qty: 6,
            size: "medium"
          },
          13: {
            name: "Chicken Burger",
            qty: 7,
            size: "large"
          },
          14: {
            name: "Nodels",
            qty: 3,
            size: "small"
          },
          15: {
            name: "Shawerma",
            qty: 6,
            size: "medium"
          }
        }
      }
    };
    updateOrdersCards(newOrders);

    $("#print").click(function() {
      $("#kitchenInnerMenu").printThis({
        importCSS: true,
        importStyle: true, //thrown in for extra measure
        loadCSS: "file:///D:/Work/Freelance/Omar%20Negm/adex/css/print.css",
        header:
          "<div class='logo-print'><img src='file:///D:/Work/Freelance/Omar%20Negm/adex/img/logo-default.png'></div>"
      });
    });
  });
}.apply(this, [jQuery]));
