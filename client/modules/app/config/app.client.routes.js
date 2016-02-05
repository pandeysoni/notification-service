'use strict';

// Setting up route
angular.module('app').config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('app', {
			url: '/',
			templateUrl: 'modules/app/views/app.client.home.html'
		})
		.state('events', {
			url: '/events',
			templateUrl: 'modules/app/views/app.client.events.html'
		})
		.state('subscriptions', {
			url: '/subscriptions',
			templateUrl: 'modules/app/views/app.client.subscriptions.html'
		})
		.state('signals', {
			url: '/signals',
			templateUrl: 'modules/app/views/app.client.signals.html'
		});

	}
]);