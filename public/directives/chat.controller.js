(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', 'UserService', '$rootScope'];
    function ChatController($scope, UserService, $rootScope, $http) {
        
        var vm = this;
        vm.user = null;
        //initController();
		
        $scope.chatInfo = [
        	{
        		chatMessags: 'How are you ???',
        		classType: 'self',
        		chatAvatar: 'app-content/img/userOne.png',
        		chatCreated_by : "3:30"
        	}, 
        	{
        		chatMessags: 'I am fine',
        		classType: 'friend',
        		chatAvatar: 'app-content/img/userTwo.png',
        		chatCreated_by : "3:32"
        	},
        	{
        		chatMessags: 'Nice I am good too',
        		classType: 'self',
        		chatAvatar: 'app-content/img/userOne.png',
        		chatCreated_by : "3:35"
        	},
        ];

        console.log($scope.chatInfo[0].chatMessags);


        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user[0];
                });
        }
    }
})();