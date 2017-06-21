(function () {
    'use strict';

    angular.module('organizations')
        .controller('ReqOrgInfoController', ReqOrgInfoController)

    ReqOrgInfoController.$inject = ['$log', '$scope', '$state', 'reqOrgInfoResolve', '$window', 'Authentication', 'ReqOrgInfoService'];

    function ReqOrgInfoController($log, $scope, $state, reqOrgInfo, $window, Authentication, ReqOrgInfoService) {
        var vm = this;

        vm.reqOrgInfo = reqOrgInfo;
        vm.authentication = Authentication;
        vm.error = null;
        vm.reqOrgInfoForm = {};
        vm.remove = remove;
        vm.save = save;

        // Remove existing Certificate
        function remove() {
            if ($window.confirm('Estás seguro de querer borrar la solicitud de información sobre una organi?')) {
                vm.reqOrgInfo.$remove($state.go('articles.list'));
            }
        }


        function save(isValid) {

            
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity');
                return false;
            }

            // TODO: move create/update logic to service
            vm.reqOrgInfo.$save(successCallback, errorCallback);

            function successCallback(res) {
                $state.go('reqOrgInfo.confirmOrgInfoRequest', {
                    reqOrgInfoId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
}())