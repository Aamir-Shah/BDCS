angular
    .module('starter')

    .controller('feedController', function($scope, $firebaseRef, $firebaseArray) {
        $scope.allRequests = $firebaseArray($firebaseRef.requests);

        $scope.allRequests.$loaded(function() {
            console.log('abc', arguments);
            $scope.abc = $scope.allRequests;
        })
    })