
        .state('<%= slugifiedComponentName %>', {
          url: '/<%= slugifiedRoutePath %>',
          templateUrl: 'js/<%= slugifiedModuleName %>/<%= slugifiedComponentName %>.view.template.html',
          controller: '<%= classifiedComponentName %>Controller',
          controllerAs: 'vm'
        });/* leave me here: auto route addition */