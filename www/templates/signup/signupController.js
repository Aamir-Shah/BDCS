angular
    .module('starter')

    .controller('signupController', function ($scope, $firebaseRef, $state, $ionicLoading, $firebaseObject) {
        $scope.user = {};

        $scope.createAccount = function () {
            $ionicLoading.show()
            console.log('function is running perfectly')
            $firebaseRef.default.createUser({
                email: $scope.user.email,
                password: $scope.user.password
            }, function (error, userData) {
                if (error) {
                    $ionicLoading.hide()
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    addAdditionalInfo(userData.uid);
                    $ionicLoading.hide()
                    $state.go('login');
                }
            });
        }

        function addAdditionalInfo(id) {
            $firebaseRef.users.child(id)
                .set({
                    firstName: $scope.user.firstName,
                    lastName: $scope.user.lastName,
                    bloodGroup: $scope.user.bloodGroup
                })
                .then(function () {
                    console.log('successfully added additional Info');

                }, function (error) {
                    console.log('error in saving additionla info', error)
                })
        }

    })