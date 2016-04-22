angular
    .module('starter')

    .controller('postDetailsController', function ($scope, userData, $stateParams, $firebaseRef, $firebaseObject, $firebaseArray) {

        $scope.postDetail = $firebaseObject($firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid))
        console.log($scope.postDetail)
        $scope.localStorageData = userData.localStorage();

        $scope.comment = {
            uid: $scope.localStorageData.uid,
            time: Firebase.ServerValue.TIMESTAMP,
            profilePic: $scope.localStorageData.password.profileImageURL
        }

        $scope.allComments = $firebaseArray($firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid).child('postComments'));
        console.log($scope.allComments);

        $scope.doComment = function (comment) {
            $firebaseArray($firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid).child('postComments')).$add(comment);
            console.log(arguments);
            comment.commentText = undefined;
        }

    })