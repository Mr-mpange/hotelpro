import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Payment = sequelize.define("Payment", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'TZS',
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'zenopay',
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paymentUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
