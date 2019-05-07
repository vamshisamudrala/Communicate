/**
 * UserCtrl
 */
app.controller('UserCtrl',function($scope,$rootScope,UserService,NotificationService,$location,$cookieStore){
	
	function getAllNotificationsNotViewed(){
		NotificationService.getAllNotificationsNotViewed().then(function(response){
			$rootScope.notifications=response.data
			$rootScope.notificationCount=$rootScope.notifications.length
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
	}
	$scope.registerUser=function(user){
		//call a function in service
		UserService.registerUser(user).then(function(response){
			alert('Registered successfully... Please login')
			$location.path('/login')
		},function(response){
			//response.data -> ErrorClazz object
			$scope.error=response.data
		})
	}
	
	$scope.updateUser=function(user){
		//call a function in service
		UserService.updateUser(user).then(function(response){
			alert('USER DETAILS UPDATED  successfully... Please login')
			$rootScope.user=response.data
			$location.path('/home')
		},function(response){
			//response.data -> ErrorClazz object
			$scope.error=response.data
		})
	}
	
	$scope.login=function(user){
		UserService.login(user).then(function(response){
			//response.data= User object with values for all properties
			$rootScope.user=response.data
			$cookieStore.put('user',response.data)
			$location.path('/home')
		},function(response){
			$scope.error=response.data //response.data=ErrorClazz
		})
	}
	
	if($rootScope.user!=undefined){
	UserService.getProtectedResource().then(function(response){
		$scope.message="YOU ARE AUTHORIZED"
	},function(response){
		$scope.error=response.data
	})
	}
	if($rootScope.user!=undefined){
		UserService.getUser().then(function(response){
			$scope.user=response.data
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
	}
	/*getAllNotificationsNotViewed()*/
})
