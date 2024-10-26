import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    carById(id: Int!): Car  # Обязательно указываем, что id не может быть null
    cars: [Car!]             # cars возвращает список Car, где каждый элемент не может быть null
  }

  type Car {
    id: Int!
    mark: String!
    model: String!
  }
  
  type Mutation {
    createCar(mark: String!, model: String!): Car   # Возвращаем ID нового автомобиля
    updateCar(id: Int!, mark: String!, model: String!): Car # Возвращаем ID обновленного автомобиля
    deleteCar(id: Int!): String                     # Удаление автомобиля
  } 
`;

export default typeDefs;
