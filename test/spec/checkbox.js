'use strict';
describe('tink-skeleton-angular', function() {

  var bodyEl = $('body'), sandboxEl;
  var $compile, $templateCache, scope;

  beforeEach(module('tink.filter'));
  beforeEach(module('templates'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _$templateCache_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    bodyEl.html('');
    sandboxEl = $('<div>').attr('id', 'sandbox').appendTo(bodyEl);

    var template = $templateCache.get('src/templates/selectbox.html');
    $templateCache.put('templates/selectbox.html',template);
    //template = $templateCache.get('src/templates/tinkDatePickerInput.html');
    //$templateCache.put('templates/tinkDatePickerInput.html',template);

  }));

  afterEach(function() {
    scope.$destroy();
    sandboxEl.remove();
  });

  function compileDirective(template, locals) {
    template = templates[template];
    angular.extend(scope, angular.copy(template.scope || templates['default'].scope), locals);
    var element = $(template.element).appendTo(sandboxEl);
    element = $compile(element)(scope);
    scope.$digest();
    return jQuery(element[0]);
  }

  var data  =  [{
          name:'Categorie',
          linkName:'type',
          selections:[
          {
            name:'Persoongegevens',
            link:[
              {
                name:'Administratieve toestand'
              },
              {
                name:'Burgerlijke staat'
              },
              {
                name:'Geboorte & overlijden'
              },
              {
                name:'Identiteitsbewijzen'
              },
              {
                name:'Naam'
              },
              {
                name:'Nationaliteit'
              },
              {
                name:'Rijksregisternummer'
              },
              {
                name:'Vingerafdruk'
              }
            ]
          },
          {
            name:'Adresgegevens',
            link:[
              {
                name:'Adreswijziging'
              },
              {
                name:'Afwezigheid'
              },
              {
                name:'Aanvraag inschrijving'
              },
              {
                name:'Buitenlands adres'
              },
              {
                name:'Verblijfsadres'
              },
              {
                name:'Hoofdverblijfplaats'
              },
              {
                name:'Verzendadres'
              },
              {
                name:'Wettelijke woonplaats'
              }
            ]
          },
          {
            name:'Gezin',
            link:[
            {
              name:'Gezinssamenstelling'
            },
            {
              name:'Wettelijk samenwonen'
            }]
          },
          {
            name:'Werk & financieel',
            link:[
            {
              name:'Arbeidskaart'
            },
            {
              name:'Beroep'
            },
            {
              name:'Beroepskaart'
            },
            {
              name:'Rekening'
            }]
          },
          {
            name:'Afstamming'
          },
          {
            name:'Vertegenwoordiging'
          }]
        }];

  var templates = {
    'default': {
      scope: {},
      element: '<tink-select-box ng-model="selectBox" select-change="boxChanged($data,$parent)"></tink-select-box>'
    }
  };


  describe('default', function() {
    it('set type on controller',function(){
      var scop = {selectBox:data[0],boxChanged:function(d,p){

      }};
      var element = compileDirective('default',scop);
      scope.$apply();
      var ctrl = element.isolateScope().ctrl;
      expect(ctrl.getTitle()).toBe('Categorie')
    });

    it('check if the parent is the same',function(){
      var scop = {selectBox:data,boxChanged:function(d,p){

      }};
      var element = compileDirective('default',scop);
      scope.$apply();
      var ctrl = element.isolateScope().ctrl;

      expect(ctrl.getParent()).toBe(data);
    });
  });


});