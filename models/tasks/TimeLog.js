import mongoose from 'mongoose';

const timeLogSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true, // in minutes
  },
  startTime: Date,
  endTime: Date,
}, { timestamps: true });

export default mongoose.model('TimeLog', timeLogSchema);