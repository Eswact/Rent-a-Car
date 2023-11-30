module.exports = mongoose => {
    const Car = mongoose.model(
      "cars",
      mongoose.Schema(
        {
          carId: Number,
          title: String,
          brand: Number,
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