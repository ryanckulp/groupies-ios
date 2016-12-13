// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('blankApp', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('ContactsController', function($scope, $cordovaContacts, $ionicPlatform) {

    $ionicPlatform.ready(function() {

        $scope.contacts = {};  // We will use it to load contacts

        $scope.contact = {     // We will use it to save a contact

            "displayName": "Gajotres",
            "name": {
                "givenName"  : "Dragan",
                "familyName" : "Gaic",
                "formatted"  : "Dragan Gaic"
            },
            "nickname": 'Gajotres',
            "phoneNumbers": [
                {
                    "value": "+385959052082",
                    "type": "mobile"
                },
                {
                    "value": "+385914600731",
                    "type": "phone"
                }
            ],
            "emails": [
                {
                    "value": "dragan.gaic@gmail.com",
                    "type": "home"
                }
            ],
            "addresses": [
                {
                    "type": "home",
                    "formatted": "Some Address",
                    "streetAddress": "Some Address",
                    "locality":"Zagreb",
                    "region":"Zagreb",
                    "postalCode":"10000",
                    "country":"Croatia"
                }
            ],
            "ims": null,
            "organizations": [
                {
                    "type": "Company",
                    "name": "Generali",
                    "department": "IT",
                    "title":"Senior Java Developer"
                }
            ],
            "birthday": Date("08/01/1980"),
            "note": "",
            "photos": [
                {
                    "value": "https://pbs.twimg.com/profile_images/570169987914924032/pRisI2wr_400x400.jpeg"
                }
            ],
            "categories": null,
            "urls": null
        }

        $scope.addContact = function() {
            console.log('Dodaj');
            $cordovaContacts.save($scope.contact).then(function(result) {
                console.log('Contact Saved!');
            }, function(err) {
                console.log('An error has occured while saving contact data!');
            });
        };

        // This function can take some time  so be patient
        $scope.getAllContacts = function() {
            console.log('Dohvati');
            $cordovaContacts.find({filter : 'Robert', fields:  [ 'displayName']}).then(function(allContacts) { //replace 'Robert' with '' if you want to return all contacts with .find()
                $scope.contacts = allContacts;
                console.log(JSON.stringify(allContacts));
            });
        };

        $scope.removeContact = function() {

            $scope.removeContact = {};   // We will use it to save a contact
            $scope.removeContact.displayName = 'Gajotres'; // Contact Display Name

            $cordovaContacts.remove($scope.removeContact).then(function(result) {
                console.log('Contact Deleted!');
                console.log(JSON.stringify(result));
            }, function(error) {
                console.log('An error has occured while deleting contact data!');
                console.log(JSON.stringify(error));
            });
        }
    });
});
