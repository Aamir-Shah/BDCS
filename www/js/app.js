// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'angularMoment', 'ngCordova'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .constant('firebaseRef', 'https://bdcs101.firebaseio.com/')

    .config(function ($stateProvider, $urlRouterProvider, $firebaseRefProvider, firebaseRef) {

        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: './templates/login/login.html',
                controller: 'loginController',
                resolve: {
                    checkLogin: function (userAuth) {
                        return userAuth.checkAuth();
                    }
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: './templates/signup/signup.html',
                controller: 'signupController'
            })
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: './templates/userProfile/userProfile.html',
                controller: 'userProfileController',
                abstract: true
            })
            .state('userProfile.feed', {
                url: '/feed',
                views: {
                    'child': {
                        templateUrl: './templates/userProfile/childs/feed/userProfile.feed.html',
                        controller: 'feedController'
                    }
                }
            })
            .state('userProfile.post', {
                url: '/post',
                views: {
                    'child': {
                        templateUrl: './templates/userProfile/childs/post/post.html',
                        controller: 'postController'
                    }
                }
            })
            .state('userProfile.postDetails', {
                url: '/postDetails/:uid/:postUid',
                views: {
                    'child': {
                        templateUrl: './templates/userProfile/childs/postDetails/postDetails.html',
                        controller: 'postDetailsController'
                    }
                }
            })
        $urlRouterProvider.otherwise('/')

        $firebaseRefProvider.registerUrl({
            default: firebaseRef,
            users: firebaseRef + 'users',
            requests: firebaseRef + 'requests'
        })
    })