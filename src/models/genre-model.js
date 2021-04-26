const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GenreSchema = Schema(
  {
    _id: String,
    name: {
      type: String,
      required: [true, "Genre name is required"],
      trim: true,
      lowercase: true,
    },
    popularity: {
      type: Number,
    },
    trackIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "track",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Genre = mongoose.model("genre", GenreSchema);

module.exports = Genre;
