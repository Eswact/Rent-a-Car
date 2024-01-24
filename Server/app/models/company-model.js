module.exports = mongoose => {
    const Company = mongoose.model(
      "companies",
      mongoose.Schema(
        {
            name: String,
            contact: {
                tel: String,
                fax: String,
                mail: String,
                address: String,
                img: String,
                link: String
            },
            about: {
                header: String,
                description: String,
                vision: String,
                mission: String,
                img: String
            }
        },
        { timestamps: true }
      )
    );
    return Company;
}