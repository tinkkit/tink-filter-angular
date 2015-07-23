'use strict';
(function(module) {
  try {
    module = angular.module('tink.filter');
  } catch (e) {
    module = angular.module('tink.filter', []);
  }
  module.directive('tinkFilter', [function () {
    return {
      restrict: 'EA',
      scope: {
        ngModel:'='
      },
      templateUrl: 'templates/filter.html',
      replace: true,
      controllerAs:'ctrl',
      controller:function(){
        var ctrl = this,
        selectboxen = [];

        ctrl.getSelectBoxen = function(){
          return selectboxen;
        };
        ctrl.addSelectBox = function(selectbox){
          selectboxen.push(selectbox);
        };
        ctrl.removeSelectBox = function(selectbox){
          var index = selectboxen.indexOf(selectbox);
          selectboxen = selectboxen.splice(0,2);
        }
      },
      link: function(scope,elem,attr,ctrl) {
        scope.$watch('ngModel',function(values){
          angular.forEach(values,function(val){
            ctrl.addSelectBox(val);
          });          
        });

        scope.boxChanged = function(data){
          console.log(data);
          if(data.selections && data.checked){
            angular.forEach(data.selections,function(val){
              ctrl.addSelectBox(val);
            })
          }else if(!data.checked){
            angular.forEach(data.selections,function(val){
              ctrl.removeSelectBox(val);
            })
          }
        }
      }
    };
  }]);
})();
