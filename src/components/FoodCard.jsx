import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import { formatId } from "../utils/format";
import { useDispatch } from "react-redux";
import { addOrder } from "../store/orderSlice";

const FoodCard = ({ food }) => {
  const { name, id } = food;
  const dispatch = useDispatch();

  const handleOrder = () => {
    dispatch(addOrder(food));
    alert("Food added to order");
  };

  return (
    <Card style={{ margin: "10px", width: "18rem" }}>
      <CardImg
        top
        width="100%"
        src={`src/assets/images/${formatId(id)}.png`}
        alt={name.english}
      />
      <CardBody>
        <CardTitle tag="h5">{name.english}</CardTitle>
        <CardText>
          <strong>Calories:</strong> {food.nutritions.Calories}
          <br />
          <strong>Cholesterol:</strong> {food.nutritions.Cholesterol}
          <br />
          <strong>Kali:</strong> {food.nutritions.Kali}
          <br />
          <strong>Natri:</strong> {food.nutritions.Natri}
          <br />
          <strong>Protein:</strong> {food.nutritions.Protein}
          <br />
          <strong>Carbohydrat:</strong> {food.nutritions.Carbohydrat}
          <br />
          <strong>Price:</strong>{" "}
          <span
            style={{ fontSize: "1.2em", fontWeight: "bold", color: "tomato" }}
          >
            ${food.price.toFixed(2)}
          </span>
          <br />
        </CardText>
        <Link to={`/foodlist/${food.id}`}>
          <Button style={{ marginRight: "1rem" }}>View Details</Button>
        </Link>
        <Button color="primary" onClick={handleOrder}>
          Add to Order
        </Button>
      </CardBody>
    </Card>
  );
};

export default FoodCard;
