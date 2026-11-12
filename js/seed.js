// Your routines and workout history, imported from TalkFile_Workouts1.xlsx.
// This is only the starting data: once you edit or log on the site, the site keeps its own copy.

export const seedRoutines = [
 {
  "id": "r1",
  "name": "Chest-Triceps-Shoulders",
  "exercises": [
   {
    "name": "Incline Press",
    "group": "Chest",
    "sets": 3
   },
   {
    "name": "Seated Cable Flys",
    "group": "Chest",
    "sets": 3
   },
   {
    "name": "Single Arm Overheads",
    "group": "Triceps",
    "sets": 3
   },
   {
    "name": "Rope Push Down",
    "group": "Triceps",
    "sets": 3
   },
   {
    "name": "DB overheads",
    "group": "Shoulders",
    "sets": 2
   },
   {
    "name": "Lateral Raises",
    "group": "Shoulders",
    "sets": 2
   },
   {
    "name": "Chest Supported DB Front Raise",
    "group": "Shoulders",
    "sets": 2
   },
   {
    "name": "Bent Over Shoulder Press",
    "group": "Shoulders",
    "sets": 2
   }
  ]
 },
 {
  "id": "r2",
  "name": "Back-Biceps",
  "exercises": [
   {
    "name": "Lat Pulldowns",
    "group": "Back",
    "sets": 3
   },
   {
    "name": "V-Bar Close-grip Cable Rows",
    "group": "Back",
    "sets": 3
   },
   {
    "name": "T-Bar Rows",
    "group": "Back",
    "sets": 3
   },
   {
    "name": "Preacher Curls",
    "group": "Biceps",
    "sets": 3
   },
   {
    "name": "Incline DB Curls",
    "group": "Biceps",
    "sets": 3
   }
  ]
 },
 {
  "id": "r3",
  "name": "Legs-Abs",
  "exercises": [
   {
    "name": "Cable Crunches",
    "group": "Abs",
    "sets": 3
   },
   {
    "name": "Leg Raises",
    "group": "Abs",
    "sets": 3
   },
   {
    "name": "Romanian Deadlift",
    "group": "Legs",
    "sets": 2
   },
   {
    "name": "Hack Squat",
    "group": "Legs",
    "sets": 2
   },
   {
    "name": "Seated Leg Curls",
    "group": "Legs",
    "sets": 2
   },
   {
    "name": "Seated Leg Extension",
    "group": "Legs",
    "sets": 2
   }
  ]
 },
 {
  "id": "r4",
  "name": "Arms",
  "exercises": [
   {
    "name": "Single Arm Overheads",
    "group": "Triceps",
    "sets": 3
   },
   {
    "name": "Rope Push Down",
    "group": "Triceps",
    "sets": 3
   },
   {
    "name": "Preacher Curls",
    "group": "Biceps",
    "sets": 3
   },
   {
    "name": "Incline DB Curls",
    "group": "Biceps",
    "sets": 3
   },
   {
    "name": "Barbell Overheads",
    "group": "Shoulders",
    "sets": 2
   },
   {
    "name": "Lateral Raises",
    "group": "Shoulders",
    "sets": 2
   },
   {
    "name": "Chest Supported DB Front Raise",
    "group": "Shoulders",
    "sets": 2
   },
   {
    "name": "Bent Over Shoulder Press",
    "group": "Shoulders",
    "sets": 2
   }
  ]
 }
];

