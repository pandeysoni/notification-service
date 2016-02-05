'use strict';


angular.module('app').controller('AppController', ['$scope', 'appService', 'growl', 'Upload',
	function($scope, appService, growl,  Upload) {
		// This provides Authentication context.
		$scope.cities = [
			{
				"cityName": "Bend",
				"location": "97701"
			},
			{
				"cityName": "Sunnyvale, CA",
				"location": "94089"
			},
			{
				"cityName": "Mountain View, CA",
				"location": "94043"
			},
			{
				"cityName": "Seattle, WA",
				"location": "98101"
			}
		];
		$scope.getWeather = function(data){
			if(data){		
				appService.get({url: 'weather', id: data}).$promise.then(function(data) { 
			        $scope.weather = data.temp;
			    }).catch(function(error){
			        growl.addErrorMessage('oops something went wrong');
			    });
			}
		}
		$scope.upload = function(file) {
			 Upload.base64DataUrl(file).then(function(urls){
			 	var object = {};
			 	object['image'] = urls;
			 	object['imageName'] = file.name;
			 	appService.save({url: 'image'}, object).$promise.then(function(data) { 
			        growl.addSuccessMessage('image uploaded successfully');
			        $scope.get();
			        $scope.image = '';
			    }).catch(function(error){
			        growl.addErrorMessage('oops something went wrong');
			    });
			 });
		}
		$scope.get = function(file) {
		 	appService.getArray({url: 'image'}).$promise.then(function(data) { 
		        $scope.imageList = data;
		    }).catch(function(error){
		        growl.addErrorMessage('oops something went wrong');
		    });
		}
		$scope.get();
	}
]);