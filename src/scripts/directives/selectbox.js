'use strict';
(function(module) {
  try {
    module = angular.module('tink.filter');
  } catch (e) {
    module = angular.module('tink.filter', ['tink.safeApply']);
  }
  module.directive('tinkSelectBox', ['$filter',function ($filter) {
    return {
      restrict: 'EA',
      templateUrl: 'templates/selectbox.html',
      scope:{
        ngModel:'=',
        selectChange:'&'
      },
      controllerAs:'ctrl',
      controller:function($scope){
        var selectbox,
        ctrl = this;

        ctrl.init = function(){
          selectbox={title:'',selection:[],parent:undefined};
        }        
        ctrl.setTitle = function(title){
          selectbox.title = title;
        };
        ctrl.setParent = function(parent){
          selectbox.parent = parent;
        }
        ctrl.getParent = function(){
          return selectbox.parent;
        }
        ctrl.getTitle = function(){
          return selectbox.title;
        };
        ctrl.addSelection = function(selection){
          if(!angular.isDefined(selection.disabled)){
            selection.disabled = false;
          }
          selectbox.selection.push(selection);
        };
        ctrl.getSelections = function(){
          return selectbox.selection;
        }
        ctrl.callback = function(data){
          var selected = $filter('filter')($scope.ngModel.selections, {checked: true});
          $scope.selectChange({$data:data,$parent:selectbox.parent});
        }

      },
      link: function(scope,ellem,attr,ctrl) {
        ctrl.init();
        scope.$watch('ngModel',function(newv,oldv){
          ctrl.init();
          ctrl.setParent(newv);
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
