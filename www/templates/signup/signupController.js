angular
    .module('starter')

    .controller('signupController', function($scope, $firebaseRef, $state, $ionicLoading) {
        $scope.user = {};

        $scope.createAccount = function() {
            $ionicLoading.show()
            console.log('function is running perfectly')
            $firebaseRef.default.createUser({
                email: $scope.user.email,
                password: $scope.user.password
            }, function(error, userData) {
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
            var ref = $firebaseRef.users.child(id);
            ref.set({
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                bloodGroup: $scope.user.bloodGroup
            }), function(error) {
                if (error) {
                    console.log(error);
                    console.log("error in adding aditional data");
                } else {
                    console.log('successfully added additional data');
                }
            }
        }

    })