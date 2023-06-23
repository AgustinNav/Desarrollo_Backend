import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  purchase_datetime: {
    type: Date,
    required: true
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

ticketSchema.pre('findOne', function () { 
  this.populate("products.product"); 
});

ticketSchema.pre('find', function () { 
  this.populate("products.product"); 
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
