import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

// importamos el modulo de mongoosePaginate
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('trademarks');

const schema = new Schema(
  {
    trademarkName: {
      type: String,
      required: true,
    },
    urlImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
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
    ret.id = ret._id;
    delete ret._id;
  },
});

// agregamos el plugin de mongoosePaginate
schema.plugin(mongoosePaginate);

// rename name Example to singular Model
// eslint-disable-next-line operator-linebreak
export default mongoose.models[singularName] ||
  mongoose.model(pluralName, schema);
