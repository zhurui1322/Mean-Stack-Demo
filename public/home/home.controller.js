(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'UserService', '$rootScope'];
    function HomeController($scope, UserService, $rootScope, $http) {
        
        var vm = this;
        vm.user = null;
        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user[0];
                });
        }


       $scope.updateInfo = function() {
            UserService.Update(vm.user);
        };


    }
})();