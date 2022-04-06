import mongoose from 'mongoose';

const { Schema } = mongoose;
const modelName = 'categorie'; // plural

const schema = new Schema(
  {
    categorieName: {
      type: String,
      isrequired: true
    }
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    // eslint-disable-next-line no-param-reassign,no-underscore-dangle
    delete ret._id;
  },
});

// rename name Example to singular Model
export default mongoose.models.Categorie || mongoose.model(modelName, schema);
