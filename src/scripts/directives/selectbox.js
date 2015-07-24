'use strict';
(function(module) {
  try {
    module = angular.module('tink.filter');
  } catch (e) {
    module = angular.module('tink.filter', ['nouislider','tink.safeApply']);
  }
  module.directive('tinkSelectBox', [function () {
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
          if(data.checked){
            if(angular.isDefined($scope.selectedBox)){
              $scope.selectedBox.checked = false;
              $scope.selectChange({$data:$scope.selectedBox});
            }
            $scope.selectedBox = data;
          }else if(data.checked === false){
            $scope.selectedBox = undefined;
          }
          $scope.selectChange({$data:data,$parent:selectbox.parent});
        }

      },
      link: function(scope,ellem,attr,ctrl) {
        ctrl.init();
        scope.selectedBox = undefined;
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