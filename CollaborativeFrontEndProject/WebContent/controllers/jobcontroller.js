/**
 * JobCtrl
 */
app.controller('JobCtrl',function($scope,JobService,$location,$rootScope,NotificationService,$routeParams){
	var jobId = $routeParams.id
	//Add Job - from view get job object and pass it to service
	$scope.showJobDetails=false
	
	function getAllNotificationsNotViewed(){
		NotificationService.getAllNotificationsNotViewed().then(function(response){
			$rootScope.notifications=response.data
			$rootScope.notificationCount=$rootScope.notifications.length
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
	}
	
	$scope.addJob=function(job){
		JobService.addJob(job).then(function(response){
			alert('Job details added successfully...')
			//clear the form inputs
			$scope.job={}
			$scope.error={}
		},function(response){
			//ErrorClazz errorClazz=new ErrorClazz(6,"Please login..."); -> path to /login ,401
			//ErrorClazz errorClazz=new ErrorClazz(7,"Not Authorized to post any job details.."); ,401 
			//-> jobform.html [You are not authorized to post any job details]
			//ErrorClazz errorClazz=new ErrorClazz(8,"Unable to insert job details.."+e.getMessage());,500
			//->jobform.html
			$scope.error=response.data
			if($scope.error.errorCode==6)
				$location.path('/login')
		})
	}
	function getAllJobs(){
	JobService.getAllJobs().then(function(response){
		$scope.jobs=response.data
		getAllNotificationsNotViewed()
	},function(response){
		if(response.status==401)
			$location.path('/login')
	})
	}
	$scope.updateJob=function(job){
		JobService.updateJob(job).then(function(response){
			alert('Job details Updated successfully...')
			$scope.job={}
			$scope.error={}
		},function(response){
			//ErrorClazz errorClazz=new ErrorClazz(6,"Please login..."); -> path to /login ,401
			//ErrorClazz errorClazz=new ErrorClazz(7,"Not Authorized to post any job details.."); ,401 
			//-> jobform.html [You are not authorized to post any job details]
			//ErrorClazz errorClazz=new ErrorClazz(8,"Unable to insert job details.."+e.getMessage());,500
			//->jobform.html
			$scope.error=response.data
			if($scope.error.errorCode==6)
				$location.path('/login')
		})
	}
	//http://localhost:8080/middlewarecruddemo/getbook?isbn=undefined
	if(jobId!=undefined){
	JobService.getJob(jobId).then(function(response){
			$scope.job=response.data
			
		},function(response){
			console.log(response)
		})
	}
	$scope.setValue=function(jobId){
		$scope.showJobDetails=!$scope.showJobDetails
		$scope.jobId=jobId
	}
	$scope.setTrueValue=function(jobId){
		$scope.showJobDetails=true
		$scope.jobId=jobId
	}
	$scope.deleteJob=function(id){
		JobService.deleteJob(id).then(function(response){
			alert('Job details Deleted successfully...')
			getAllJobs()
		},function(response){
			if(response.status==401)
				$location.path('/login')
		})
	}
	getAllJobs()
	
})
