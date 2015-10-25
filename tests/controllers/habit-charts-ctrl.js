describe('Habit Charts Controller Tests', function(){
    var scope;
    
    // load the controller's module
    beforeEach(module('tracktr.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('HabitChartsController', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(scope.testBoolean).toEqual(true);
    });
});