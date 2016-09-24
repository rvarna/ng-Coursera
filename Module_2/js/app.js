(function(){
    var app = angular.module('ShoppingListCheckOff', []);
    var toBuyShoppingController = function(ShoppingListCheckOffService)
    {
        this.areAllItemsBought = false;
        this.items = ShoppingListCheckOffService.getItemsToBuy();
        this.buyItem = function(index)
        {
            ShoppingListCheckOffService.buyItem(index);
            this.areAllItemsBought = this.items.length === 0;
        }        
    };

    var alreadyBoughtShoppingController = function(ShoppingListCheckOffService){
        this.items = ShoppingListCheckOffService.getItemsBought();
        this.noItemsBoughtYet = ShoppingListCheckOffService.noItemsBoughtYet;
    }; 
    
    var ShoppingListCheckOffService = function()
    {
        var itemsToBuy = [
            {
                name : "Cookies",
                quantity: 10
            },
            {
                name : "Oranges",
                quantity: 10
            },
            {
                name : "Books",
                quantity: 5
            },
            {
                name : "Soda",
                quantity: 4
            },
            {
                name : "Plates",
                quantity: 5
            },
        ];

        var itemsBought = [];

        this.noItemsBoughtYet = true;
        this.getItemsToBuy = function()
        {
            return itemsToBuy;
        }

        this.getItemsBought = function()
        {
            return itemsBought;
        }
        
        this.buyItem = function(index)
        {
            itemsBought.push(itemsToBuy[index]);
            itemsToBuy.splice(index, 1);
            this.noItemsBoughtYet = false;
        }        
    };

    toBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    alreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

    app.controller("ToBuyShoppingController", toBuyShoppingController);
    app.controller("AlreadyBoughtShoppingController", alreadyBoughtShoppingController);
    app.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

})();