angular.module('JogjaJs',['ngRoute'])
  .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/page1.html',
        controller: 'PageOneController'
      }).
      when('/page2', {
        templateUrl: 'partials/page2.html',
        controller: 'PageTwoController'
      }).
      otherwise({
        redirectTo: '/'
      })
  }])
	.controller('AppController',['$scope',function($scope){
		$scope.data = {
			hello: "hello"
		}
	}])
	.controller('PageOneController',['$scope','$http',function($scope,$http){
		$scope.data = {
			buku:[]
		}

		$http.get('http://192.168.1.13:3000/buku')
			.success(function(data){
				$scope.data.buku = data.data.buku;
			})
	}])
	.controller('PageTwoController',['$scope','$http','$window',function($scope,$http,$window){
		$scope.kirim = function(){
			$http({
				method:'POST',
				url:'http://192.168.1.13:3000/buku',
				data:$scope.data
			}).success(function(data){
					$window.location.reload();
				}).error(function(error){
					console.log(error);
				})
		}
	}])
