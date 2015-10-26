describe('Habit Charts Controller Tests', function(){
    var scope;
    
    // load the controller's module
    beforeEach(module('tracktr.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('HabitChartsController', {$scope: scope});
    }));

    // tests start here
    it('should have initialized with testBoolean as true', function(){
        expect(scope.testBoolean).toEqual(true);
    });
});