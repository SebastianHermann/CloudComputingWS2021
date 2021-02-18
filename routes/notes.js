const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

//GET BACK ALL NOTES
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

//GET BACK ALL NOTES OF A SPECIFIC USER
router.post('/user', async (req, res) => {
  try {
    const notes = await Note.find({ creator: req.body.creator }).exec();
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

//SUBMITS A NOTE
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    dueDate: req.body.dueDate,
    creator: req.body.creator,
  });
  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC NOTE
router.get('/:noteId', async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    res.json(note);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE NOTE
router.delete('/:noteId', async (req, res) => {
  try {
    const removedNote = await Note.remove({ _id: req.params.noteId });
    res.json(removedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A NOTE
router.patch('/:noteId', async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.noteId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          status: req.body.status,
          dueDate: req.body.dueDate,
        },
      }
    );
    res.json(updatedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
