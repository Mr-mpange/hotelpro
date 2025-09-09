import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Room extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public price!: number;
  public available!: boolean;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "rooms",
    timestamps: true,
  }
);
