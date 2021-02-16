/** @format */

import { Schema, model, Document, Model } from 'mongoose';
import { Password } from './../services/password';
// An interface that describes properties that a model needs

interface Attrs {
  email: string;
  password: string;
}

// An interface that describes that a user model has

interface UserModel extends Model<UserDoc> {
  build(attrs: Attrs): UserDoc;
}

// An interface describes properties a document has
interface UserDoc extends Document {
  email: string;
  password: string;
  created_at?: Date;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

// MIDDLEWARE
// pre-save
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  next();
});

userSchema.statics.build = (attrs: Attrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };
