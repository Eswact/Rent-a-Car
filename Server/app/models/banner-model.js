module.exports = mongoose => {
    const Banner = mongoose.model(
      "banners",
      mongoose.Schema(
        {
          bannerId: Number,
          src: String,
          alt: String,
          title: String,
          description: String,
        },
        { timestamps: true }
      )
    );
    return Banner;
}