/* global angular */
angular.module("tomaTort")
.factory("cart", function () {
  var cartData = [];
  
  return {
    addProduct: function (id, name, price, set, imageUrl) {
      var addedToExistingItem = false;
      var startCount = (set == 'кг') ? 2 : 1;
      
      for (var i = 0; i < cartData.length; i++) {
        if (cartData[i].id == id && cartData[i].set == set) {
          cartData[i].count++;
          addedToExistingItem = true;
          break;
        }
      }
      
      if (!addedToExistingItem) {
        cartData.push({
          count: startCount, 
          id: id, 
          name: name, 
          price: price,
          set: set,
          imageUrl: imageUrl
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
    template: "( {{ 0 || productCount() }} )",
    controller: function ($scope) {
      var cartData = cart.getProducts();
      
      $scope.productCount = function () {
        return cartData.length;
      };
    }
  };
});