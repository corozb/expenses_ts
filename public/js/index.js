"use strict";
var btnAdd = document.querySelector('#bAdd');
var inputTitle = document.querySelector('#title');
var inputCost = document.querySelector('#cost');
var inputCurrency = (document.querySelector('#currency'));
var expenses = new Expenses('USD');
render();
btnAdd.addEventListener('click', function (e) {
    if (inputTitle.value !== '' &&
        inputCost.value !== '' &&
        !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = parseFloat(inputCost.value);
        var currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert('You need to complete all data');
    }
});
function render() {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var currency = cost.currency, number = cost.number;
        html += "\n      <div id='item'>\n        <div>\n          <span class='currency'>" + currency + "</span>\n          " + number + "\n        </div>\n        <div>" + title + "</div>\n        <div><button class='btnDelete' data-id=" + id + ">Delete</button></div>\n      </div>\n    ";
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.btnDelete').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            expenses.remove(+id);
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
