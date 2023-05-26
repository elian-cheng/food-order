const addMethods = schema => {
  schema.method("toResponse", function () {
    const { _id, ...rest } = this.toJSON();
    delete rest.password;
    delete rest.__v;
    delete rest.userId;
    return { id: _id, ...rest };
  });
};

module.exports = { addMethods };

