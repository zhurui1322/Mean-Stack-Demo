
'use strict';

angular
.module('app')
.controller('MessageController', MessageController);


MessageController.$inject = ['$location', '$scope', 'UserService', 'MessageService', '$rootScope', '$http', '$filter'];
function MessageController($location, $scope, UserService, MessageService, $rootScope, $http, $filter) {

    
    getAllMessages();
    var vm = this;
    vm.user = null;
    initController();

        function initController() {
            loadCurrentUser();
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user[0];
                });
        }

    function getAllMessages() {
        MessageService.getMessages().then(function(data) {
            $scope.messages = data;
        });
    };



    $scope.go = function(message) {
        var url = '/messagedetail/' + message.id;
        $location.path(url);
    };


    function getMaxMessagesId() {
        var maxId = 0;
        for(var i = 0; i < $scope.messages.length; i++) {
            if(maxId < $scope.messages[i].id) {
                maxId = $scope.messages[i].id;
            }
        }
        return maxId;
    }   



    $scope.addMessage = function() {
        var datetime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            var newMessages = {
                "id": getMaxMessagesId() + 1,
                "recipient": $scope.myRecipient,
                "recipient_img": "https://freeiconshop.com/wp-content/uploads/edd/person-flat.png",
                "sender": vm.user.username,
                "sender_img": vm.user.avatar,
                "title": $scope.myTitle,
                "description":$scope.myTextarea,
                "created_at": datetime,
                "important": "0",
                "comments": []
            };   
            MessageService.insertMessage(newMessages).then(function(data) {
                $scope.myTitle = "";
                $scope.myRecipient = "";
                $scope.myTextarea = "";
                getAllMessages();
            });
            
            //updateMessage();   
        }
        

      

    };


  