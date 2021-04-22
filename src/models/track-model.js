const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Track title required"],
      trim: true,
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false
    },
    color: {
      type: String,
      trim: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "genre",
    },
    ownedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    bytes: {
      type: Number,
      required: true
    },
    format: {
      type: String,
      required: true
    },
    bitRate: {
      type: Number,
      required: true
    },
    isStereo: {
      type: Boolean
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
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

const Track = mongoose.model("track", TrackSchema);

module.exports = Track;
