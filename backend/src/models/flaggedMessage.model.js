import mongoose from 'mongoose';

const flaggedMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageText: { type: String, required: true },
  toxicityScores: {
    toxicity: Number,
    severe_toxicity: Number,
    obscene: Number,
    threat: Number,
    insult: Number,
    identity_hate: Number,
  },
  flaggedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'reviewed', 'action_taken'], default: 'pending' },
}, { timestamps: true });

const FlaggedMessage = mongoose.model('FlaggedMessage', flaggedMessageSchema);
export default FlaggedMessage;
