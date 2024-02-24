const { User, Thought } = require("../models");

// Aggregate function to get the number of thoughts overall
const thoughtCount = async () =>
  Thought.aggregate()
    .count("thoughtCount")
    .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
  // Get all thoughts
  // /api/thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          thoughtCount: await thoughtCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  // /api/thoughts/:thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  // /api/thoughts/:userId
  createThought(req, res) {
    const { userId } = req.params;
    const { thoughtText } = req.body;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const { username } = user;
        return Thought.create({ thoughtText, username })
          .then((newThought) => {
            return User.findByIdAndUpdate(
              userId,
              { $push: { thoughts: newThought._id } },
              { new: true }
            )
              .then((updatedUser) => {
                res
                  .status(201)
                  .json({
                    message: "Thought created and assigned to user",
                    thought: newThought,
                    user: updatedUser,
                  });
              })
              .catch((userErr) => {
                res
                  .status(500)
                  .json({
                    message: "Error assigning thought to user",
                    error: userErr.message,
                  });
              });
          })
          .catch((thoughtErr) => {
            res
              .status(500)
              .json({
                message: "Error creating thought",
                error: thoughtErr.message,
              });
          });
      })
      .catch((userErr) => {
        res
          .status(500)
          .json({ message: "Error fetching user", error: userErr.message });
      });
  },
  // Update a thought
  // /api/users/:thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the user
  // /api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted, but no user found",
            })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to a thought
  // /api/thoughts/:thoughtId/reactions
  addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  // /api/thoughts/:thoughtId/assignments/:assignmentId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
