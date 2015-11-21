describe("Habit All Controller Tests", function(){
    
    var scope;
    var mockTaskService;
    var mockSharingService;
    
    //create mock TaskService
    beforeEach(
        module('tracktr.services', function($provide){
              $provide.value('TaskService', mockTaskService);
              $provide.value('SharingService', mockSharingService);
              
        })    
    );
      
    // load the controller's module
    beforeEach(module('tracktr.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('HabitAllController', {$scope: scope, $state: {}, $ionicPopup:{}, TaskService: mockTaskService, SharingService: mockSharingService });
    }));
    
    it("Test count no progress", function(){ 
      var task = new Task(tasks[1]);
      var result = task.getProgress();
      expect(result).toBe(0);
    });
    
    it("Test count one daily progress and it occurs today", function(){ 
      var task = new Task(tasks[0]);
      var result = task.getProgress();
      expect(result).toBe(11);
    });
    
    it("Test count two daily progress", function(){ 
      var task = new Task(tasks[2]);
      var result = task.getProgress();
      expect(result).toBe(22);
    });
    
    it("Test count daily progress where date is last Sunday", function(){
       /**
       * If today is Sunday. Previous Sunday will equate to previous Sunday from last week.
       * This means that the progress won't be counted.
       * 
       */
      var today = new Date();
      var task = new Task(tasks[14]);
      var result = task.getProgress();
      
      expect(result).toBe(0);
     
      
    });
    
    it("Test count daily progress where date is today at time 00:00:00", function(){ 
      var task = new Task(tasks[15]);
      var result = task.getProgress();
      expect(result).toBe(10);
    });
    
    it("Test count daily progress where date is today at time 23:59:99", function(){ 
      var task = new Task(tasks[16]);
      var result = task.getProgress();
      expect(result).toBe(10);
    });
    
    it("Test count daily progress where date is next Sunday", function(){ 
      var task = new Task(tasks[17]);
      var result = task.getProgress();
      expect(result).toBe(0);
    });
    
    it("Test weekly task; out of date range", function(){ 
      var task = new Task(tasks[7]);
      var result = task.getProgress();
      expect(result).toBe(0);
    });
    
    it("Test weekly task; in middle of date range", function(){ 
      var task = new Task(tasks[3]);
      var result = task.getProgress();
      expect(result).toBe(40);
    });
    
    it("Test weekly task; 1 progress in range & 1 progress out of range", function(){ 
      var task = new Task(tasks[3]);
      var result = task.getProgress();
      expect(result).toBe(40);
    });
    
    it("Test weekly task; two progress at beginning Sundays at time 00:00:00", function(){ 
      
      /**
       * If today is Sunday. Previous Sunday will equate to previous Sunday from last week.
       * This means that the progress won't be counted.
       * 
       * However, if today is not Sunday. Then progress will be counted, because it's
       * technically within this week.
       */
      var today = new Date();
      
      var task = new Task(tasks[9]);
      var result = task.getProgress();
      
      if(today.getDay() != 0){
      expect(result).toBe(40);
      }
      else{
         expect(result).toBe(0); 
      }
    });
    
    it("Test weekly task; two progress at end Sundays at time 23:59:99", function(){ 
      var task = new Task(tasks[10]);
      var result = task.getProgress();
      expect(result).toBe(40);
    });
    
    it("Test monthly task; First day of month at time 00:00:00", function(){ 
      var task = new Task(tasks[11]);
      var result = task.getProgress();
      expect(result).toBe(10);
    });
    
    it("Test monthly task; Last day of month at time 23:59:99", function(){ 
      var task = new Task(tasks[12]);
      var result = task.getProgress();
      expect(result).toBe(10);
    });
    
    it("Test monthly task; Some day of next month", function(){ 
      var task = new Task(tasks[13]);
      var result = task.getProgress();
      expect(result).toBe(0);
    });
    
    it("Test monthly task; task progress in middle of month", function(){ 
      var task = new Task(tasks[18]);
      var result = task.getProgress();
      expect(result).toBe(10);
    });
    
    it("test shouldDisplayInCurrent for daily inactive task", function(){
        //A task that is in-active shouldn't be displayed in current
        var task = new Task(tasks[0]);
        expect(scope.shouldDisplayInCurrent(task)).toEqual(false);
    });
    
    it("test shouldDisplayInCurrent for daily active everyday task", function(){
        //A task that is active & occurs everyday should be displayed in current
        var task = new Task(tasks[2]);
        expect(scope.shouldDisplayInCurrent(task)).toEqual(true);
    });
    
    it("test shouldDisplayInCurrent for weekly inactive task", function(){
        //A weekly task that is inactive shouldn't be displayed in current
        var task = new Task(tasks[3]);
        expect(scope.shouldDisplayInCurrent(task)).toEqual(false);
    });
    
    it("test shouldDisplayInCurrent for weekly active task", function(){
        //A weekly task that is active should be displayed in current
        var task = new Task(tasks[7]);
        expect(scope.shouldDisplayInCurrent(task)).toEqual(true);
    });
    
    it("test shouldDisplayInCurrent for monthly inactive task", function(){
        //A monthly task that is inactive shouldn't be displayed in current
        var task = new Task(tasks[13]);
        expect(scope.shouldDisplayInCurrent(task)).toEqual(false);
    });
    
    it("test shouldDisplayInCurrent for weekly active task", function(){
        //A monthly task that is active should be displayed in current
        var task = new Task(tasks[12]);
        expect(scope.shouldDisplayInCurrent(task)).toEqual(true);
    });
    
    it("test no progress time task", function(){
        var task = new Task(tasks[19]);
        expect(task.countTime(1)).toEqual(0);
    });
    
    it("test daily time task 1 progress", function(){
        var task = new Task(tasks[20]);
        
        var seconds = task.countTime(1);
        expect(seconds).toEqual(1);
        
        var minutes = task.countTime(2);
        expect(minutes).toEqual(1);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(1);
    });
    
    it("test daily time task 2 progress", function(){
        var task = new Task(tasks[21]);
        
        var seconds = task.countTime(1);
        expect(seconds).toEqual(1);
        
        var minutes = task.countTime(2);
        expect(minutes).toEqual(1);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(2);
    });
    
    it("test daily time task 1 progress today at time 00:00:00", function(){
        var task = new Task(tasks[22]);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(1);
    });
    
    it("test daily time task 1 progress today at time 23:59:99", function(){
        var task = new Task(tasks[23]);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(1);
    });
    
    it("test daily time task 1 progress not today", function(){
        var task = new Task(tasks[24]);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(0);
    });
    
    it("test weekly time task 1 progress not today", function(){
        var task = new Task(tasks[25]);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(0);
    });
    
    it("test weekly time task 1 progress today", function(){
        var task = new Task(tasks[26]);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(1);
    });
    
    it("test weekly time task 1 progress prev sunday", function(){
        var task = new Task(tasks[27]);
        
        var minutes = task.countTime(2);
        expect(minutes).toEqual(1);
    });
    
    it("test weekly time task 1 progress next sunday", function(){
        var task = new Task(tasks[28]);
        
        var hours = task.countTime(3);
        expect(hours).toEqual(1);
    });
    
    it("test monthly time task 1 progress middle day of this month", function(){
        var task = new Task(tasks[29]);
        var minutes = task.countTime(2);
        var hours = task.countTime(3);
        expect(minutes).toEqual(1);
        expect(hours).toEqual(1);
    });
    
     it("test monthly time task 1 progress first day of this month", function(){
        var task = new Task(tasks[30]);
        var minutes = task.countTime(2);
        var hours = task.countTime(3);
        expect(minutes).toEqual(0);
        expect(hours).toEqual(1);
    });
    
    it("test monthly time task 1 progress last day of this month", function(){
        var task = new Task(tasks[31]);
        var minutes = task.countTime(2);
        var hours = task.countTime(3);
        expect(minutes).toEqual(0);
        expect(hours).toEqual(1);
    });
    
    it("test monthly time task 1 progress some day of next month", function(){
        var task = new Task(tasks[32]);
        var minutes = task.countTime(2);
        var hours = task.countTime(3);
        expect(minutes).toEqual(0);
        expect(hours).toEqual(0);
    });
    
});

 