angular
    .module('starter')

    .controller('loginController', function ($scope, $firebaseRef, $state, $ionicLoading, $cordovaToast) {

        // $scope.auth = $firebaseAuth($firebaseRef.default)
        // $scope.auth.$onAuth(function (authData) {
        //     $timeout(function () {
        //         $scope.user = authData;
        //         console.log($scope.user, "auth function")
        //         if ($scope.user){
        //             $state.go("userProfile.feed")
        //         }else{
        //             console.log("user is logged out")
        //         }
        //     });
        // });

        // $scope.authData = $scope.auth.$getAuth();
        
        // if ($scope.authData) {
        //     console.log("Logged in as:", $scope.authData.uid);
        // } else {
        //     console.log("Logged out");
        // }


        $scope.login = function (val1, val2) {
            $ionicLoading.show()
            var ref = $firebaseRef.default;
            ref.authWithPassword({
                email: val1,
                password: val2
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    //$cordovaToast.show(error, 'short', 'center');
                    $ionicLoading.hide();
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    //$cordovaToast.show('You are Logged in!', 'short', 'center');
                    $ionicLoading.hide();
                    $state.go('userProfile.feed');
                }
            });
        }
    })
