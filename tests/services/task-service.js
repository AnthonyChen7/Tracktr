describe('Task Service Unit Tests', function(){
    var TaskService;
    beforeEach(module('tracktr.services'));

	// Inject Task Service before each test 
    beforeEach(inject(function (_TaskService_) {
        TaskService = _TaskService_;
    }));

    it('can get an instance of my Taskservice', inject(function(TaskService) {
        expect(TaskService).toBeDefined();
    }));

    // it('has 5 chats', inject(function(TaskService) {
    //     expect(TaskService.all().length).toEqual(5);
    // }));

    // it('has Max as friend with id 1', inject(function(TaskService) {
		
    // }));
});