import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";  // import your sequelize instance

// Define the attributes for TypeScript
interface BookingAttributes {
  id: number;
  userId: number;
  roomId: number;
  checkInDate: Date;
  checkOutDate: Date;
  status: string;
}

interface BookingCreationAttributes extends Omit<BookingAttributes, "id"> {}

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public userId!: number;
  public roomId!: number;
  public checkInDate!: Date;
  public checkOutDate!: Date;
  public status!: string;
}

// Initialize the model
Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "bookings",
  }
);
