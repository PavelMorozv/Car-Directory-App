// src/resolvers/carResolvers.ts
import Car from "../models/car";

const carResolvers = {
  Query: {
    carById: async (parent: any, args: { id: number }) => {
      return await Car.findByPk(args.id);
    },
    cars: async () => {
      return await Car.findAll();
    }
  },
  
  Mutation: {
    createCar: async (parent: any, args: { mark: string, model: string }) => {
      const newCar = await Car.create({
        mark: args.mark,
        model: args.model
      });
      return newCar;  // Возвращаем ID нового автомобиля
    },
    
    updateCar: async (parent: any, args: { id: number, mark: string, model: string }) => {
      const carToUpdate = await Car.findByPk(args.id);
      if (carToUpdate) {
        carToUpdate.mark = args.mark;
        carToUpdate.model = args.model;
        await carToUpdate.save();  // Сохраняем изменения
        return carToUpdate;  // Возвращаем ID обновленного автомобиля
      }
      return null;  // Возвращаем null, если автомобиль не найден
    },

    deleteCar: async (parent: any, args: { id: number }) => {
      const carToDelete = await Car.findByPk(args.id);
      if (carToDelete) {
        await carToDelete.destroy();
        return "OK";  // Успешно удалено
      }
      return "Item not found";  // Если автомобиль не найден
    }
  }
};

export default carResolvers;
