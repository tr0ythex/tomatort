/* global angular */
angular.module("tomaTort")
.constant("menuActiveClass", "menu-active")
.controller("menuCtrl", function ($scope, $location, $window, menuActiveClass) {
  
  var selectedMenuItem = $location.path();
  
  $scope.selectMenuItem = function (menuItem) {
    selectedMenuItem = menuItem;
  };
  
  $scope.getMenuClass = function (menuItem) {
    return selectedMenuItem == menuItem ? menuActiveClass : "";
  };
  
  $scope.refreshPage = function () {
    $window.location.reload();
  };
})
.controller("tomaTortCtrl", function ($scope, $http) {
  $scope.data = {
    products: [
      {"name": "Торт Наполеон", "price": "1500", "weight": "500"},
      {"name": "Желе", "price": "1515", "weight": "500"},
      {"name": "Пастила", "price": "1099", "weight": "400"},
      {"name": "Пончик с повидлом", "price": "1560", "weight": "400"},
      {"name": "Эклер Вкусный", "price": "1500", "weight": "700"},
      {"name": "Бельгийские фавли", "price": "1099", "weight": "800"},
      {"name": "Суфле Суфле", "price": "1500", "weight": "500"},
      {"name": "Пирожное Наслаждение", "price": "1500", "weight": "400"},
      {"name": "Мармелад Домашний", "price": "1199", "weight": "700"},
      {"name": "Халва", "price": "1199", "weight": "600"}
    ]
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