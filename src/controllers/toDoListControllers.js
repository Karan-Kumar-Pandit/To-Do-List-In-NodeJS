const Task = require('../models/toDoListModel');

//  Rout Handlers
// --------------------------------------------
exports.getAllToDoList = async (req, res) => {
     try {
          // console.log(req.user);
          const task = await Task.find(req.query);
          res.status(200).json({
               status: 'success',
               results: task.length,
               data: {
                    task
               }
          });
     } catch (err) {
          // console.error(err);
          res.status(404).json({
               status: 'fail',
               massage: err
          });
     }
};

// -----------------------------------------
exports.getToDoList = async (req, res) => {
     try {
          const task = await Task.findById(req.params.id);

          res.status(200).json({
               status: 'success',
               results: task ? 1 : 0,
               data: {
                    task
               }
          });
     } catch (err) {
          // console.error(err);
          res.status(404).json({
               status: 'fail',
               massage: err
          });
     }
};

// ---------------------------------------------------
exports.createToDoList = async (req, res) => {
     try {
          const newTask = await Task.create(req.body);

          res.status(201).json({
               status: 'success',
               data: {
                    task: newTask
               }
          });
     } catch (err) {
          res.status(400).json({
               status: 'fail',
               massage: err
          });
     }
};
// -----------------------------------------------------
exports.updateToDoList = async (req, res) => {
     try {
          const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
               runValidators: true
          });
          res.status(201).json({
               status: 'success',
               data: {
                    task
               }
          });
     } catch (err) {
          // console.error(err);
          res.status(404).json({
               status: 'fail',
               massage: err
          });
     }
};

// ---------------------------------------------
exports.deleteToDoList = async (req, res) => {
     try {
          await Task.findByIdAndDelete(req.params.id);

          res.status(204).json({
               status: 'success',
               data: null
          });
     } catch (err) {
          res.status(404).json({
               status: 'fail',
               massage: err
          });
     }
};

// -------------------------------------------------------
