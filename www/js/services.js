angular
    .module('starter')


    .service('staticData', function () {
        this.bloodGroups = ['A+', 'B+', 'O+', 'A-', 'B-', 'O-'];
        this.urgency = ['Urgent', 'Within 5 hours', 'Within 12 hours', 'Within 24 hours', 'Within 2 days', 'Within Week'];
        this.hospitals = ['Indus Hospital', 'Ziauddin Hospital', 'Agha Khan Hospital', 'Liaquat National Hospital', 'O.M.I', 'Jinnah Hospital', 'Holy Family Hospital'];
        this.relation = ['Father', 'Mother', 'Son', 'Daughter', 'Aunt', 'Uncle', 'Nephew', 'Niece', 'Friend', 'Neighbour', 'None'];
        this.country = ['Pakistan'];
        this.state = ['Sindh', 'Punjab', 'Balouchistan', 'Khyber Pakhtunkhuwah'];
        this.city = ['Karachi', 'Lahore', 'Islamabad', 'Multan', 'Sukkur', 'Abbotabad', 'Faisalabad', 'Quetta', 'Peshawar'];

        this.returnStatic = function () {
            return {
                bloodGroups: this.bloodGroups,
                urgency: this.urgency,
                hospitals: this.hospitals,
                relation: this.relation,
                country: this.country,
                city: this.city,
                state: this.state
            }
        }
    })

    .service('userData', function ($firebaseRef, $firebaseObject, $q) {

        this.getUserData = function () {
            var deferred = $q.defer();
            $firebaseObject($firebaseRef.users.child(this.localStorage().uid))
                .$loaded(function (data) {
                    deferred.resolve(data)
                }, function (error) {
                    console.log('error in fetching user Data from Firebase', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        }

        this.localStorage = function () {
            return JSON.parse(localStorage.getItem('firebase:session::bdcs101'))
        }

        this.getUserDataByUid = function (param) {
            var deferred = $q.defer();
            $firebaseObject($firebaseRef.users.child(param))
                .$loaded(function (data) {
                    deferred.resolve(data)
                }, function (error) {
                    console.log('error in fetching user Data from Firebase', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        }

    })

    .service('userAuth', function ($firebaseRef, $firebaseAuth, $state) {

        this.checkAuth = function () {
            var auth = $firebaseAuth($firebaseRef.default)
            auth.$onAuth(function (authData) {
                if (authData) {
                    console.log("Logged in as:", authData.uid);
                    $state.go('userProfile.feed');
                } else {
                    console.log("Logged out");
                }
            })
        }
    })

    .service('unauth', function ($firebaseAuth, $firebaseRef, $state, $timeout, $ionicLoading) {

        function onTimeOut() {
            $ionicLoading.hide();
            var auth = $firebaseAuth($firebaseRef.default);
            auth.$unauth();
            $state.go('login');
        }

        this.logout = function () {
            $ionicLoading.show();
            $timeout(onTimeOut, 2000);
        }

    })

    .service('commentService', function ($firebaseRef, $firebaseArray, $q) {

        this.loadComments = function (uuid, postUid) {
            var deferred = $q.defer();
            $firebaseArray($firebaseRef.allComments.child(uuid).child(postUid).orderByChild("time"))
                .$loaded(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    console.log('error in fetching comments thread from Firebase', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        }
    })

    .service('volunteerService', function ($firebaseObject, $firebaseArray, $firebaseRef, $q, userData) {

        userData.getUserData()
            .then(function (data) {
                var userImage = userData.localStorage().password.profileImageURL;
                console.log(userImage);
                console.log(data)
                this.userDataForVolunteer = {
                    userName: data.firstName + ' ' + data.lastName,
                    uid: data.$id,
                    time: Firebase.ServerValue.TIMESTAMP,
                    profileImage: userImage
                }
            })

        this.volunteer = function (uid, pid) {
            var deferred = $q.defer();

            // First load postData from Firebase to update Volunteer node
            this.CurrentPost = $firebaseObject($firebaseRef.requests.child(uid).child(pid))
                .$loaded(function (data) {
                    // do increment by 1 on volunteers counter locally
                    this.inc = data.volunteers += 1;
                    // Now update volunteers counter on current post in firebase
                    $firebaseRef.requests.child(uid).child(pid).update({ volunteers: this.inc });

                    // Save Volunteer Info to Volunteers node in firebase
                    $firebaseArray($firebaseRef.volunteers.child(uid).child(pid)).$add(userDataForVolunteer)

                    deferred.resolve(data)
                }, function (error) {
                    console.log('error', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        }

        this.loadVolunteers = function (uid, puid) {
            var deferred = $q.defer();
            $firebaseArray($firebaseRef.volunteers.child(uid).child(puid))
                .$loaded(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    console.log('error in fetching volunteers from Firebase', error);
                    deferred.reject(error);
                })
            return deferred.promise;
        }

    })

    // .service('additionalInfoService', function (userData) {

    //     this.fetchAdditionalInfo = function (param) {
    //         param.forEach(function (entry) {
    //             userData.getUserDataByUid(entry.uid)
    //                 .then(function (data) {
    //                     entry.userName = data.firstName;
    //                     console.log('after nested forEach', entry);
    //                 })
    //         })
    //     }

    //     // this.fetchLastPostInfo = function (param) {
    //     //     if()
    //     // }
    // })