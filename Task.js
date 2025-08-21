
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
