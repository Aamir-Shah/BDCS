angular
    .module('starter')

    .controller('postController', function($scope, userData, staticData, $firebaseRef, $firebaseArray, $firebaseObject) {
        $scope.static = staticData.returnStatic();
        $scope.localStorageData = userData.localStorage()
        $scope.uid = $scope.localStorageData.uid

        userData.getUserData()
            .then(function(data) {
                $scope.request.userName = data.firstName + " " + data.lastName;
            })

        $scope.request = {
            profileImage: $scope.localStorageData.password.profileImageURL,
            postedOn: Firebase.ServerValue.TIMESTAMP,
            uid: $scope.uid
        }



        $scope.postRequest = function(val) {
            $firebaseArray($firebaseRef.requests.child($scope.uid)).$add(val);
        }
    })