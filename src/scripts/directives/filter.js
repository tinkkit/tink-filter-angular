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
        ngModel:'=',
        tinkSelected:'='
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
        ctrl.getLinkBoxes = function(obj){
          var selectbox;
          angular.forEach(selectboxen,function(val){
            if(val.selections){
              var objIndex = val.selections.indexOf(obj);
              if(objIndex>-1){
                selectbox = val;
              }
            }  
          })
          return selectbox;
        };
        ctrl.addSelectBox = function(selectbox){
          
          var object = {name:selectbox.linkName,selections:[]};

          angular.forEach(selectbox.selections,function(v){
            angular.forEach(v.link,function(v1){
              object.selections.push(v1);
            })
          });
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
            ctrl.addSelectBox(val);
           });          
        });

        //hier komt de
        scope.$watch('tinkSelected',function(newValue,oldvalue){
         var select = [];

         if(newValue.length === 0){
          angular.forEach(ctrl.getSelectBoxen(),function(data){
            angular.forEach(data.linkedObj.selections,function(v){
              v.disabled = false;
            });
          });
         }

         var linkChecked = false;
         angular.forEach(newValue,function(data){
          var parent = ctrl.getLinkBoxes(data);
          
            if(data.link){
              select = select.concat(data.link);
              data.checked = true;
              data.disabled = false;
              linkChecked = true;
            }else if(parent && parent.selections.indexOf(data) > -1){
              linkChecked = true;
            }
            if(linkChecked){
              angular.forEach(ctrl.getSelectBoxen(),function(data){
                angular.forEach(data.linkedObj.selections,function(v){
                  v.disabled = true;
                });
              }); 
            }
          });

         if(select.length !== 0){            
            angular.forEach(select,function(data){
              data.disabled = false;
            });
         };
        },true);

        scope.boxChanged = function(data,parent){
          var indexChecked = scope.tinkSelected.indexOf(data);
          if(data.checked){           
            if(indexChecked === -1){
              scope.tinkSelected.push(data);
            }
          }else{
            if(indexChecked !== -1){
              var par = parent.linkedObj || parent;
              angular.forEach(par.selections,function(v){
                  v.checked = false;
                  var indexSelect = scope.tinkSelected.indexOf(v);
                  if(indexSelect > -1){
                    scope.tinkSelected.splice(indexSelect,1);
                  }                  
              })
              indexChecked = scope.tinkSelected.indexOf(data);
              scope.tinkSelected.splice(indexChecked,1);              
            }
          };
        }
      }
    };
  }]);
})();