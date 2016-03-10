/* global angular */
angular.module("tomaTort")
.constant("menuActiveClass", "menu-active")
.controller("menuCtrl", function ($scope, $location, $window, menuActiveClass) {

  
})
.controller("tomaTortCtrl", function ($scope, $location, menuActiveClass) {
  /* generic data */
  $scope.data = {
    products: [
      {"id": 1, "name": "Торт Наполеон", "price": 1500, "weight": 500},
      {"id": 2, "name": "Желе", "price": 1515, "weight": 500},
      {"id": 3, "name": "Пастила", "price": 1099, "weight": 400},
      {"id": 4, "name": "Пончик с повидлом", "price": 1560, "weight": 400},
      {"id": 5, "name": "Эклер Вкусный", "price": 1500, "weight": 700},
      {"id": 6, "name": "Бельгийские фавли", "price": 1099, "weight": 800},
      {"id": 7, "name": "Суфле Суфле", "price": 1500, "weight": 500},
      {"id": 8, "name": "Пирожное Наслаждение", "price": 1500, "weight": 400},
      {"id": 9, "name": "Мармелад Домашний", "price": 1199, "weight": 700},
      {"id": 10, "name": "Халва", "price": 1199, "weight": 600}
    ]
  };
  $scope.setOrdered = function (product_id) {
    for (var i = 0; i < $scope.data.products.length; i++) {
      if ($scope.data.products[i].id === product_id) {
        $scope.data.products[i].ordered = true;
      }
    }
  };
  
  /* menu controller */
  var selectedMenuItem = $location.path();
  
  $scope.selectMenuItem = function (menuItem) {
    selectedMenuItem = menuItem;
  };
  
  $scope.getMenuClass = function (menuItem) {
    return selectedMenuItem == menuItem ? menuActiveClass : "";
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