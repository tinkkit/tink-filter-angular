'use strict';
(function(module) {
  try {
    module = angular.module('tink.filter');
  } catch (e) {
    module = angular.module('tink.filter', ['tink.safeApply']);
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
          
          var object = {name:selectbox.linkName,selections:[]};

          angular.forEach(selectbox.selections,function(v){
            angular.forEach(v.link,function(v1){
              object.selections.push(v1);
            })
          })

          selectbox.linkedObj = object;
          selectboxen.push(selectbox);
        };
        ctrl.removeSelectBox = function(selectbox){
          var index = selectboxen.indexOf(selectbox);
          selectboxen = selectboxen.splice(0,2);
        };

      },
      link: function(scope,elem,attr,ctrl) {
        scope.$watch('ngModel',function(values){
          angular.forEach(values,function(val){
            //angular copy so it won't be bidirectional.
            ctrl.addSelectBox(angular.copy(val));
           });          
        });

        scope.boxChanged = function(data,parent){console.log(data)
          if(parent && parent.linkedObj){
            if(data.checked){
              angular.forEach(parent.linkedObj.selections,function(v,k){
                v.disabled = true;
              })
              angular.forEach(data.link,function(v){
                var index = parent.linkedObj.selections.indexOf(v);
                parent.linkedObj.selections[index].disabled = false;
              })
            }else{
              angular.forEach(parent.linkedObj.selections,function(v,k){
                v.disabled = false;
              })
            }
          }
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
