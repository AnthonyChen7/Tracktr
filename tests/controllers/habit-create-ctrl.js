describe('Habit Create Controller Tests', function() {
    var scope;
    
    // Load the controllers module
    beforeEach(module('tracktr.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('HabitCreateController', {$scope: scope});
    }));

    // Tests start here
    // it('should have initialized with testBoolean as true', function() {
    //     expect(scope.testBoolean).toEqual(true);
    // });
});