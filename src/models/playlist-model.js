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
      type: String,
      required: false,
    },
    collaborative: {
      type: Boolean,
      required: false,
      default: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    publicAccessible: {
      type: Boolean,
      required: false,
      default: false,
    },
    total_tracks: {
      type: Number,
      default: 0,
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
