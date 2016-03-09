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
.directive("gallerySlider", function() {
	return {
		restrict: 'A',
		templateUrl: '/views/partials/_gallerySlider.html',
		link: function(scope, iElement, attrs) {
      $(iElement).bxSlider({useCSS: false});
 		}
	};
})