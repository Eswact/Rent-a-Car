module.exports = mongoose => {
    const Car = mongoose.model(
      "cars",
      mongoose.Schema(
        {
          carId: Number,
          title: String,
          brand: Number,
          category: Number,
          image: String
        },
        { timestamps: true }
      )
    );
    return Car;
}