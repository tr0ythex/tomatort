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
       "imageUrl": "/images/products/tomatort.jpg",
       "description": "Наш фирменный торт с бисквитной основой, " +
                      "сливочно-сырным кремом и любыми топпингами на ваш вкус"
      },
      {"id": 2, "name": "Чизкейк", "kgPrice": 1700,
       "imageUrl": "/images/products/cheesecake.jpg",
       "description": "Нежнейший торт из сливочного сыра с песочной основой"
      },
      {"id": 3, "name": "Тирамису", "kgPrice": 1700,
       "imageUrl": "/images/products/tiramisu.jpg",
       "description": "Всеми любимый классический воздушный десерт " +
                      "с Маскарпоне и бисквитным печеньем"
      },
      {"id": 4, "name": "Красный бархат", "kgPrice": 1500,
       "imageUrl": "/images/products/red-velvet.jpg",
      "description": "Один из самых стильных и изысканных тортов " +
                     "с ярко-красным бисквитом и легким шоколадным послевкусием"
      },
      {"id": 5, "name": "Брауни", "kgPrice": 1500,
       "imageUrl": "/images/products/brauni.jpg",
       "description": "Влажная текстура и глубокий шоколадный вкус – " +
                      "настоящий рай для шокоголиков!"
      },
      {"id": 6, "name": "Медовик", "kgPrice": 1500, 
       "imageUrl": "/images/products/medovik.jpg",
       "description": "12 нежных коржей, приготовленных по специальной " +
                    "рецептуре, несомненно, сделают наш Медовик вашим фаворитом"
      },
      {"id": 7, "name": "Наполеон", "kgPrice": 1500,
       "imageUrl": "/images/products/napoleon.jpg",
       "description": "Пышное слоеное тесто в сочетании с неповторимым  " +
                     "кремом дипломат – лучшее исполнение классического десерта"
      },
      {"id": 8, "name": "Птичье молоко", "kgPrice": 1500,
       "imageUrl": "/images/products/bird-milk.jpg",
       "description": "Торт по оригинальной рецептуре для настоящих " +
                      "ценителей классики"
      },
      {"id": 9, "name": "Анна Павлова", "kgPrice": 1500,
       "imageUrl": "/images/products/anna-pavlova.jpg",
       "description": "Один из самых оригинальных воздушных десертов с тающим "+
             "во рту безе и легким кремом в сочетании с вашими любимыми ягодами"
      },
      {"id": 10, "name": "Прага", "kgPrice": 1500,
       "imageUrl": "/images/products/praga.jpg",
       "description": "Один из любимых вкусов детства, который мы " +
                      "воспроизвели для вас в этом прекрасном торте"
      },
      {"id": 11, "name": "Морковный торт", "kgPrice": 1500,
       "imageUrl": "/images/products/carrot-cake.jpg",
       "description": ""
      },
      {"id": 12, "name": "Капкейки", "smallSetPrice": 1800, 
       "bigSetPrice": 2400, "imageUrl": "/images/products/cupcakes.jpg",
       "description": "Мини-тортики с начинкой и кремом на любой вкус"
      },
      {"id": 13, "name": "Кейкпопсы", "smallSetPrice": 1800, 
       "bigSetPrice": 2400, "imageUrl": "/images/products/cakepops.jpg",
       "description": "Полюбившиеся всем бисквитные шарики в шоколадной глазури"
      },
      {"id": 14, "name": "Яблоки в карамели", "smallSetPrice": 1500,
       "bigSetPrice": 2000, "imageUrl": "/images/products/apples.jpg",
       "description": "Легкий и яркий десерт для ценителей оригинальности"
      },
      {"id": 15, "name": "Тирамису в стаканчиках", "smallSetPrice": 2000, 
       "bigSetPrice": 2700, "imageUrl": "/images/products/tiramisu-cup.jpg",
       "description": "Порционное исполнение любимого десерта, " +
                      "идеально подходит для больших компаний"
      },
      {"id": 16, "name": "Пирожные", "smallSetPrice": 2000, 
       "bigSetPrice": 2700, "imageUrl": "/images/products/pirozhnoe.jpg",
        "description": "Бисквитная основа и любой крем или мусс на ваш выбор"
      },
      {"id": 17, "name": "Кексы/маффины", "smallSetPrice": 1500, 
       "bigSetPrice": 2000, "imageUrl": "/images/products/muffin.jpg",
       "description": ""
      }
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