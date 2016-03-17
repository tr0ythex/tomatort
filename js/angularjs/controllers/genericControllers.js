/* global angular */
angular.module("tomaTort")
.constant("menuActiveClass", "li-active")
.constant("instagramLink", "https://www.instagram.com/_tomatort_")
.factory("menu", function (menuActiveClass) {
  
  var selectedMenuItem = '';
  
  return {
    selectMenuItem: function (menuItem) {
      selectedMenuItem = menuItem;
    },
    getMenuClass: function (menuItem) {
      return selectedMenuItem == menuItem ? menuActiveClass : "";
    }
  };
})
.controller("menuCtrl", function ($scope, $location, menu) {
  
  menu.selectMenuItem($location.path());
  
  $scope.selectMenuItem = function (menuItem) {
    menu.selectMenuItem(menuItem);
  };
  
  $scope.getMenuClass = function (menuItem) {
    return menu.getMenuClass(menuItem);
  };
})
.controller("productCtrl", function ($scope, $location) {
  // if page is refreshed
  var pId = $location.path().split("/")[2];
  $scope.selectedProduct = $scope.getProduct(pId);
})
.controller("tomaTortCtrl", function ($scope, $location, menuActiveClass, cart,
  instagramLink) {
    
  $scope.instagramLink = instagramLink;
  
  $scope.data = {
    products: [
      {"id": 1, "name": "Томаторт", "kgPrice": 1500,
       "imageUrl": "/images/products/napoleon.jpg"},
      {"id": 2, "name": "Чизкейк", "kgPrice": 1700,
       "imageUrl": "/images/products/zhele.jpg"},
      {"id": 3, "name": "Тирамису", "kgPrice": 1700,
       "imageUrl": "/images/products/pastila.jpg"},
      {"id": 4, "name": "Красный бархат", "kgPrice": 1500,
       "imageUrl": "/images/products/doughnut.jpg"},
      {"id": 5, "name": "Брауни", "kgPrice": 1500,
       "imageUrl": "/images/products/eclair.jpg"},
      {"id": 6, "name": "Медовик", "kgPrice": 1500, 
       "imageUrl": "/images/products/waffles.jpg"},
      {"id": 7, "name": "Наполеон", "kgPrice": 1500,
       "imageUrl": "/images/products/sufle.jpg"},
      {"id": 8, "name": "Птичье молоко", "kgPrice": 1500,
       "imageUrl": "/images/products/pirozhnoe.jpg"},
      {"id": 9, "name": "Анна Павлова", "kgPrice": 1500,
       "imageUrl": "/images/products/marmelad.jpg"},
      {"id": 10, "name": "Прага", "kgPrice": 1500,
       "imageUrl": "/images/products/halva.jpg"},
      {"id": 11, "name": "Морковный торт", "kgPrice": 1500,
       "imageUrl": "/images/products/halva.jpg"},
      {"id": 12, "name": "Капкейки", "9setPrice": 1800, 
       "12setPrice": 2400, "imageUrl": "/images/products/halva.jpg"},
      {"id": 13, "name": "Кейкпопсы", "9setPrice": 1800, 
       "12setPrice": 2400, "imageUrl": "/images/products/halva.jpg"},
      {"id": 14, "name": "Яблоки в карамели", "9setPrice": 1500, 
       "12setPrice": 2000, "imageUrl": "/images/products/halva.jpg"},
      {"id": 15, "name": "Тирамису в стаканчика", "9setPrice": 2000, 
       "12setPrice": 2700, "imageUrl": "/images/products/halva.jpg"},
      {"id": 16, "name": "Пирожные", "9setPrice": 2000, 
       "12setPrice": 2700, "imageUrl": "/images/products/halva.jpg"},
      {"id": 17, "name": "Кексы/маффины", "9setPrice": 1500, 
       "12setPrice": 2000, "imageUrl": "/images/products/halva.jpg"}
    ],
    shipping: {
      deliveryType: 'selfPickup',
      sent: false
    }
  };
  $scope.getProduct = function (pId) {
    for (var i = 0; i < $scope.data.products.length; i++) {
      if ($scope.data.products[i].id == pId) {
        return $scope.data.products[i];
      }
    }
  };
  $scope.setOrdered = function (product_id) {
    for (var i = 0; i < $scope.data.products.length; i++) {
      if ($scope.data.products[i].id === product_id) {
        $scope.data.products[i].ordered = true;
      }
    }
  };
  $scope.sendShip = function (deliveryForm) {
    if (deliveryForm.$valid) {
      $scope.data.shipping.sent = true;
    } else {
      $scope.showValidation = true;
    }
  };
  $scope.addToCart = function (product) {
    cart.addProduct(product.id, product.name, product.price, 
                    product.weight, product.imageUrl);
  };
  $scope.openProductItemPage = function (product) {
    $scope.selectedProduct = product;
    $location.path("/menu/" + product.id);
  };
})
.controller("checkoutCtrl", function ($scope, cart) {
  $scope.cartData = cart.getProducts();
  $scope.total = function () {
    var total = 0;
    for (var i = 0; i < $scope.cartData.length; i++) {
      total += ($scope.cartData[i].price * $scope.cartData[i].count);
    }
    return total;
  };
  $scope.remove = function (id) {
    cart.removeProduct(id);
  };
})
.controller("dreamDessertCtrl", function ($scope) {
  $scope.$on('$viewContentLoaded', function () {
    var fileUpload = document.querySelector( '#fileUpload' );
		fileUpload.addEventListener('change', function(e) {
			var fileName = '';
			fileName = e.target.value.split('\\').pop();
			if (fileName) {
				document.querySelector('.chosenFile').innerHTML = fileName;
				// fileUpload.filename = fileName;
			}
		});
  });
  $scope.dreamDessert = {
    param1: [],
    param2: '',
    param3: 1,
    file: null,
    sent: false
  };
  $scope.shouldBeRequired = function () {
    if ($scope.dreamDessert.param1.indexOf(true) > -1) {
      return false;
    } else {
      return true;
    }
  };
  $scope.sendDreamDessert = function (dreamDessertForm) {
    if (dreamDessertForm.$valid) {
      $scope.dreamDessert.sent = true;
    } else {
      $scope.showValidation = true;
    }
  };
})
.controller("callbackCtrl", function ($scope) {
  $scope.callback = {
    sent: false
  };
  $scope.sendCallback = function (callbackForm) {
    if (callbackForm.$valid) {
      $scope.callback.sent = true;
    } else {
      $scope.showValidation = true;
    }
  };
})
.controller("yaMapCtrl", function ($scope) {
  $scope.address = {
    geometry: {
      type: 'Point',
      coordinates: [37.623267,55.777479]
    },
  };
})
.directive("gallerySlider", function() {
	return {
		restrict: 'A',
		controller: function() {},
		link: function(scope, element, attrs, ctrl) {
	    var slider;
      ctrl.update = function() {
        slider && slider.destroySlider();
        slider = element.bxSlider({useCSS: false});
      };
 		}
	};
})
.directive("gallerySliderItem", function() {
	return {
      require: '^gallerySlider',
      link: function(scope, elm, attr, gallerySliderCtrl) {
          if (scope.$last) {
              gallerySliderCtrl.update();
          }
      }
  };
});
// .directive('onFinishRender', function ($timeout) {
// return {
//     restrict: 'A',
//     link: function (scope, element, attr) {
//         if (scope.$last === true) {
//             $timeout(function () {
//                 scope.$emit('ngRepeatFinished');
//             });
//         }
//     }
//     };
// });