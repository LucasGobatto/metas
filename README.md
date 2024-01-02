## Daily Goals

### Rules

1. The user should be able to define all the tasks to be done daily, like a to do list, but the same tasks will be dislayed day by day.
2. If the user inputs a new goal, the inputed item will be showed in the current day and the following days.
3. Everyday, the user could "check" if some item is completed in the list.
4. At the start of the new day, all the items will be unchecked, but the completed items from the day before will be saved in the local storage.
5. The user should be able to see a kind of summary, where it will be displayed how much tasks was done until that moment and how much he should be done. For exemple:

   - 1/4 days - Drink 3 L of water
   - 4/4 days - Walk 1 km
   - 3/3 days - Sleep at 9 pm

6. User should be able to delete or disable a task. If some task is delete/disable at some point, the following days will not display the item. The summary will display these items with different style to indicate the unactivity.
7. The data in the local storage should be save with the following model:

   ```json
   {
     "tasks": [
       {
         "id": 1,
         "name": "drink 1 L of water",
         "deletedAt": null,
         "insertedAt": "2023-01-01T00.00.000Z",
         "completedAt": ["2023-01-01T10.00.000Z"]
       },
       {
         "id": 2,
         "name": "Walk 1 km",
         "deletedAt": null,
         "insertedAt": "2023-01-01T00.00.000Z",
         "completedAt": [
           "2023-01-01T10.00.000Z",
           "2023-01-02T12.00.000Z",
           "2023-01-03T12.00.000Z",
           "2023-01-04T12.00.000Z"
         ]
       },
       {
         "id": 3,
         "name": "Sleep at 9 pm",
         "deletedAt": null,
         "insertedAt": "2023-01-02T00.00.000Z",
         "completedAt": ["2023-01-02T12.00.000Z", "2023-01-03T12.00.000Z", "2023-01-04T12.00.000Z"]
       },
       {
         "id": 4,
         "name": "Eat 1 banana each day",
         "deletedAt": "2023-01-04T00.00.000Z",
         "insertedAt": "2023-01-03T00.00.000Z",
         "completedAt": ["2023-01-03T12.00.000Z"]
       }
     ]
   }
   ```
