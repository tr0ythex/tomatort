/* global angular */
angular.module("tomaTort")
.constant("menuActiveClass", "li-active")
.constant("instagramLink", "https://www.instagram.com/_tomatort_")
.constant("toppingPlaceholder", "Топпинги, прослойки, другие элементы " +
  "(орехи, ягоды и др.), а также любая информация, которая кажется вам важной")
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
.controller("tomaTortCtrl", function ($scope, $http, $location, 
  menuActiveClass, cart, instagramLink, toppingPlaceholder) {
    
  $scope.instagramLink = instagramLink;
  $scope.toppingPlaceholder = toppingPlaceholder;
  
  $scope.data = {
    products: [
      {"id": 1, "name": "Томаторт", "price": 1500,
       "imageUrl": "/images/products/tomatort.jpg",
       "description": "Наш фирменный торт с бисквитной основой, " +
                      "сливочно-сырным кремом и любыми топпингами на ваш вкус"
      },
      {"id": 2, "name": "Чизкейк", "price": 1700,
       "imageUrl": "/images/products/cheesecake.jpg",
       "description": "Нежнейший торт из сливочного сыра с песочной основой"
      },
      {"id": 3, "name": "Тирамису", "price": 1700,
       "imageUrl": "/images/products/tiramisu.jpg",
       "description": "Всеми любимый классический воздушный десерт " +
                      "с Маскарпоне и бисквитным печеньем"
      },
      {"id": 4, "name": "Красный бархат", "price": 1500,
       "imageUrl": "/images/products/red-velvet.jpg",
      "description": "Один из самых стильных и изысканных тортов " +
                     "с ярко-красным бисквитом и легким шоколадным послевкусием"
      },
      {"id": 5, "name": "Брауни", "price": 1500,
       "imageUrl": "/images/products/brauni.jpg",
       "description": "Влажная текстура и глубокий шоколадный вкус – " +
                      "настоящий рай для шокоголиков!"
      },
      {"id": 6, "name": "Медовик", "price": 1500,
       "imageUrl": "/images/products/medovik.jpg",
       "description": "12 нежных коржей, приготовленных по специальной " +
                    "рецептуре, несомненно, сделают наш Медовик вашим фаворитом"
      },
      {"id": 7, "name": "Наполеон", "price": 1500,
       "imageUrl": "/images/products/napoleon.jpg",
       "description": "Пышное слоеное тесто в сочетании с неповторимым  " +
                     "кремом дипломат – лучшее исполнение классического десерта"
      },
      {"id": 8, "name": "Птичье молоко", "price": 1500,
       "imageUrl": "/images/products/bird-milk.jpg",
       "description": "Торт по оригинальной рецептуре для настоящих " +
                      "ценителей классики"
      },
      {"id": 9, "name": "Анна Павлова", "price": 1500,
       "imageUrl": "/images/products/anna-pavlova.jpg",
       "description": "Один из самых оригинальных десертов с тающим "+
             "во рту безе и легким кремом в сочетании с вашими любимыми ягодами"
      },
      {"id": 10, "name": "Муссовый торт", "price": 2000,
       "imageUrl": "/images/products/mousse-cake.jpg",
       "description": "Изысканный современный десерт на основе мусса вашего " +
                      "любимого вкуса"
      },
      {"id": 11, "name": "Морковный торт", "price": 1500,
       "imageUrl": "/images/products/carrotcake.jpg",
       "description": "Пряный торт для любителей чего-то особенного"
      },
      {"id": 12, "name": "Капкейки", "price9": 1800, "price12": 2400,
       "imageUrl": "/images/products/cupcakes.jpg",
       "description": "Мини-тортики с начинкой и кремом на любой вкус"
      },
      {"id": 13, "name": "Кейкпопсы", "price9": 1800, "price12": 2400,
       "imageUrl": "/images/products/cakepops.jpg",
       "description": "Полюбившиеся всем бисквитные шарики в шоколадной глазури"
      },
      {"id": 14, "name": "Яблоки в карамели", "price9": 1500, "price12": 2000,
       "imageUrl": "/images/products/apples.jpg",
       "description": "Легкий и яркий десерт для ценителей оригинальности"
      },
      {"id": 15, "name": "Тирамису в стаканчиках", "price9": 2000, "price12": 2700,
       "imageUrl": "/images/products/tiramisu-cup.jpg",
       "description": "Порционное исполнение любимого десерта, " +
                      "идеально подходит для больших компаний"
      },
      {"id": 16, "name": "Пирожные", "price9": 2000, "price12": 2700,
       "imageUrl": "/images/products/pirozhnoe.jpg",
       "description": "Бисквитная основа и любой крем или мусс на ваш выбор"
      },
      {"id": 17, "name": "Кексы/маффины", "price9": 1500, "price12": 2000,
       "imageUrl": "/images/products/muffin.jpg",
       "description": "Мягкая текстура любимых маффинов и любой вкус на выбор"
      },
      {"id": 18, "name": "Другое",
       "imageUrl": "/images/products/other.jpg",
       "description": "Мягкая текстура любимых маффинов и любой вкус на выбор"
      },
      {"id": 19, "name": "Сладкий стол",
       "imageUrl": "/images/products/sweet-table.jpg",
       "description": "Мягкая текстура любимых маффинов и любой вкус на выбор"
      }
    ],
    shipping: {
      deliveryType: 'Самовывоз',
      sent: false
    }
  };
  $scope.getProduct = function (pId) {
    for (var i = 0; i < $scope.data.products.length; i++) {
      var product = $scope.data.products[i];
      if (product.id == pId) {
        if (product.price9 || product.price12) {
          product.set = '9 шт'; // set default value for set
        }
        return product;
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
      
      var request = $http({
        method: "post",
        url: "/sendMail.php",
        data: {
          firstName: $scope.data.shipping.firstName,
          lastName: $scope.data.shipping.lastName,
          email: $scope.data.shipping.email,
          tel: $scope.data.shipping.tel,
          address: $scope.data.shipping.address,
          comment: $scope.data.shipping.comment,
          deliveryType: $scope.data.shipping.deliveryType,
          cartData: cart.getProducts()
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      request.success(function (data) {
        $scope.data.shipping.sent = true;
      });
       
    } else {
      $scope.showValidation = true;
    }
  };
  $scope.addToCart = function (product) {
    if (product.price) {
      cart.addProduct(
        product.id, 
        product.name, 
        product.price,
        product.imageUrl);
    } else if (product.price9) {
      cart.addProduct(
        product.id, 
        product.name, 
        product.price9,
        product.imageUrl);
    } else {
      cart.addProduct(
        product.id, 
        product.name, 
        product.price12,
        product.imageUrl);
    }
  };
  $scope.openProductItemPage = function (product) {
    $scope.selectedProduct = product;
    if (product.price9 || product.price12) {
      $scope.selectedProduct.set = '9 шт'; // 9 set default
    }
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
.controller("dreamDessertCtrl", function ($scope, $http) {
  
  function Cream(curId) {
    var creamNameArr = ['С кислинкой', 'Послаще', 'Шоколадный', 'Особый'];
    var id = curId;
    var name = creamNameArr[id - 1];
    
    this.__defineGetter__("id", function () {
        return id;
    });
    this.__defineSetter__("id", function (val) {        
        id = parseInt(val, 10);
    });
    this.__defineGetter__("name", function () {
        return name;
    });
    this.__defineSetter__("name", function (val) {
        name = creamNameArr[val];
    });
  }
  
  $scope.dreamDessert = {
    base: 'Шоколадная',
    cream: new Cream(1),
    topping: '',
    design: [
      {name: 'Ягоды/фрукты', selected: false},
      {name: 'Цветы', selected: false},
      {name: 'Глазурь', selected: false},
      {name: 'Декор из мастики', selected: false},
      {name: 'Надпись', selected: false},
      {name: 'Флажки/несъедобные элементы', selected: false},
      {name: 'Конфеты/маршмеллоу/мармелад', selected: false},
      {name: 'Другое', selected: false},
    ],
    size: 2,
    sent: false
  };
  $scope.sendDreamDessert = function (dreamDessertForm) {
    if (dreamDessertForm.$valid) {
      var request = $http({
        method: "post",
        url: "/sendMail.php",
        data: {
          firstName: $scope.data.shipping.firstName,
          lastName: $scope.data.shipping.lastName,
          email: $scope.data.shipping.email,
          tel: $scope.data.shipping.tel,
          dreamDessert: $scope.dreamDessert
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      request.success(function (data) {
        $scope.dreamDessert.sent = true;
        console.log(data);
      });
    } else {
      $scope.showValidation = true;
    }
  };
})
.controller("callbackCtrl", function ($scope, $http) {
  $scope.callback = {
    sent: false
  };
  $scope.sendCallback = function (callbackForm) {
    if (callbackForm.$valid) {
      var request = $http({
        method: "post",
        url: "/sendMail.php",
        data: {
          firstName: $scope.data.shipping.firstName,
          lastName: $scope.data.shipping.lastName,
          email: $scope.data.shipping.email,
          tel: $scope.data.shipping.tel,
          comment: $scope.data.shipping.comment
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      request.success(function (data) {
        $scope.callback.sent = true;
      });
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
})
.directive("fileUpload", function () {
  return {
    restrict: "E",
    template: 
    '<input type="file" name="file" id="fileUpload" class="inputfile"' +
		'ng-model="dreamDessert.file">' +
		'<label for="fileUpload">Выберите файл</label>' +
		'<span class="chosenFile">Файл не выбран</span>',
    controller: function () {
      var fileUpload = document.querySelector( '#fileUpload' );
  		fileUpload.addEventListener('change', function(e) {
  			var fileName = '';
  			fileName = e.target.value.split('\\').pop();
  			if (fileName) {
  				document.querySelector('.chosenFile').innerHTML = fileName;
  			}
  		});
    }
  };
});