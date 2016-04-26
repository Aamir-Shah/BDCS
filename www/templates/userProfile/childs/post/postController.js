angular
    .module('starter')

    .controller('postController', function ($scope, userData, staticData, $firebaseRef, $firebaseArray, $firebaseObject) {

        // Load static data for post FORM from staticData service
        $scope.static = staticData.returnStatic();

        // Load current user data from LocalStorage
        $scope.localStorageData = userData.localStorage()
        $scope.uid = $scope.localStorageData.uid

        // This service will load user Data from Firebase
        userData.getUserData()
            .then(function (data) {
                $scope.request.userName = data.firstName + " " + data.lastName;
            })

        $scope.request = {
            profileImage: $scope.localStorageData.password.profileImageURL,
            postedOn: Firebase.ServerValue.TIMESTAMP,
            uid: $scope.uid,
            commentCount: 0,
            volunteers: 0
        }

        // Save user's post to firebase
        $scope.postRequest = function (val) {
            $firebaseArray($firebaseRef.requests.child($scope.uid)).$add(val);
        }
    })