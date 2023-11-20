module.exports = mongoose => {
    const Car = mongoose.model(
      "cars",
      mongoose.Schema(
        {
          carId: Number,
          title: String,
          brand: String,
          model: {
            name: String,
            year: Number
          },
          image: String
        },
        { timestamps: true }
      )
    );
    return Car;
}