// src/models/car.ts
import { DataTypes, Sequelize, Model, Optional } from "sequelize";

// Определение интерфейса для атрибутов автомобиля
export interface CarAttributes {
  id: number;
  mark: string;
  model: string;
}

// Определение интерфейса для создания автомобиля (id не нужен при создании)
export interface CarCreationAttributes extends Optional<CarAttributes, 'id'> {}

const sequelize = new Sequelize({
  database: 'dev',
  username: 'feed',
  password: 'feed',
  host: "127.0.0.1",
  port: 5432,
  dialect: 'postgres'
});

// Определение модели `Car`
export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
  public id!: number;  // Указываем, что `id` будет существовать
  public mark!: string;
  public model!: string;
}

Car.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mark: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Car'
});

// Синхронизация модели с базой данных
Car.sync();

export default Car;
