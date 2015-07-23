'use strict';
(function(module) {
  try {
    module = angular.module('tink.filter');
  } catch (e) {
    module = angular.module('tink.filter', []);
  }
  module.directive('tinkSelectBox', [function () {
    return {
      restrict: 'EA',
      templateUrl: 'templates/selectbox.html',
      replace: true,
      scope:{
        ngModel:'=',
        selectChange:'&'
      },
      controllerAs:'ctrl',
      controller:function($scope){
        var selectbox={title:'',selection:[]},
        ctrl = this;
        ctrl.setTitle = function(title){
          selectbox.title = title;
        };
        ctrl.getTitle = function(){
          return selectbox.title;
        };
        ctrl.addSelection = function(selection){
          selectbox.selection.push(selection);
        };
        ctrl.getSelections = function(){
          return selectbox.selection;
        }
        ctrl.callback = function(data){
          if(data.checked){
            if(angular.isDefined($scope.selectedBox)){
              $scope.selectedBox.checked = false;
              $scope.selectChange({$data:$scope.selectedBox});
            }
            $scope.selectedBox = data;
          }else if(data.checked === false){
            $scope.selectedBox = undefined;
          }
          $scope.selectChange({$data:data});
        }

      },
      link: function(scope,ellem,attr,ctrl) {
        scope.selectedBox = undefined;
        scope.$watch('ngModel',function(newv,oldv){
          if(angular.isDefined(newv)){
            ctrl.setTitle(newv.name);
            angular.forEach(newv.selections,function(v,k){
              ctrl.addSelection(v);
            })
          }
        });
      }
    };
  }]);
})();
