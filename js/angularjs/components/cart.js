/* global angular */
angular.module("tomaTort")
.factory("cart", function () {
  var cartData = [];
  
  return {
    addProduct: function (id, name, price, weight) {
      var addedToExistingItem = false;
      for (var i = 0; i < cartData.length; i++) {
        if (cartData[i].id == id) {
          cartData[i].count++;
          addedToExistingItem = true;
          break;
        }
      }
      if (!addedToExistingItem) {
        cartData.push({
          count: 1, id: id, price: price, name: name, weight: weight
        });
      }
    },
    
    removeProduct: function (id) {
      for (var i = 0; i < cartData.length; i++) {
        if (cartData[i].id == id) {
          cartData.splice(i, 1);
          break;
        }
      }
    },
    
    getProducts: function () {
      return cartData;
    }
  };
})
.directive("cartSummary", function (cart) {
  return {
    restrict: "E",
    template: "( {{ 0 || itemCount() }} )",
    controller: function ($scope) {
      var cartData = cart.getProducts();
      
      $scope.total = function () {
        var total = 0;
        for (var i = 0; i < cartData.length; i++) {
          total += (cartData[i].price * cartData[i].count);
        }
        return total;
      };
      
      $scope.itemCount = function () {
        var total = 0;
        for (var i = 0; i < cartData.length; i++) {
          total += cartData[i].count;
        }
        return total;
      };
    }
  };
});