(function () {
    'use strict';
    var app = angular.module('ShoppingListCheckOff', []);
    var toBuyShoppingController = function (ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getItemsToBuy();
        this.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        };

        this.areAllItemsBought = function () {
            return this.items.length === 0;
        };
    };

    var alreadyBoughtShoppingController = function (ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getItemsBought();
        this.noItemsBought = function () {
            return this.items.length === 0;
        };
    };

    var ShoppingListCheckOffService = function () {
        var itemsBought = [];
        var itemsToBuy = [
            {
                name: "Cookies",
                quantity: 10
            },
            {
                name: "Oranges",
                quantity: 10
            },
            {
                name: "Books",
                quantity: 5
            },
            {
                name: "Soda",
                quantity: 4
            },
            {
                name: "Plates",
                quantity: 5
            }
        ];

        this.getItemsToBuy = function () {
            return itemsToBuy;
        };

        this.getItemsBought = function () {
            return itemsBought;
        };

        this.buyItem = function (index) {
            itemsBought.push(itemsToBuy[index]);
            itemsToBuy.splice(index, 1);
        };
    };

    toBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    alreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

    app.controller("ToBuyShoppingController", toBuyShoppingController);
    app.controller("AlreadyBoughtShoppingController", alreadyBoughtShoppingController);
    app.service("ShoppingListCheckOffService", ShoppingListCheckOffService);
})();