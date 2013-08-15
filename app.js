
function SearchCntl($scope, $http) {
	$scope.appName = getAPIAppName();
	$scope.appKey = getAPIKey();
	$scope.fieldNames = [ 'ircname', 'city', 'email', 'skills', 'languages', 'country', 'groups' ];
	$scope.searchField = 'city';
	$scope.searchString = 'brighton';
	$scope.searchStem = 'https://mozillians.org/api/v1/users/?&format=jsonp&callback=JSON_CALLBACK&app_name=' + $scope.appName + '&app_key=' + $scope.appKey;

	// https://wiki.mozilla.org/Mozillians/API-Specification/List_Users/

	function getSearchURL(inParams) {
		var searchURL = $scope.searchStem;

		for (var paramName in inParams) {
			searchURL += '&' + paramName + '=' + inParams[paramName];
		}

		return searchURL;
	}

	$scope.search = function(userName) {
		var params = {};
		params[$scope.searchField] = $scope.searchString;

    	$scope.searchURL = getSearchURL(params);

	  	$http.jsonp($scope.searchURL).success(function(data) {
			console.log("SUCCESS");
			$scope.results = data;
		}).error(function(data) {
			console.log("FAIL");
			console.log(data);
		});    
	}
}
