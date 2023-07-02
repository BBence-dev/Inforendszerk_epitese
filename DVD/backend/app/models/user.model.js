module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nev: String,
      telsz: String,
      igsz: String,
      lakcim: String,
      condition: Boolean,
      dvd:{
        type: mongoose.Schema.Types.String,
        ref: "Dvd"
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
