module.exports = mongoose => {
    const Car = mongoose.model(
      "cars",
      mongoose.Schema(
        {
          // _id: String,
          brand: String
        },
        { timestamps: true }
      )
    );
  
    return Car;
}