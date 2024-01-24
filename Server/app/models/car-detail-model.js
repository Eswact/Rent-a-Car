module.exports = mongoose => {
    const CarDetail = mongoose.model(
      "car-details",
      mongoose.Schema(
        {
          carId: Number,
          images: Array,
          title: String,
          brand: Number,
          category: Number,
          model: {
            name: String,
            year: Number
          },
          description: String,
          people: Number,
          capacity: Number,
          gasoline: Number,
          kilometer: Number,
          age: Number,
          payment: Number,
          dailyPrice: Number
        },
        { timestamps: true }
      )
    );
    return CarDetail;
}