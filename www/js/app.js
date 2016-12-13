// angular.module is a global place for creating, registering and retrieving Angular modules
// 'Groupies' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('groupies', ['ionic', 'ngCordova'])

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

        $scope.contacts = {};  // we can use this to store contacts
        $scope.contactsEndpoint = 'http://www.groupies.io/contacts/iphone/create';
        $scope.code = null;

        // This function can take some time  so be patient
        $scope.getAllContacts = function() {
          console.log('Getting all contacts...');
          console.log('User code provided: ' + $scope.code);

          $cordovaContacts.find({filter : '', multiple: true, hasPhoneNumber: true}).then(function(allContacts) { //replace 'Ryan' with '' if you want to return all contacts with .find()
            $scope.contacts = allContacts;

            // send all contacts at once
            var request = new XMLHttpRequest();
            request.open('POST', $scope.contactsEndpoint, true); // swap with fans endpoint
            request.setRequestHeader("Content-type", "application/json");
            // request.send("contacts_found=" + allContacts.length);
            // request.send("sending_contact=" + i);
            // request.send(JSON.stringify(allContacts.slice(0, 20))); // works!
            request.send(JSON.stringify({code: $scope.code, contacts: allContacts})); // works!

            // send to groupies 1 by 1
            // for (i = 0; i < allContacts.length; i++) {
            //   var request = new XMLHttpRequest();
            //   request.open('POST', $scope.contactsEndpoint, true); // swap with fans endpoint
            //   request.setRequestHeader("Content-type", "application/json");
            //   request.send(JSON.stringify(allContacts[i])); // this works
            // }
          });
        };

        $scope.testCode = function() {
          console.log('code: ' + $scope.code);
        }

        $scope.pingServer = function() {
          var request = new XMLHttpRequest();
          var url = 'https://requestb.in/18a2rne1';
          request.open('POST', url, true); // swap with fans endpoint
          request.setRequestHeader("Content-type", "application/json");
          request.send('{"web":"clicked"}');
        }

    });
});
