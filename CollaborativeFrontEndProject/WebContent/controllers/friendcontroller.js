/**
 * FriendCtrl
 */
app.controller('FriendCtrl',function($scope,$rootScope,$location,NotificationService,FriendService)
{ 
	function getAllSuggestedUsers(){
	FriendService.getAllSuggestedUsers().then(function(response){
		$scope.suggestedUsers=response.data
	},function(response){
		if(response.status==401)
			$location.path('/login')
	})
	}
	
	function getAllNotificationsNotViewed(){
		NotificationService.getAllNotificationsNotViewed().then(function(response){
			$rootScope.notifications=response.data
			$rootScope.notificationCount=$rootScope.notifications.length
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	$scope.sendFriendRequest=function(toId){
		//call a function in service
		FriendService.sendFriendRequest(toId).then(function(response){
			alert("Friend Requset Has Been Sended")
			getAllSuggestedUsers()
		},function(response){
		if(response.status == 401)
		$location.path('/login')
		})
		}
	
	    function getAllPendingRequests2(){
		FriendService.getAllPendingRequests().then(
		function(response){
		$scope.pendingRequests=response.data
		},function(response){
		if(response.status == 401)
		$location.path('/login')
		})
		}
	    
	    function getAllPendingRequests1(){
	    	FriendService.getAllPendingRequests().then(function(response){
				$rootScope.pendingRequests=response.data
				$rootScope.pendingRequestsCount=$rootScope.pendingRequests.length
			},function(response){
				if(response.status==401)
					$location.path('/login')
			})
		}
	    
		$scope.acceptFriendRequest=function(request){
		FriendService.acceptFriendRequest(request).then(function(response)
		{
		getAllPendingRequests1()
		getAllPendingRequests2()
		},function(response)
		{
		if(response.status == 401)
		$location.path('/login')
		})
		}

		$scope.deleteFriendRequest=function(request){
		FriendService.deleteFriendRequest(request).then(function(response)
		{
		getAllPendingRequests1()
		getAllPendingRequests2()
		},function(response)
		{
		if(response.status == 401)
		$location.path('/login')
		})
		}
		 function getAllFriends(){
		    	FriendService.getAllFriends().then(
		    			function(response){
		    				//response.data is Array of User object
		    				$scope.friends=response.data
		    			},function(response){
		    				if(response.status==401)
		    					$location.path('/login')
		    			})
		    }
		getAllNotificationsNotViewed()
		getAllPendingRequests1()
		getAllPendingRequests2()
        getAllSuggestedUsers()
        getAllFriends()
	
})