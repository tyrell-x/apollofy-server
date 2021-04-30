const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Playlist title is required"],
      trim: true,
    },
    description: {
      type: String
    },
    collaborative: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      type: String,
      trim: true
    },
    publicAccessible: {
      type: Boolean,
      default: false
    },
    author: {
      type: String,
      ref: "user",
    },
    tracks: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "track",
        },
      ],
      default: [],
    },
    followedBy: {
      type: [
        {
          type: String,
          ref: "user",
        },
      ],
      default: [],
    },
    collaborators: {
      type: [
        {
          type: String,
          ref: "user",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Playlist = mongoose.model("playlist", PlaylistSchema);

module.exports = Playlist;
