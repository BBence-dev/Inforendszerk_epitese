module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        cim: String,
        beDatum: Date,
        sorszam: String,
        condition: {
          type: String,
          enum: ["szabad", "kikolcsönzött", "selejtezett"]
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Dvd = mongoose.model("dvd", schema);
    return Dvd;
  };
  