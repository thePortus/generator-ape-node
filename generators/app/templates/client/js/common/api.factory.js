(function() {
  'use strict';


  angular.module('ape.app')
    .factory('Api', apiFactory);

    /*Table factory function definition*/
    function apiFactory($http, Auth) {
      return apiCall;

    function apiCall(item_type, item_id, item_subtable, options) {
      return new API(item_type, item_id, item_subtable, options);

      function API(item_type, item_id, item_subtable, options) {
        /* jshint validthis: true */
        var vm = this;

        /* Properties */
        vm.item_type = item_type;
        vm.item_id = null;
        vm.item_subtable = null;
        vm.info = null;
        vm.options = {
          auth: false
        };

        /* Methods */
        vm.initialize = initialize;
        vm.get = get;
        /* Initialization Call */
        vm.initialize();

        /*Functions*/
        function initialize() {
          if(typeof(options) !== 'undefined') {
            vm.options = options;
          }
          if(typeof item_id !== 'undefined') {
            vm.item_id = item_id;
          }
          if(typeof item_subtable !== 'undefined') {
            vm.item_subtable = item_subtable;
          }
        }

        function get(itemFactoryCallBack) {
          var path = '/api/' + vm.item_type + '/';
          if(vm.item_id !== null) {
            path += vm.item_id;
          }
          if(vm.item_subtable !== null) {
            path += '/' + vm.item_subtable;
          }

          if(vm.options.auth) {
            $http({
              method: 'GET',
              url: path,
              headers: {
               'Authorization': Auth.jsonWebToken
              }
            })
              // Retrieving data
              .then(get_info_complete)
              // Handling errors
              .catch(get_info_error);
          }
          else{
            $http({
              method: 'GET',
              url: path
            })
              // Retrieving data
              .then(get_info_complete)
              // Handling errors
              .catch(get_info_error);
          }
            function get_info_complete(response) {
              itemFactoryCallBack(response.data);
            }

            function get_info_error(error) {
              if(typeof error.data !== 'undefined') {
                console.log('Error:' + error.data);
              }
            }
        }
        /* close get */
    }
    /*close API*/

  }
  /*close apiCall*/

}
/*close apiFactory*/

})();
