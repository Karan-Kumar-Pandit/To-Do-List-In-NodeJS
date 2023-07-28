const express = require('express');
const toDoListRouter = require('../controllers/toDoListControllers');

const router = express.Router();

router
  .route('/')
  .get(toDoListRouter.getAllToDoList)
  .post(toDoListRouter.createToDoList);
router
  .route('/:id')
  .get(toDoListRouter.getToDoList)
  .patch(toDoListRouter.updateToDoList)
  .delete(toDoListRouter.deleteToDoList);

module.exports = router;
