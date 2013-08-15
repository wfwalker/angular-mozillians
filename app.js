
function SearchCntl($scope, $http) {
	$scope.appName = getAPIAppName();
	$scope.appKey = getAPIKey();

	$scope.fieldNames = [ 'ircname', 'city', 'email', 'skills', 'languages', 'country', 'groups' ];
	$scope.searchField = 'city';
	$scope.searchString = 'brighton';

	$scope.summitLocations = [ 'Santa Clara', 'Toronto', 'Brussels' ];
	$scope.summitLocation = 'Santa Clara';
	
	$scope.searchStem = 'https://mozillians.org/api/v1/users/?&limit=500&format=jsonp&callback=JSON_CALLBACK&app_name=' + $scope.appName + '&app_key=' + $scope.appKey;

	// https://wiki.mozilla.org/Mozillians/API-Specification/List_Users/

	function getSearchURL(inParams) {
		var searchURL = $scope.searchStem;

		for (var paramName in inParams) {
			searchURL += '&' + paramName + '=' + inParams[paramName];
		}

		return searchURL;
	}

	$scope.locationMap = locationMap();

	$scope.search = function(userName) {
		var params = {};
		params[$scope.searchField] = $scope.searchString;

    	$scope.searchURL = getSearchURL(params);

	  	$http.jsonp($scope.searchURL).success(function(data) {
			console.log("SUCCESS");
			$scope.people = data.objects;
			$scope.meta = data.meta;

			// pre-process the search results, adding summit locations where possible
			for (var i in $scope.people) {
				var person = $scope.people[i];
				if ($scope.locationMap[person.full_name]) {
					person.summit_location = locationMap[person.full_name];
				}
			}
		}).error(function(data) {
			console.log("FAIL");
			console.log(data);
		});    
	}
}
