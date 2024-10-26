import Car from "@/models/Car";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useState, useEffect } from "react";
import { CarCard } from "./components/CarCard";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

const client = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [modal, setModal] = useState({
    isCreate: false,
    isShow: false,
    car: new Car(0, "", ""),
  });

  function handleModalSave() {
    if (modal.isCreate) {
      addCar(modal.car);
    } else {
      editCar(modal.car);
    }
    handleModalClose();
  }

  function handleModalClose() {
    setModal({ ...modal, isShow: false });
  }

  async function queryCars() {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            cars {
              id
              mark
              model
            }
          }
        `,
      });
      setCars(data.cars);
    } catch (error) {
      console.error(error);
    }
  }

  async function addCar(car: Car) {
    // Добавьте мутацию для добавления нового автомобиля
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation AddCar($mark: String!, $model: String!) {
            createCar(mark: $mark, model: $model) {
              id
              mark
              model
            }
          }
        `,
        variables: {
          mark: car.mark,
          model: car.model,
        },
      });

      if (data.createCar) {
        setCars((prevCars) => [...prevCars, data.createCar]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editCar(car: Car) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation UpdateCar($id: Int!, $mark: String!, $model: String!) {
            updateCar(id: $id, mark: $mark, model: $model) {
              id
              mark
              model
            }
          }
        `,
        variables: {
          id: car.id,
          mark: car.mark,
          model: car.model,
        },
      });

      if (data.updateCar) {
        setCars((prevCars) =>
          prevCars.map((c) => (c.id === car.id ? data.updateCar : c))
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  function onAddCarClick() {
    setModal({ isCreate: true, isShow: true, car: new Car(0, "", "") });
  }

  function onEditCarClick(car: Car) {
    setModal({ isCreate: false, isShow: true, car });
  }

  async function deleteCar(id: number) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation DeleteCar($id: Int!) {
            deleteCar(id: $id)
          }
        `,
        variables: { id },
      });

      if (data.deleteCar === "OK") {
        setCars((prevCars) => prevCars.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    queryCars();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={onAddCarClick}>
        Добавить новый автомобиль
      </Button>
      <div>
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onClickDelete={deleteCar}
              onClickEdit={() => onEditCarClick(car)}
            />
          ))
        ) : (
          <p>Loading cars...</p>
        )}
      </div>

      <Modal show={modal.isShow} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>{modal.isCreate ? "Добавление" : "Изменение"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCarMark">
              <Form.Label>Марка</Form.Label>
              <Form.Control
                type="text"
                value={modal.car.mark}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    car: { ...modal.car, mark: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCarModel">
              <Form.Label>Модель</Form.Label>
              <Form.Control
                type="text"
                value={modal.car.model}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    car: { ...modal.car, model: e.target.value },
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
