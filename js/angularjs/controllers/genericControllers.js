/* global angular */
angular.module("tomaTort")
.constant("menuActiveClass", "menu-active")
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
.controller("tomaTortCtrl", function ($scope, $location, menuActiveClass, cart) {
  $scope.data = {
    products: [
      {"id": 1, "name": "Торт Наполеон", "price": 1500, "weight": 500, 
       "imageUrl": "/images/products/napoleon.jpg"},
      {"id": 2, "name": "Желе", "price": 1515, "weight": 500, 
       "imageUrl": "/images/products/zhele.jpg"},
      {"id": 3, "name": "Пастила", "price": 1099, "weight": 400, 
       "imageUrl": "/images/products/pastila.jpg"},
      {"id": 4, "name": "Пончик с повидлом", "price": 1560, "weight": 400, 
       "imageUrl": "/images/products/doughnut.jpg"},
      {"id": 5, "name": "Эклер Вкусный", "price": 1500, "weight": 700, 
       "imageUrl": "/images/products/eclair.jpg"},
      {"id": 6, "name": "Бельгийские фавли", "price": 1099, "weight": 800, 
       "imageUrl": "/images/products/waffles.jpg"},
      {"id": 7, "name": "Суфле Суфле", "price": 1500, "weight": 500, 
       "imageUrl": "/images/products/sufle.jpg"},
      {"id": 8, "name": "Пирожное Наслаждение", "price": 1500, "weight": 400, 
       "imageUrl": "/images/products/pirozhnoe.jpg"},
      {"id": 9, "name": "Мармелад Домашний", "price": 1199, "weight": 700, 
       "imageUrl": "/images/products/marmelad.jpg"},
      {"id": 10, "name": "Халва", "price": 1199, "weight": 600, 
       "imageUrl": "/images/products/halva.jpg"}
    ],
    shipping: {
      deliveryType: 'selfPickup',
      sent: false
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
  $scope.dreamDessert = {
    param1: [],
    param2: '',
    param3: 1,
    file: null
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
      
    } else {
      $scope.showValidation = true;
    }
  };
  $scope.showDream = function () {
    alert($scope.dreamDessert.file);
  };
})
.directive("gallerySlider", function() {
	return {
		restrict: 'A',
		templateUrl: '/views/partials/_gallerySlider.html',
		link: function(scope, iElement, attrs) {
      $(iElement).bxSlider({useCSS: false});
 		}
	};
})