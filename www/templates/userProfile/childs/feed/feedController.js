angular
    .module('starter')

    .controller('feedController', function ($scope, $firebaseRef, $firebaseArray, commentService) {

        $scope.allRequests = $firebaseArray($firebaseRef.requests);

        // $scope.foo = function (uid, puid) {
        //     commentService.loadComments(uid, puid)
        //         .then(function (data) {
        //             $scope.bar = data;
        //             console.log("comments on feed", $scope.bar)
        //         })
        // }
        // $scope.foo = function (uid, postUid) {
        //     $scope.bar = commentService.loadComments(uid, postUid)
        // }
        // $scope.allRequests.$loaded(function () {
        //     console.log('abc', arguments);
        //     $scope.abc = $scope.allRequests;
        // })
    })