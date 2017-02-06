(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('MessageService', MessageService);
 
    MessageService.$inject = ['$http'];
    function MessageService($http) {
        var service = {};
 
        service.getMessages = getMessages
        service.insertMessage = insertMessage;
        service.getMessageById = getMessageById;
        service.deleteMessageById = deleteMessageById;
        service.updateMessage = updateMessage;
 
        return service;
 
        function getMessages() {
            return $http.post('/api/messages/getAll').then(handleSuccess, handleError('Error getting user by username'));
        };

        function insertMessage(messages) {
            return $http.post('/api/messages/insertMessage', messages).then(handleSuccess, handleError('Error getting user by username'));
        };

        function getMessageById(id) {
            var input = {'id': id};
            return $http.post('/api/messages/getMessageById', input).then(handleSuccess, handleError('Error getting user by username'));
        };


        function deleteMessageById(id) {
            var input = {'id': id};
            return $http.post('/api/messages/deleteMessageById', input).then(handleSuccess, handleError('Error getting user by username'));
        };

        function updateMessage(message) {
            return $http.post('/api/messages/updateMessage', message).then(handleSuccess, handleError('Error getting user by username'));
        };

 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();