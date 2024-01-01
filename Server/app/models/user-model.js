module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          userId: Number,
          username: String,
          password: String
        },
        { timestamps: true }
      )
    );
    return User;
}