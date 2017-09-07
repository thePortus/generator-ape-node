(function() {
  'use strict';


  angular.module('ape-node.common')
    .factory('Auth', authFactory);

    /*Factory function definition, put Angular services here*/
    function authFactory($http, API_ROUTE) {
      return new Auth();

      function Auth() {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.jsonWebToken = null;
        vm.userData = {
          username: null
        };

        /* Methods */
        vm.login = login;
        vm.logout = logout;

        /*Functions*/
        function login(username, password, successCB, failureCB) {
          var req = {
            method: 'POST',
            url: API_ROUTE + 'authenticate/',
            headers: {
             'Content-Type': 'application/json'
            },
            data: {
              username: username,
              password: password
            }
          };
          $http(req)
            // Retrieving data
            .then(loginCB)
            // Handling errors
            .catch(loginError);

            function loginCB(response) {
              vm.jsonWebToken = response.data.token;
              if(response.data.success) {
                vm.userData.username = username;
                successCB(response.data);
              }
              else {
                failureCB([response.data.message]);
              }
            }

            function loginError(error) {
              if(typeof error.data !== 'undefined') {
                failureCB([error.data.message]);
              }
            }
        }

        function logout() {
          vm.jsonWebToken = null;
        }


    }
    /*close Auth*/

}
/*close authFactory*/

})();
