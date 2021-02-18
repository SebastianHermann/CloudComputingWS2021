const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
  },
  category: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: String,
    required: false,
  },
  creator: {
    type: String,
    required: true,
  },
  solvedOn: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('notes', NoteSchema);
