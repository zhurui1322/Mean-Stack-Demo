
'use strict';

angular
.module('app')
.controller('MessageDetailController', MessageDetailController);


MessageDetailController.$inject = ['$location', '$scope', 'UserService', 'MessageService', '$rootScope', '$http', '$filter','$routeParams'];
function MessageDetailController($location,$scope, UserService, MessageService, $rootScope, $http, $filter, $routeParams) {


    var vm = this;
    vm.user = null;
    GetById($routeParams.id);
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

        function GetById(id) {
            MessageService.getMessageById(id).then(function(data) {
                console.log(data[0]);
                vm.message = data[0];
            });       
        }


        function getMessages() {
            $scope.messages = [];
            if(!localStorage.messages){
                $http.get('data.json').then(function(data) {
                    $scope.messages = data.data;
                    localStorage.messages = JSON.stringify($scope.messages);
                    return localStorage.messages;
                });
            }

            return JSON.parse(localStorage.messages);
        };

        function setMessages(messages) {
            localStorage.messages = JSON.stringify(messages);
        };


        $scope.delete = function(message) {
            MessageService.deleteMessageById(vm.message.id).then(function(data) {
                var url = '/message/';
                $location.path(url);
            });
            
        };

        $scope.decrease = function(message) {
            var important = parseInt(message.important);
            if(important > 1) {
                important -= 1;
                vm.message.important = important.toString();
                updateMessage(vm.message);
            }
        };

        $scope.increase = function(message) {
            var important = parseInt(message.important);
            if(important < 9) {
                important += 1;
                vm.message.important = important.toString();
                updateMessage(vm.message);
            }
        };


        function updateMessage(message) {
            MessageService.updateMessage(message).then(function(data) {

            });
        };

        $scope.deleteComment = function(comment) {
            //console.log("delete" + vm.message.comments.length);
            for(var i = 0; i < vm.message.comments.length; i++) {
                if(comment.created_at === vm.message.comments[i].created_at) {
                    vm.message.comments.splice(i,1);
                    break;
                }
            }
            updateMessage(vm.message);
        };


        $scope.addComment = function() {
            var datetime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            var indexOfComments = vm.message.comments.length;

            vm.message.comments.push({
                "sender_img": vm.user.avatar,
                "sender": vm.user.username,
                "content": $scope.myTextarea,
                "created_at": datetime
            });   

            $scope.myTextarea = "";
            updateMessage(vm.message);   
        }

    };
