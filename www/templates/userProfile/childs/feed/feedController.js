angular
    .module('starter')

    .controller('feedController', function ($scope, $state, $firebaseRef, $firebaseArray, commentService, volunteerService) {
        // Load all users POSTS from firebase
        $scope.allRequests = $firebaseArray($firebaseRef.requests);

        // The user will be redirected to Post Details section
        $scope.goToComments = function (uuid, puid) {
            $state.go('userProfile.postDetails', { uid: uuid, postUid: puid });
        }

        $scope.iVolunteer = function (uuid, puid) {
            console.log('volunteered successfully')
            volunteerService.volunteer(uuid, puid)
        }


    })