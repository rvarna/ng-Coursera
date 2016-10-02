(function () {
    'use strict';
    var app = angular.module('NarrowItDownApp', []);
    var narrowItDownController = function(MenuSearchService)
    {
        var controller = this;
        controller.foundItems = [];
        controller.searchTerm = "";
        controller.nothingFoundMessage = "";
        controller.getFoundItems = function(searchTerm)
        {
            if (searchTerm == undefined || searchTerm.trim() === '')
            {
                controller.nothingFoundMessage = "Nothing found";
            }
            else
            {
                controller.nothingFoundMessage = "";
                MenuSearchService.getMatchedMenuItems(searchTerm).then(function(result)
                {
                    controller.foundItems = result;
                    if (controller.foundItems.length === 0)
                    {
                        controller.nothingFoundMessage = "Nothing found";
                    }
                });
            }
            
        };

        this.removeItem = function (itemIndex) {
            this.foundItems.splice(itemIndex, 1);
        };
    };

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemsList.html',
            scope: {
            foundItems: '<',
            onRemove: '&'
            }
        };

        return ddo;
    };

    function MenuSearchService ($http) {
        this.getMatchedMenuItems = function(searchTerm)
        {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
                })
                .then(function (response){
                    console.log(response.data.menu_items.length);
                    var foundItems = response.data.menu_items.filter(function (item)
                    {
                        return item.description.toLowerCase().indexOf(searchTerm) !== -1;
                    });

                    console.log(foundItems.length);
                    return foundItems;
                });
        };
    };
    
    narrowItDownController.$inject = ['MenuSearchService'];
    MenuSearchService.$inject = ['$http'];
    app.controller("NarrowItDownController", narrowItDownController);
    app.service("MenuSearchService", MenuSearchService);
    app.directive("foundItems", FoundItemsDirective)
})();