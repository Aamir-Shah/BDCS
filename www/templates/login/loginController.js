angular
    .module('starter')

    .controller('loginController', function ($scope, $firebaseRef, $state, $ionicLoading, $cordovaToast, $ionicHistory) {

        $scope.$on('$ionicView.enter', function (event, viewData) {
            $ionicHistory.clearCache();
        });

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
