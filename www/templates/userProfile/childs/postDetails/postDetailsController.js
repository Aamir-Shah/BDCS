angular
    .module('starter')

    .controller('postDetailsController', function ($scope, userData, commentService, $stateParams, $firebaseRef, $firebaseObject, $firebaseArray, volunteerService) {

        $scope.postDetail = $firebaseObject($firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid))
        console.log($scope.postDetail)
        $scope.localStorageData = userData.localStorage();
        userData.getUserData()
            .then(function (data) {
                $scope.comment.userName = data.firstName + " " + data.lastName;
            })

        $scope.comment = {
            uid: $scope.localStorageData.uid,
            time: Firebase.ServerValue.TIMESTAMP,
            profilePic: $scope.localStorageData.password.profileImageURL
        }

        commentService.loadComments($stateParams.uid, $stateParams.postUid)
            .then(function (data) {
                console.log(data.length, 'foooooo')
                $scope.postComment = data;
                console.log('This post commments', data);
            })

        volunteerService.loadVolunteers($stateParams.uid, $stateParams.postUid)
            .then(function (data) {
                $scope.volunteers = data;
                console.log('all volunteers', $scope.volunteers);
            })



        $scope.doComment = function (comment) {
            $scope.thisPost = $firebaseObject($firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid))
                .$loaded(function (data) {
                    $scope.commentCount = data.commentCount += 1;
                    $firebaseRef.requests.child($stateParams.uid).child($stateParams.postUid).update({ commentCount: $scope.commentCount })
                    $firebaseArray($firebaseRef.allComments.child($stateParams.uid).child($stateParams.postUid)).$add(comment);
                    comment.commentText = undefined;
                    console.log("comments length", $scope.commentCount);
                })
        }

    })