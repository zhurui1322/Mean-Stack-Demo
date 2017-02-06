(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
 
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
 
        return service;
 
        function GetByUsername(username) {
            //console.log(username);
            var input = {'username': username};
            return $http.post('/api/users/GetByUsername' ,input).then(handleSuccess, handleError('Error getting user by username'));
        }
 
        function Create(user) {
            var input = {'user' : user};
            return $http.post('/api/users/create' , input).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            //console.log(user.username);
            var input = {'user' : user};
            return $http.post('/api/users/update' , input).then(handleSuccess, handleError('Error updating user'));
        }
 
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