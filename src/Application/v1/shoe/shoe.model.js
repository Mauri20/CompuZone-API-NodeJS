import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('shoes');

const schema = new Schema(
  {
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'models',
    },
    style: {
      type: Schema.Types.ObjectId,
      ref: 'styles',
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

// rename name Example to singular Model
// eslint-disable-next-line operator-linebreak
export default mongoose.models[singularName] ||
  mongoose.model(pluralName, schema);
