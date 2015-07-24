angular.module('tink.filter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/filter.html',
    "<div> <div ng-repeat=\"selectBox in ctrl.getSelectBoxen()\"> <tink-select-box ng-model=selectBox select-change=boxChanged($data,$parent)></tink-select-box> <tink-select-box ng-if=selectBox.linkName ng-model=selectBox.linkedObj select-change=boxChanged($data)> </tink-select-box> </div> </div>"
  );


  $templateCache.put('templates/selectbox.html',
    "<div class=form-group> <label ng-bind=ctrl.getTitle()></label> <div ng-repeat=\"box in filterResult = (ctrl.getSelections() | orderBy:'name' | filter:{disabled:!true})\" class=checkbox> <input type=checkbox id={{$id}}-{{$index}} ng-disabled=box.disabled ng-model=box.checked ng-change=ctrl.callback(box) name={{$id}}-{{$index}} value={{box.name}}> <label for={{$id}}-{{$index}} ng-bind=box.name></label> </div> <div ng-if=\"filterResult.length === 0\"> Geen opties voor deze categorie mogelijk. </div> </div>"
  );

}]);
