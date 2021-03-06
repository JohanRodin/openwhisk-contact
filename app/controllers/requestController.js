angular.module('ngWhisk')
    .controller('requestController', function($scope, $http, $log, $rootScope, ngDialog) {
        //$log.log('inside');
        var API_URL = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/b2844128c00ef617cbec07a2c205b9d411c2d31da094f2120c9054289445ee2f/OpenWhiskContact/api/v1';
        //var API_URL = 'https://6e28847c-de9b-4446-8207-c2fadad1d143-gws.api-gw.mybluemix.net/OpenWhiskContact/api/v1'; //$rootScope.process.env.OWAPI; // OpenWhisk exposed API
        $scope.emailSent = false; // setting message logic to false not display any message by default

        $scope.sendMail = function () { //The send button will call this method to make an API to a OpenWhisk Action exposed as a API

            //scope binding the form data
            var data = {
                myName: $scope.myName,
                myEmail: $scope.myEmail,
                myUrl: $scope.myUrl,
                myDate: $scope.myDate,
                myDescription: $scope.myDescription
            };
            // adding content type for post header, this is needed for when calling OpenWhisk API
            var config = {
                headers: { accept: 'application/json' } };
                //headers : {
                    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  //  'Content-Type': 'application/json;charset=UTF-8;',
                  //  'Accept': 'application/json' 
                //}
            //};
            // Simple POST request example (passing data) :
            $http.post(API_URL, data, config)
                .then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    //$log.log('Email Sent with response status of: ' + JSON.stringify(response.status));
                    $scope.emailSent = true;

                    // Injecting success into the array of alerts
                    $scope.alerts = [ {type: 'success', msg: ''} ];
                    $scope.alerts[0].msg = 'Thanks, ' + $scope.myName + ' we have got your request, and we will be in touch. ';

                    // After user sent the email, then clear the values to be empty
                    //$scope.myName = "";
                    //$scope.myEmail = "";
                    //$scope.myUrl = "";
                    //$scope.myDate = "";
                    //$scope.myDescription = "";
                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.log("Error occurred with status: " + '' + JSON.stringify(response.status));
                    if ($scope.alerts) {
                    // alerts have value
                         // if there was an error, then display this message
                        $scope.alerts[0].msg = JSON.stringify(response.status);
                    } else {
                    // alerts is still null
                         // if there was an error, then display this message
                        $scope.alerts = [ {type: 'danger', msg: ''} ];
                        $scope.alerts[0].msg = JSON.stringify(response.status);
                    }
                    
                    $scope.emailSent = true;
                    $scope.alerts[0].msg = 'Oops! There was a problem sending your request, please contact Johan Rodin directly at johan.rodin@se.ibm.com';
                });
        };



        // Remove alert message area
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };


        ///////Handling the popup
        $rootScope.jsonData = '{"foo": "bar"}';
        $rootScope.theme = 'ngdialog-theme-default';
        $scope.open = function () {
            ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl' });
        };

        $scope.openDefault = function () {
            ngDialog.open({
                template: 'firstDialogId',
                controller: 'InsideCtrl',
                className: 'ngdialog-theme-default'
            });
        };

        $scope.openPlain = function () {
            $rootScope.theme = 'ngdialog-theme-plain';

            ngDialog.open({
                template: 'firstDialogId',
                controller: 'InsideCtrl',
                className: 'ngdialog-theme-plain'
            });
        };

        $scope.openTemplate = function () {
            $scope.value = true;

            ngDialog.open({
                template: 'externalTemplate.html',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        };

    });


//popup ctrl
angular
    .module('ngWhisk')
    .controller('InsideCtrl', function ($scope, ngDialog) {
    
     $scope.dates = [
                    {name:'Wednesday, Oct 25th 2017 afternoon, from 1 pm to 4 pm', value:'Open Lab on Oct 25th, afternoon'}
            ];
            $scope.myDate = $scope.dates[0]; // default next workshop date = first in the list
    
        $scope.openSecond = function () {
            ngDialog.open({
                template: '<h3><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
                plain: true,
                closeByEscape: false,
                controller: 'SecondModalCtrl'
            });
        };
    });

angular
    .module('ngWhisk')
    .controller('SecondModalCtrl', function ($scope, ngDialog) {
        $scope.closeSecond = function () {
            ngDialog.close();
        };
    });

