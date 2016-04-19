angular
    .module('starter')

    .controller('postDetailsController', function($scope, $stateParams, $firebaseRef, $firebaseObject) {
        console.log($stateParams.uid)
        console.log($stateParams.postUid)

        $scope.postDetail = $firebaseObject($firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid))
        console.log($scope.postDetail)

    })