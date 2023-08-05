const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, 'Task description is required'],
  },
  status: {
    type: String,
    enum: ['to do', 'in progress', 'done'], // TO_DO, IN_PROGRESS, DONE
    default: 'TO_DO',
  },
  startDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date
  },
  endDate: {
    type: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Tasks = mongoose.model('Tasks', toDoListSchema);

module.exports = Tasks;
