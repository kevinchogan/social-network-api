const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  // /api/users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  // /api/users/:userId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  // /api/users
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  // /api/users/:userId
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  // /api/users/:userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add an friend to a user
  // /api/users/:userId/friends
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  // /api/users/:userId/friends/:friendId
  removeFriend(req, res) {
    console.log("User ID: ", req.params.userId);
    console.log("Friend ID: ", req.params.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      if (!user) {
        console.log('No user found with that ID');
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      console.log('User after removing friend:', user);
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Validation error removing friend:', err.message);
        return res.status(400).json({ message: err.message });
      }
      console.error('Error removing friend:', err);
      return res.status(500).json(err);
    });
  },  
};
