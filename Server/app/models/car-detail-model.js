module.exports = mongoose => {
    const CarDetail = mongoose.model(
      "car-details",
      mongoose.Schema(
        {
          carId: Number,
          title: String,
        },
        { timestamps: true }
      )
    );
    return CarDetail;
}