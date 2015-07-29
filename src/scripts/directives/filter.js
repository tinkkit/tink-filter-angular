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

        ctrl.getCategorieObject = function(obj){
          var selectbox;
          angular.forEach(selectboxen,function(val){
            if(val.selections){
              var objIndex = val.selections.indexOf(obj);
              if(objIndex>-1){
                selectbox = val;
              }else{
                angular.forEach(val.selections,function(val2){
                  if(val2.link){
                    var objIndex = val2.link.indexOf(obj);
                    if(objIndex>-1){
                      selectbox = val;
                    }
                  }
                })
              }
            }  
          })
          return selectbox;
        }
        ctrl.catClicks = function(obj){
          var clicks = [];
          angular.forEach(obj.selections,function(v){
            if(v.checked){
              clicks.push(v);
            }
          });
          return clicks;
        }
        ctrl.getLinkBoxes = function(obj){
          var selectbox;
          angular.forEach(selectboxen,function(val){
            if(val.selections){
              var objIndex = val.selections.indexOf(obj);
              if(objIndex>-1){
                selectbox = val;
              }else{
                angular.forEach(val.selections,function(val2){
                  if(val2.link){
                    var objIndex = val2.link.indexOf(obj);
                    if(objIndex>-1){
                      selectbox = val2;
                    }
                  }
                })
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

        function watc(newArray,oldArray){
          var added = newArray;
          var removed = $(oldArray).not(newArray).get();
          var activate = [];


          added.every(function(element, index, array){
            var object = ctrl.getCategorieObject(element);
            var catClicks = ctrl.catClicks(object);
            if(object && catClicks.length > 0 && catClicks.indexOf(element) === -1){
              if(catClicks.indexOf(ctrl.getLinkBoxes(element)) === -1){
                var indexSelect = scope.tinkSelected.indexOf(element);
                scope.tinkSelected.splice(indexSelect,1);
                return false;
              }else{
                element.checked = true;
                element.disabled = false;
              }
            }else{
              if(element.link){
                activate = activate.concat(element.link);
              }
              element.checked = true;
              element.disabled = false;
            }
            return true;
          });

          removed.every(function(element, index, array){
            element.checked = false;
            return true;
          });
          angular.forEach(ctrl.getSelectBoxen(),function(v){
            var catClicks = ctrl.catClicks(v);
            if(catClicks.length > 0){
              angular.forEach(v.linkedObj.selections,function(v2){
                if(activate.indexOf(v2) === -1){
                  v2.disabled = true;
                  v2.checked = false;
                }else{
                  v2.disabled = false;
                }
              });
            }else{
              angular.forEach(v.linkedObj.selections,function(v2){
                  v2.disabled = false;
              });
            }       
          });
        }
        scope.$watchCollection('tinkSelected',watc);

        scope.boxChanged = function(data,parent){
          var indexChecked = scope.tinkSelected.indexOf(data);
          if(data.checked){           
            if(indexChecked === -1){
              scope.tinkSelected.push(data);
            }
          }else{
            if(indexChecked !== -1){
              scope.tinkSelected.splice(indexChecked,1);              
            }
          };
        }
      }
    };
  }]);
})();