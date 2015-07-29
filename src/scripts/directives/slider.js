'use strict';
(function(module) {
  try {
    module = angular.module('tink.filter');
  } catch (e) {
    module = angular.module('tink.filter', ['tink.safeApply']);
  }
  module.directive('slider', function (safeApply) {
  return {
    restrict: 'A',
    scope: {
      start: '=',
      step: '@',
      end: '=',
      callback: '@',
      margin: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    template:'<div><div class="slider" style="margin-right:10px;margin-left:10px;"></div><span class="pull-left">{{ngFrom | date: \'yyyy\'}}</span><span class="pull-right">{{ngTo | date: \'yyyy\'}}</span></div>',
    link: function (scope, element, attrs) {
      var callback, fromParsed, parsedValue, slider, toParsed;
      slider = $(element).find('.slider').get(0);
      callback = scope.callback ? scope.callback : 'slide';

      
      if(!scope.start || !scope.end){
        return;
      }
      if(!scope.step){
        scope.step = 1
      }

      if(!scope.ngFrom || !scope.ngTo){
        scope.ngFrom = scope.start;
        scope.ngTo = scope.end;
      }

        parsedValue = null;
        noUiSlider.create(slider,{
          start: [ scope.ngFrom.getFullYear() , scope.ngTo.getFullYear()],
          step:  (parseInt(scope.step)),
          range: {
            min: scope.start.getFullYear(),
            max: scope.end.getFullYear()
          }
        });
  
        slider.noUiSlider.on('update', function( values, handle ) {
          safeApply(scope,function(){
            var value1 = new Date(parseInt(values[0]).toString()),
            value2 = new Date(parseInt(values[1]).toString())
            scope.ngFrom = value1;
            scope.ngTo = value2;
          })
        });
      
    }
  };
});
})();