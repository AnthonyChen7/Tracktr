describe("Habit All Controller Tests", function(){
    
    var scope;
    
    beforeEach(
        module('tracktr.services')    
    );
      
    // load the controller's module
     beforeEach(module('tracktr.controllers'));

//     beforeEach(inject(function($rootScope, $controller) {
//         scope = $rootScope.$new();
//         $controller('HabitAllController', {$scope: scope, $state: {}, $ionicPopup:{}, TaskService:{} });
//     }));
    
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
    
    it("Test count daily progress where date is prev Sunday", function(){ 
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
      var task = new Task(tasks[9]);
      var result = task.getProgress();
      expect(result).toBe(40);
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
    
    
});

 