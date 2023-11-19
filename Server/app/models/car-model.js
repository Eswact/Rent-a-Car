module.exports = mongoose => {
    const Car = mongoose.model(
      "cars",
      mongoose.Schema(
        {
          carId: Number,
          brand: String,
          model: {
            name: String,
            year: Number
          }
        },
        { timestamps: true }
      )
    );
    return Car;
}