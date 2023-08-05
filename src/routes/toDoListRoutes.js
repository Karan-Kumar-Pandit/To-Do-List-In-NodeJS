const express = require('express');
const toDoListRouter = require('../controllers/toDoListControllers');

const router = express.Router();

router.route('/todo-list').get(toDoListRouter.getAllToDoList);
router.route('/todo-list').post(toDoListRouter.createToDoList);
router.route('/todo-list/:id').get(toDoListRouter.getToDoList);
router.route('/todo-list/:id').patch(toDoListRouter.updateToDoList);
router.route('/todo-list/:id').delete(toDoListRouter.deleteToDoList);

module.exports = router;
