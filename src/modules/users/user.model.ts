import { model, Schema, Model, Document } from 'mongoose';


export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  address: string;
  gender: string;
  role: number;
}

const UserSchema: Schema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    sparse: true,
    unique: true,
  },
  address: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: Number,
    default: 2,
  },
});

const UserModel: Model<IUser> = model('user', UserSchema);

export default UserModel;
