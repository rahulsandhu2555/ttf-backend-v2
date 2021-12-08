const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: String,
    certificate: String,
    language: {
      original: String,
      available: [String],
    },
    other_names: [{ key: String, value: String }],
    url: String,
    genre: [{ key: String, value: String }],
    runtime: String,
    celebrity: {
      stars: {
        lead_actors: [String],
        lead_actress: [String],
        others: [String],
      },
      director: {
        main_director: String,
        others: [{ key: String, value: String }],
      },
      production: {
        producers: [String],
        production_house: [String],
      },
      crew: [
        { name: String, profile: String}
      ],
    },
    release: {
      release_date: Date,
      other_release_dates: [
        { key: String, value: String }
      ],
    },
    trailer: [
      { url: String, name: String, date: Date }
    ],
    teaser: [
        { url: String, name: String, date: Date }
    ],
    poster: [
      { url: String, date: Date }
    ],
    thumbnail: {
      favicon: { png: String, jpg: String, webp: String },
      small: { png: String, jpg: String, webp: String },
      medium: { png: String, jpg: String, webp: String },
      large: { png: String, jpg: String, webp: String },
    },
    rating: [
      { imdb: Number },
      { bms: String },
      { rottenTomato: String },
      {
        critics: [
          { critic: String, comment: String, date: Date, source: String, url: String }
        ],
      },
    ],
    cost_collection: {
      budget: String,
      collection: {
        total: String,
        country_wise: [
          { key: String, value: String }
        ],
      },
    },
    reviews: {
      teaser_review: [
        { url: String, name: String, date: Date }
      ],
      trailer_review: [
          { url: String, name: String, date: Date }
      ],
      movie_review: [
          { url: String, name: String, date: Date }
      ],
      promotion: [
          { url: String, name: String, date: Date }
      ],
      discussion: [
          { url: String, name: String, date: Date }
      ],
    },
    where_to_watch: [
      { key: String, value: String }
    ],
  },
  { typeKey: "$type" }
);

module.exports = mongoose.model("movies", movieSchema);
