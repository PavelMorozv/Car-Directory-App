import Car from "@/models/Car";
import { Button, Card } from "react-bootstrap";

interface CarCardProps {
    car: Car;
    onClickDelete: (id: number) => void;
    onClickEdit: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClickEdit, onClickDelete }) => {

    const handleEditClick = () => {
        if (onClickEdit) {
            onClickEdit(car)
        }
    };

    const handleDeleteClick = () => {
        if (onClickDelete)
            onClickDelete(car.id);
    };

    return (
        <Card style={{ width: 300 }}>
            <Card.Body>
                <Card.Title>{car.mark}</Card.Title>
                <Card.Subtitle>{car.model}</Card.Subtitle>
                <div>
                    <Button variant="warning" size="sm" onClick={handleEditClick}>
                        Изменить
                    </Button>
                    
                    <Button variant="danger" size="sm" onClick={handleDeleteClick}>
                        Удалить
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
