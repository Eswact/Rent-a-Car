module.exports = mongoose => {
    const Category = mongoose.model(
      "categories",
      mongoose.Schema(
        {
          catId: Number,
          name: String,
        },
        { timestamps: true }
      )
    );
    return Category;
}