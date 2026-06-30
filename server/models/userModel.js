const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    profile: {

        bio: {
          type: String,
          default: ""
        },

        skills: [{
          type: String
        }],

          education: {
            type: String,
            default: ""
          },

          experience: {
            type: String,
            default: ""
          },

        profilePhoto: {
            url: {
              type: String,
              default: ""
            },
            public_id: {
              type: String,
              default: ""
            }
        },

          resume: {
                url: {
                  type: String,
                  default: ""
                },
                public_id: {
                  type: String,
                  default: ""
                }
          }
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);