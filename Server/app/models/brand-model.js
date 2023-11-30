module.exports = mongoose => {
    const Brand = mongoose.model(
      "brands",
      mongoose.Schema(
        {
          id: Number,
          name: String,
          logo: String,
        },
        { timestamps: true }
      )
    );
    return Brand;
}