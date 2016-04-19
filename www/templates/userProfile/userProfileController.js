angular
    .module('starter')

    .controller('userProfileController', function ($scope, userData, unauth) {
        // $scope.userInfo = JSON.parse(localStorage.getItem('firebase:session::bdcs101'));
        // $scope.additionalUserInfo = $firebaseObject($firebaseRef.users.child($scope.userInfo.uid));

        // $scope.additionalUserInfo
        //     .$loaded(function() {
        //         $scope.additionalUserData = {
        //             firstName: $scope.additionalUserInfo.firstName,
        //             lastName: $scope.additionalUserInfo.lastName,
        //             bloodGrp: $scope.additionalUserInfo.bloodGroup
        //         }
        //     })
        // $scope.profileImage = localStorage.getItem('firebase:session::bdcs101')
        // console.log($scope.profileImage)

        $scope.logout = unauth.logout;
        
        $scope.profileImage = userData.localStorage()

        userData.getUserData()
            .then(function (data) {
                $scope.stage1 = data
            })
        // userData.getUserData(function(response) {
        //     $scope.uid = response;
        //     console.log(response.firstName);
        // });

    })
