const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Task = require("./taskModel");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Please enter an email"],
      trim: true,
      unique: [true, "An account already exists with this email"],
      validate: {
        validator: function(value) {
          return validator.isEmail(value);
        },

        message: "Please enter a valid email format.(name@domain)"
      }
    },

    role: {
      type: String,
      enum: {
        values: ["guide", "lead-guide", "admin", "user"],
        message: "Invalid role. Must be guide, lead-guide, admin, user"
      },
      required: [true, "User must have a role"],
      default: "user"
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      trim: true,
      minlength: [8, "Password must be at least 8 characters"]
    },

    confirmPassword: {
      type: String,
      required: [true, "Please confirm password"],
      trim: true,
      validate: {
        validator: function(value) {
          return this.password === value;
        },

        message: "Error. Passwords do not match. Try again"
      }
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiry: Date,
    active: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre(/^find/, function(next) {
  this.find({ active: true });
  next();
});

userSchema.post(/^findOneAnd/, async function(user) {
  if (!this.active) {
    await Task.deleteMany({ user: user._id });
  }
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.toJSON = function() {
  const returnedData = this.toObject();
  delete returnedData.password;

  return returnedData;
};

userSchema.methods.checkPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.checkPasswordChanged = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTime;
  }
};

userSchema.methods.createResetToken = function() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.passwordResetToken = hashedToken;
  this.passwordResetExpiry = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
