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
      default:
        "https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png",
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
    genreIds: {
      type: [
        {
          type: String,
          ref: "genre",
        },
      ],
      default: [],
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
    ownedBy: {
      type: String,
      ref: "user",
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
