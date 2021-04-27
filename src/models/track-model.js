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
      required: [true, "Url of the song required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    year: {
      type: Number,
    },
    color: {
      type: String,
      trim: true,
    },
    genreIds: {
      type: [
        {
          type: String,
          ref: "genres",
        },
      ],
      default: [],
    },
    ownedBy: {
      type: String,
      ref: "user",
    },
    bytes: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    bitRate: {
      type: Number,
    },
    isStereo: {
      type: Boolean,
    },
    likedBy: {
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

const Track = mongoose.model("track", TrackSchema);

module.exports = Track;
