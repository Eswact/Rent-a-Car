module.exports = mongoose => {
    const Brand = mongoose.model(
      "brands",
      mongoose.Schema(
        {
          brandId: Number,
          name: String,
          logo: String,
        },
        { timestamps: true }
      )
    );
    return Brand;
}