export const seedSessions = [{"id":"seed-r1-1","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":1,"date":"2026-09-04","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":8,"reps":"20","rest":2},{"kg":8,"reps":"15","rest":2},{"kg":8,"reps":"13","rest":3}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":15,"reps":"17","rest":1.5},{"kg":15,"reps":"10","rest":1.5}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":10,"reps":"15-15","rest":2},{"kg":10,"reps":"10-10","rest":2},{"kg":10,"reps":"7-9","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":25,"reps":"5","rest":2},{"kg":20,"reps":"8","rest":2},{"kg":15,"reps":"14","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":8,"reps":"15","rest":2},{"kg":8,"reps":"8","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":8,"reps":"20","rest":2},{"kg":10,"reps":"8","rest":3}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":8,"reps":"15","rest":2},{"kg":8,"reps":"13","rest":2}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":15,"reps":"20","rest":2},{"kg":15,"reps":"18","rest":null}]}]},
{"id":"seed-r2-2","routineId":"r2","routineName":"Back-Biceps","day":2,"date":"2026-09-06","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":50,"reps":"11","rest":2},{"kg":50,"reps":"10","rest":2},{"kg":45,"reps":"12","rest":3}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":35,"reps":"13","rest":2},{"kg":35,"reps":"10","rest":2},{"kg":30,"reps":"12","rest":3}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":20,"reps":"8","rest":2},{"kg":15,"reps":"9","rest":2},{"kg":15,"reps":"7","rest":3}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":8,"reps":"4-6","rest":2},{"kg":6,"reps":"8-12","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":6,"reps":"8","rest":2},{"kg":6,"reps":"7","rest":2},{"kg":5,"reps":"8","rest":null}]}]},
{"id":"seed-r3-4","routineId":"r3","routineName":"Legs-Abs","day":4,"date":"2026-09-10","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":55,"reps":"21","rest":2},{"kg":62.5,"reps":"17","rest":2},{"kg":70,"reps":"10","rest":3}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":null,"reps":"14","rest":2},{"kg":null,"reps":"13","rest":2},{"kg":null,"reps":"12","rest":3}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":30,"reps":"12","rest":1.5},{"kg":30,"reps":"12","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":60,"reps":"30","rest":2},{"kg":80,"reps":"20","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":27.5,"reps":"12","rest":2},{"kg":27.5,"reps":"12","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":27.5,"reps":"12","rest":2},{"kg":27.5,"reps":"10","rest":null}]}]},
{"id":"seed-r4-4","routineId":"r4","routineName":"Arms","day":4,"date":"2026-09-10","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"8-8","rest":2},{"kg":10,"reps":"10-10","rest":2},{"kg":10,"reps":"7-8","rest":3}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":20,"reps":"13","rest":2},{"kg":20,"reps":"10","rest":2},{"kg":20,"reps":"9","rest":3}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":8,"reps":"9-9","rest":2},{"kg":8,"reps":"6-8","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":5,"reps":"14","rest":2},{"kg":5,"reps":"14","rest":2},{"kg":5,"reps":"12","rest":3}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":10,"reps":"13","rest":2},{"kg":10,"reps":"12","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":10,"reps":"12","rest":2},{"kg":10,"reps":"9","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":10,"reps":"12","rest":2},{"kg":10,"reps":"12","rest":2}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":14.7,"reps":"18","rest":null}]}]},
{"id":"seed-r1-5","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":5,"date":"2026-09-12","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":10,"reps":"15","rest":2},{"kg":10,"reps":"19","rest":2},{"kg":10,"reps":"12","rest":3}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":20,"reps":"13","rest":2},{"kg":20,"reps":"8","rest":3}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"9-9","rest":2},{"kg":10,"reps":"13-13","rest":2},{"kg":10,"reps":"7-8","rest":3}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":25,"reps":"9","rest":2},{"kg":25,"reps":"8","rest":2},{"kg":20,"reps":"10","rest":3}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"10","rest":2},{"kg":12,"reps":"5 / 10kg x 3","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":10,"reps":"14","rest":2},{"kg":10,"reps":"12","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"12-12","rest":2},{"kg":12,"reps":"10-10","rest":2}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":18.1,"reps":"18","rest":2},{"kg":18.1,"reps":"18","rest":2}]}]},
{"id":"seed-r2-6","routineId":"r2","routineName":"Back-Biceps","day":6,"date":"2026-09-14","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":50,"reps":"16","rest":2},{"kg":50,"reps":"9","rest":2},{"kg":50,"reps":"8","rest":2}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":40,"reps":"11","rest":2},{"kg":40,"reps":"12","rest":2},{"kg":40,"reps":"8","rest":2}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":20,"reps":"12","rest":2},{"kg":20,"reps":"11","rest":2},{"kg":20,"reps":"11","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":8,"reps":"8-11","rest":2},{"kg":8,"reps":"5-6","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":6,"reps":"11","rest":2},{"kg":6,"reps":"10","rest":2},{"kg":6,"reps":"8","rest":null}]}]},
{"id":"seed-r3-7","routineId":"r3","routineName":"Legs-Abs","day":7,"date":"2026-09-16","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":70,"reps":"21","rest":2},{"kg":70,"reps":"15","rest":2},{"kg":70,"reps":"11","rest":2}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":null,"reps":"21","rest":2},{"kg":null,"reps":"15","rest":2},{"kg":null,"reps":"13","rest":2}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":60,"reps":"9","rest":2},{"kg":60,"reps":"10","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":60,"reps":"12","rest":2},{"kg":60,"reps":"13","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":31.8,"reps":"15","rest":2},{"kg":31.8,"reps":"12","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":31.8,"reps":"15","rest":2},{"kg":31.8,"reps":"12","rest":null}]}]},
{"id":"seed-r4-8","routineId":"r4","routineName":"Arms","day":8,"date":"2026-09-17","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"9-10","rest":2},{"kg":10,"reps":"13-13","rest":2},{"kg":10,"reps":"9-9","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":25,"reps":"9","rest":2},{"kg":25,"reps":"8","rest":2},{"kg":20,"reps":"13","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":8,"reps":"16-16","rest":2},{"kg":8,"reps":"10-11","rest":2},{"kg":8,"reps":"6-7","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":6,"reps":"14","rest":2},{"kg":6,"reps":"13","rest":2},{"kg":6,"reps":"12","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"18","rest":2},{"kg":12,"reps":"12","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":12,"reps":"12","rest":2},{"kg":12,"reps":"12","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"12-12","rest":2},{"kg":12,"reps":"12-12","rest":2}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":21.5,"reps":"14","rest":2},{"kg":21.5,"reps":"12","rest":null}]}]},
{"id":"seed-r1-9","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":9,"date":"2026-09-19","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":12,"reps":"17","rest":2},{"kg":12,"reps":"15","rest":2},{"kg":14,"reps":"11","rest":2}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":25,"reps":"8","rest":2},{"kg":25,"reps":"8","rest":2}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"10-11","rest":2},{"kg":15,"reps":"5-7","rest":2},{"kg":10,"reps":"10-10","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":25,"reps":"9","rest":2},{"kg":20,"reps":"11","rest":2},{"kg":20,"reps":"12","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":14,"reps":"2 / 12kg x 4","rest":2},{"kg":12,"reps":"9","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":12,"reps":"15","rest":2},{"kg":12,"reps":"12","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"15-15","rest":2},{"kg":12,"reps":"12-12","rest":2}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":21.5,"reps":"16","rest":2},{"kg":24.9,"reps":"12","rest":null}]}]},
{"id":"seed-r2-10","routineId":"r2","routineName":"Back-Biceps","day":10,"date":"2026-09-21","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":50,"reps":"16","rest":2},{"kg":55,"reps":"8","rest":2},{"kg":50,"reps":"8","rest":2}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":40,"reps":"14","rest":2},{"kg":40,"reps":"12","rest":2},{"kg":40,"reps":"10","rest":2}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":20,"reps":"12","rest":2},{"kg":20,"reps":"12","rest":2},{"kg":20,"reps":"12","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":8,"reps":"12-12","rest":2},{"kg":8,"reps":"8-10","rest":2},{"kg":8,"reps":"4-4","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":7,"reps":"10","rest":2},{"kg":7,"reps":"8","rest":2},{"kg":7,"reps":"8","rest":null}]}]},
{"id":"seed-r3-11","routineId":"r3","routineName":"Legs-Abs","day":11,"date":"2026-09-23","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":77.5,"reps":"19","rest":2},{"kg":77.5,"reps":"15","rest":2},{"kg":77.5,"reps":"8","rest":2}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"16","rest":2},{"kg":8,"reps":"16","rest":2},{"kg":8,"reps":"13","rest":2}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":70,"reps":"8","rest":2},{"kg":70,"reps":"7","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":70,"reps":"12","rest":2},{"kg":60,"reps":"12","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":31.8,"reps":"23","rest":2},{"kg":36.4,"reps":"8","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":31.8,"reps":"15","rest":2},{"kg":36.5,"reps":"11","rest":null}]}]},
{"id":"seed-r4-12","routineId":"r4","routineName":"Arms","day":12,"date":"2026-09-25","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"11-12","rest":1.5},{"kg":15,"reps":"9-8","rest":1.5},{"kg":10,"reps":"12-12","rest":1.5}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":25,"reps":"10","rest":1.5},{"kg":25,"reps":"10","rest":1.5},{"kg":20,"reps":"14","rest":1.5}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":15,"reps":"17","rest":1.5},{"kg":15,"reps":"13","rest":1.5},{"kg":15,"reps":"8","rest":1.5}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":7,"reps":"11","rest":1.5},{"kg":7,"reps":"10","rest":1.5},{"kg":7,"reps":"12","rest":1.5}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"13","rest":1.5},{"kg":12,"reps":"14","rest":1.5}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":12,"reps":"16","rest":1.5},{"kg":12,"reps":"15","rest":1.5}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"16-16","rest":1.5},{"kg":12,"reps":"13-11","rest":1.5}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":24.9,"reps":"12","rest":1.5},{"kg":24.9,"reps":"10","rest":null}]}]},
{"id":"seed-r1-13","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":13,"date":"2026-09-27","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":14,"reps":"18","rest":2},{"kg":14,"reps":"14","rest":2},{"kg":14,"reps":"12","rest":2}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":25,"reps":"11","rest":2},{"kg":15,"reps":"8","rest":2},{"kg":15,"reps":"9","rest":2}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"10-12","rest":2},{"kg":15,"reps":"6-6","rest":2},{"kg":10,"reps":"12-12","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":20,"reps":"24","rest":2},{"kg":25,"reps":"12","rest":2},{"kg":25,"reps":"10","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"13","rest":2},{"kg":12,"reps":"10","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":12,"reps":"17","rest":2},{"kg":12,"reps":"12","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"16-16","rest":2},{"kg":12,"reps":"11-12","rest":2}]},{"name":"Standing Rope Facepull","group":"Shoulders","sets":[{"kg":14.7,"reps":"14","rest":2},{"kg":18.1,"reps":"12","rest":null}]}]},
{"id":"seed-r2-14","routineId":"r2","routineName":"Back-Biceps","day":14,"date":"2026-09-29","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":55,"reps":"16","rest":2},{"kg":55,"reps":"9","rest":2},{"kg":55,"reps":"8","rest":2}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":45,"reps":"11","rest":2},{"kg":45,"reps":"10","rest":2},{"kg":45,"reps":"8","rest":2}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":25,"reps":"11","rest":2},{"kg":25,"reps":"10","rest":2},{"kg":25,"reps":"8","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"7","rest":2},{"kg":15,"reps":"9","rest":2},{"kg":15,"reps":"9","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":7,"reps":"11","rest":2},{"kg":7,"reps":"12","rest":2},{"kg":7,"reps":"11","rest":2}]}]},
{"id":"seed-r3-15","routineId":"r3","routineName":"Legs-Abs","day":15,"date":"2026-10-01","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":85,"reps":"15","rest":2},{"kg":85,"reps":"13","rest":2},{"kg":85,"reps":"8","rest":2}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"18","rest":2},{"kg":8,"reps":"14","rest":2},{"kg":8,"reps":"8","rest":2}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":70,"reps":"8","rest":2},{"kg":70,"reps":"8","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":50,"reps":"14","rest":2},{"kg":55,"reps":"11","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":36.4,"reps":"8","rest":2},{"kg":36.4,"reps":"11","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":36.4,"reps":"15","rest":2},{"kg":36.4,"reps":"10","rest":null}]}]},
{"id":"seed-r4-16","routineId":"r4","routineName":"Arms","day":16,"date":"2026-10-02","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"11-12","rest":2},{"kg":15,"reps":"10-11","rest":2},{"kg":10,"reps":"12-12","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":25,"reps":"16","rest":2},{"kg":25,"reps":"13","rest":2},{"kg":25,"reps":"14","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"12","rest":2},{"kg":20,"reps":"8","rest":2},{"kg":15,"reps":"11","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":7,"reps":"11","rest":2},{"kg":7,"reps":"11","rest":2},{"kg":7,"reps":"11","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"13","rest":2},{"kg":12,"reps":"12","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":12,"reps":"13","rest":2},{"kg":12,"reps":"11","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"12-13","rest":2},{"kg":12,"reps":"10-11","rest":2}]},{"name":"Seated Rope Facepull","group":"Shoulders","sets":[{"kg":18.1,"reps":"15","rest":2},{"kg":18.1,"reps":"15","rest":null}]}]},
{"id":"seed-r1-17","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":17,"date":"2026-10-04","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":14,"reps":"15","rest":2},{"kg":16,"reps":"12","rest":2},{"kg":16,"reps":"10","rest":2}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":15,"reps":"11","rest":2},{"kg":15,"reps":"10","rest":2},{"kg":15,"reps":"8","rest":2}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"12-13","rest":2},{"kg":15,"reps":"6-8","rest":2},{"kg":10,"reps":"12-12","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":30,"reps":"10","rest":2},{"kg":30,"reps":"10","rest":2},{"kg":30,"reps":"12","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"14","rest":2},{"kg":12,"reps":"10","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":60,"reps":"13","rest":2},{"kg":60,"reps":"11","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"12-13","rest":2},{"kg":12,"reps":"13-14","rest":2}]},{"name":"Standing Lifts","group":"Shoulders","sets":[{"kg":20,"reps":"17","rest":2},{"kg":30,"reps":"17","rest":null}]}]},
{"id":"seed-r2-18","routineId":"r2","routineName":"Back-Biceps","day":18,"date":"2026-10-06","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":60,"reps":"12","rest":2},{"kg":60,"reps":"8","rest":2},{"kg":55,"reps":"10","rest":2}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":45,"reps":"12","rest":2},{"kg":45,"reps":"12","rest":2},{"kg":45,"reps":"10","rest":2}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":25,"reps":"11","rest":2},{"kg":25,"reps":"10","rest":2},{"kg":25,"reps":"9","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"9","rest":1.45},{"kg":15,"reps":"11","rest":1.45},{"kg":15,"reps":"8","rest":1.45}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":7,"reps":"9","rest":1.45},{"kg":7,"reps":"12","rest":1.45},{"kg":7,"reps":"11","rest":null}]}]},
{"id":"seed-r3-19","routineId":"r3","routineName":"Legs-Abs","day":19,"date":"2026-10-08","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":92.5,"reps":"13","rest":2},{"kg":92.5,"reps":"10","rest":2},{"kg":92.5,"reps":"8","rest":2}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"19","rest":2},{"kg":8,"reps":"15","rest":2},{"kg":8,"reps":"12","rest":2}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":70,"reps":"9","rest":2},{"kg":70,"reps":"10","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":55,"reps":"12","rest":2},{"kg":60,"reps":"9","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":36.4,"reps":"15","rest":2},{"kg":40.9,"reps":"12","rest":2}]}]},
{"id":"seed-r4-20","routineId":"r4","routineName":"Arms","day":20,"date":"2026-10-09","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":20,"reps":"6 R | 15kg x 10 L","rest":2},{"kg":15,"reps":"12 R | 15kg x 8 L","rest":2},{"kg":15,"reps":"10 R | 15kg x 5 L","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":30,"reps":"16","rest":2},{"kg":35,"reps":"12","rest":2},{"kg":35,"reps":"14","rest":2}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"15","rest":2},{"kg":20,"reps":"11","rest":2},{"kg":20,"reps":"10","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":7,"reps":"16","rest":2},{"kg":8,"reps":"11","rest":2},{"kg":8,"reps":"11","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":12,"reps":"20","rest":2},{"kg":14,"reps":"10","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":12,"reps":"17","rest":2},{"kg":14,"reps":"12","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":12,"reps":"13-13","rest":2},{"kg":12,"reps":"14-15","rest":2}]},{"name":"Standing Lifts","group":"Shoulders","sets":[{"kg":30,"reps":"20","rest":2},{"kg":35,"reps":"20","rest":null}]}]},
{"id":"seed-r1-21","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":21,"date":"2026-10-12","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":16,"reps":"16","rest":2},{"kg":18,"reps":"11","rest":2},{"kg":18,"reps":"7","rest":2}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":15,"reps":"15","rest":2},{"kg":20,"reps":"7","rest":2},{"kg":15,"reps":"9","rest":2}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"12-14","rest":2},{"kg":15,"reps":"7-9","rest":2},{"kg":10,"reps":"15","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":40,"reps":"10","rest":2},{"kg":40,"reps":"8","rest":2},{"kg":35,"reps":"12","rest":2}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":14,"reps":"11","rest":2},{"kg":14,"reps":"8","rest":2}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":14,"reps":"12","rest":2},{"kg":14,"reps":"12","rest":2}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":14,"reps":"15-15","rest":2},{"kg":15,"reps":"11-12","rest":2}]},{"name":"Bent Over Shoulder Press","group":"Shoulders","sets":[{"kg":12.5,"reps":"10","rest":2},{"kg":12.5,"reps":"7","rest":null}]}]},
{"id":"seed-r2-22","routineId":"r2","routineName":"Back-Biceps","day":22,"date":"2026-10-14","note":"The spreadsheet had 6 Oct here (same as Day 18), so this date is estimated.","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":65,"reps":"14","rest":2},{"kg":65,"reps":"9","rest":2},{"kg":60,"reps":"9","rest":2}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":50,"reps":"14","rest":2},{"kg":50,"reps":"10","rest":1.45},{"kg":45,"reps":"12","rest":1.45}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":25,"reps":"12","rest":1.45},{"kg":25,"reps":"12","rest":1.45},{"kg":25,"reps":"11","rest":1.45}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"12","rest":1.45},{"kg":20,"reps":"8","rest":1.45},{"kg":20,"reps":"5 | 15kg x 8","rest":1.45}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":8,"reps":"11","rest":1.45},{"kg":8,"reps":"12","rest":1.45},{"kg":8,"reps":"12","rest":1.45}]}]},
{"id":"seed-r3-23","routineId":"r3","routineName":"Legs-Abs","day":23,"date":"2026-10-15","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":100,"reps":"10","rest":2},{"kg":100,"reps":"10","rest":2},{"kg":100,"reps":"5","rest":2}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"20","rest":2},{"kg":8,"reps":"20","rest":2},{"kg":8,"reps":"14","rest":2}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":70,"reps":"12","rest":2},{"kg":75,"reps":"12","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":60,"reps":"12","rest":2},{"kg":60,"reps":"12","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":40.9,"reps":"12","rest":2},{"kg":40.9,"reps":"9","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":40.9,"reps":"12","rest":2},{"kg":40.9,"reps":"10","rest":null}]}]},
{"id":"seed-r1-25","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":25,"date":"2026-10-21","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":30,"reps":"8","rest":1.5},{"kg":25,"reps":"8","rest":1.5},{"kg":20,"reps":"7","rest":2}]},{"name":"Cable Flys","group":"Chest","sets":[{"kg":20,"reps":"10","rest":1.5},{"kg":20,"reps":"7","rest":1.5},{"kg":15,"reps":"9","rest":1.5}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"10-8","rest":2},{"kg":10,"reps":"16-14","rest":1.5},{"kg":10,"reps":"10-10","rest":1.5}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":40,"reps":"16","rest":1.5},{"kg":40,"reps":"10","rest":1.5},{"kg":40,"reps":"9","rest":1.5}]},{"name":"Barbell Overheads","group":"Shoulders","sets":[{"kg":10,"reps":"8","rest":1.5},{"kg":10,"reps":"3 | 5kg x 4","rest":1.5}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":14,"reps":"13","rest":1.5},{"kg":14,"reps":"8","rest":1.5}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":14,"reps":"12-15","rest":1.5},{"kg":14,"reps":"12-12","rest":1.5}]},{"name":"Bent Over Shoulder Press","group":"Shoulders","sets":[{"kg":12.5,"reps":"12","rest":1.5},{"kg":12.5,"reps":"13","rest":null}]}]},
{"id":"seed-r2-26","routineId":"r2","routineName":"Back-Biceps","day":26,"date":"2026-10-23","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":70,"reps":"12","rest":1.5},{"kg":70,"reps":"8","rest":1.5},{"kg":65,"reps":"8","rest":2}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":57.5,"reps":"13","rest":1.5},{"kg":57.5,"reps":"12","rest":1.5},{"kg":57.5,"reps":"10","rest":1.5}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":27.5,"reps":"10","rest":1.5},{"kg":27.5,"reps":"11","rest":1.5},{"kg":27.5,"reps":"10","rest":1.5}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"14","rest":1.5},{"kg":20,"reps":"8","rest":1.5},{"kg":20,"reps":"8","rest":1.5}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":9,"reps":"12","rest":1.5},{"kg":9,"reps":"12","rest":1.5},{"kg":9,"reps":"12","rest":1.5}]}]},
{"id":"seed-r3-27","routineId":"r3","routineName":"Legs-Abs","day":27,"date":"2026-10-25","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":45.4,"reps":"18","rest":1.5},{"kg":45.4,"reps":"10","rest":1.5},{"kg":45.4,"reps":"8","rest":1.5}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"23","rest":1.5},{"kg":8,"reps":"20","rest":1.5},{"kg":8,"reps":"14","rest":4}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":75,"reps":"12","rest":2},{"kg":80,"reps":"8","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":65,"reps":"12","rest":2},{"kg":65,"reps":"12","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":40.9,"reps":"14","rest":2},{"kg":40.9,"reps":"11","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":40.9,"reps":"13","rest":2},{"kg":40.9,"reps":"10","rest":null}]}]},
{"id":"seed-r4-28","routineId":"r4","routineName":"Arms","day":28,"date":"2026-10-25","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"16 R | x 12","rest":1.5},{"kg":15,"reps":"12 R | x 10","rest":1.5},{"kg":15,"reps":"8 R | x 7","rest":1.5}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":40,"reps":"14","rest":1.5},{"kg":40,"reps":"14","rest":1.5},{"kg":45,"reps":"10","rest":1.5}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"22","rest":1.5},{"kg":25,"reps":"8","rest":1.5},{"kg":20,"reps":"12","rest":1.5}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":9,"reps":"14","rest":1.5},{"kg":9,"reps":"15","rest":1.5},{"kg":9,"reps":"11","rest":1.5}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":14,"reps":"20","rest":1.5},{"kg":16,"reps":"10","rest":1.5}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":14,"reps":"16","rest":1.5},{"kg":14,"reps":"12","rest":1.5}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":14,"reps":"15|15","rest":1.5},{"kg":14,"reps":"12|10","rest":1.5}]},{"name":"Bent Over Shoulder Press","group":"Shoulders","sets":[{"kg":12.5,"reps":"17","rest":1.5},{"kg":12.5,"reps":"12","rest":null}]}]},
{"id":"seed-r1-29","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":29,"date":"2026-10-29","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":30,"reps":"16","rest":1.5},{"kg":40,"reps":"10","rest":1.5},{"kg":40,"reps":"5 | 30kg x 5","rest":1.5}]},{"name":"Cable Flys","group":"Chest","sets":[{"kg":20,"reps":"10","rest":1.5},{"kg":20,"reps":"9","rest":1.5},{"kg":15,"reps":"10","rest":1.5}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"14 | 12","rest":1.5},{"kg":15,"reps":"8 | 7","rest":1.5},{"kg":10,"reps":"12 | 12","rest":1.5}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":40,"reps":"14","rest":1.5},{"kg":40,"reps":"12","rest":1.5},{"kg":40,"reps":"14","rest":1.5}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":15,"reps":"6 | 25kg x 6","rest":1.5},{"kg":20,"reps":"8","rest":1.5}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":14,"reps":"18","rest":1.5},{"kg":14,"reps":"11","rest":1.5}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":14,"reps":"15-15","rest":2},{"kg":14,"reps":"18-15","rest":1.5}]},{"name":"Bent Over Shoulder Press","group":"Shoulders","sets":[{"kg":12.5,"reps":"15","rest":1.5},{"kg":15,"reps":"12","rest":null}]}]},
{"id":"seed-r2-30","routineId":"r2","routineName":"Back-Biceps","day":30,"date":"2026-10-31","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":70,"reps":"13","rest":1.5},{"kg":70,"reps":"10","rest":1.5},{"kg":70,"reps":"8","rest":1.5}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":65,"reps":"12","rest":1.5},{"kg":65,"reps":"10","rest":1.5},{"kg":57.5,"reps":"13","rest":2.5}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":27.5,"reps":"15","rest":1.5},{"kg":30,"reps":"11","rest":1.5},{"kg":30,"reps":"9","rest":2.5}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"16","rest":1.5},{"kg":20,"reps":"8","rest":1.5},{"kg":20,"reps":"9","rest":1.5}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":9,"reps":"18","rest":1.5},{"kg":9,"reps":"14","rest":1.5},{"kg":9,"reps":"12","rest":1.5}]}]},
{"id":"seed-r3-31","routineId":"r3","routineName":"Legs-Abs","day":31,"date":"2026-11-02","note":"Date was missing in the spreadsheet, so this one is estimated.","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":45.4,"reps":"20","rest":1.5},{"kg":45.4,"reps":"10","rest":2},{"kg":45.4,"reps":"6 | 42kg x 3","rest":1.5}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"25","rest":1.5},{"kg":8,"reps":"20","rest":1.5},{"kg":8,"reps":"16","rest":1.5}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":80,"reps":"10","rest":2},{"kg":80,"reps":"8","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":65,"reps":"13","rest":2},{"kg":70,"reps":"12","rest":3}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":40.9,"reps":"14","rest":2},{"kg":40.9,"reps":"13","rest":2}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":45.9,"reps":"10","rest":2},{"kg":45.9,"reps":"10","rest":null}]}]},
{"id":"seed-r4-32","routineId":"r4","routineName":"Arms","day":32,"date":"2026-11-04","note":"","exercises":[{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"15 | 11","rest":1.5},{"kg":15,"reps":"13 | 10","rest":1.5},{"kg":10,"reps":"18 | 18","rest":2}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":45,"reps":"13","rest":1.5},{"kg":45,"reps":"12","rest":1.5},{"kg":45,"reps":"14","rest":3}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"20","rest":1.5},{"kg":20,"reps":"15","rest":2},{"kg":20,"reps":"13","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":10,"reps":"15","rest":1.5},{"kg":10,"reps":"12","rest":1.5},{"kg":9,"reps":"15","rest":3}]},{"name":"Barbell Overheads","group":"Shoulders","sets":[{"kg":20,"reps":"15","rest":1.5},{"kg":25,"reps":"10","rest":3}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":14,"reps":"16","rest":1.5},{"kg":14,"reps":"14","rest":1.5}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":14,"reps":"16 | 16","rest":null},{"kg":14,"reps":"17 | 17","rest":1.5}]},{"name":"Bent Over Shoulder Press","group":"Shoulders","sets":[{"kg":15,"reps":"17","rest":1.5},{"kg":15,"reps":"14","rest":null}]}]},
{"id":"seed-r1-33","routineId":"r1","routineName":"Chest-Triceps-Shoulders","day":33,"date":"2026-11-06","note":"","exercises":[{"name":"Incline Press","group":"Chest","sets":[{"kg":40,"reps":"14","rest":1.5},{"kg":45,"reps":"5","rest":1.5},{"kg":40,"reps":"5","rest":1.5}]},{"name":"Seated Cable Flys","group":"Chest","sets":[{"kg":20,"reps":"12","rest":1.5},{"kg":15,"reps":"12","rest":1.5},{"kg":15,"reps":"12","rest":1.5}]},{"name":"Single Arm Overheads","group":"Triceps","sets":[{"kg":15,"reps":"16 | 14","rest":1.5},{"kg":15,"reps":"12 | 10","rest":1.5},{"kg":10,"reps":"18 | 13","rest":1.5}]},{"name":"Rope Push Down","group":"Triceps","sets":[{"kg":45,"reps":"12","rest":1.5},{"kg":45,"reps":"10","rest":1.5},{"kg":40,"reps":"14","rest":4}]},{"name":"DB overheads","group":"Shoulders","sets":[{"kg":14,"reps":"16","rest":1.5},{"kg":14,"reps":"8","rest":1.5}]},{"name":"Lateral Raises","group":"Shoulders","sets":[{"kg":14,"reps":"19","rest":1.5},{"kg":14,"reps":"14","rest":1.5}]},{"name":"Chest Supported DB Front Raise","group":"Shoulders","sets":[{"kg":14,"reps":"20 | 20","rest":1.5},{"kg":14,"reps":"18 | 18","rest":1.5}]},{"name":"Bent Over Shoulder Press","group":"Shoulders","sets":[{"kg":15,"reps":"18","rest":1.5},{"kg":17.5,"reps":"11","rest":null}]}]},
{"id":"seed-r2-34","routineId":"r2","routineName":"Back-Biceps","day":34,"date":"2026-11-10","note":"","exercises":[{"name":"Lat Pulldowns","group":"Back","sets":[{"kg":75,"reps":"11","rest":1.5},{"kg":75,"reps":"9","rest":1.5},{"kg":70,"reps":"8","rest":1.5}]},{"name":"V-Bar Close-grip Cable Rows","group":"Back","sets":[{"kg":65,"reps":"13","rest":1.5},{"kg":65,"reps":"11","rest":1.5},{"kg":57.5,"reps":"14","rest":1.5}]},{"name":"T-Bar Rows","group":"Back","sets":[{"kg":30,"reps":"13","rest":1.5},{"kg":30,"reps":"11","rest":1.5},{"kg":30,"reps":"11","rest":3}]},{"name":"Preacher Curls","group":"Biceps","sets":[{"kg":20,"reps":"13","rest":1.5},{"kg":20,"reps":"11","rest":1.5},{"kg":20,"reps":"10","rest":2}]},{"name":"Incline DB Curls","group":"Biceps","sets":[{"kg":10,"reps":"10","rest":2},{"kg":10,"reps":"12","rest":1.5},{"kg":10,"reps":"12","rest":null}]}]},
{"id":"seed-r3-35","routineId":"r3","routineName":"Legs-Abs","day":35,"date":"2026-11-12","note":"","exercises":[{"name":"Cable Crunches","group":"Abs","sets":[{"kg":45.4,"reps":"21","rest":2},{"kg":45.4,"reps":"10","rest":2},{"kg":42,"reps":"12","rest":3}]},{"name":"Leg Raises","group":"Abs","sets":[{"kg":8,"reps":"25","rest":2},{"kg":8,"reps":"20","rest":2},{"kg":8,"reps":"15","rest":3}]},{"name":"Romanian Deadlift","group":"Legs","sets":[{"kg":80,"reps":"12","rest":2},{"kg":80,"reps":"10","rest":2}]},{"name":"Hack Squat","group":"Legs","sets":[{"kg":70,"reps":"13","rest":2},{"kg":70,"reps":"14","rest":2}]},{"name":"Seated Leg Curls","group":"Legs","sets":[{"kg":40.9,"reps":"15","rest":1.5},{"kg":40.9,"reps":"13","rest":1.5}]},{"name":"Seated Leg Extension","group":"Legs","sets":[{"kg":40.9,"reps":"10","rest":1.5},{"kg":40.9,"reps":"10","rest":null}]}]}];
