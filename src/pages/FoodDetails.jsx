import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";
import foodList from "../data/food.json";
import { formatId } from "../utils/format";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../store/orderSlice";
import Login from "./Login";
import Navbar from "../components/Navbar";

const FoodDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { id } = useParams();
  const food = foodList.find((p) => p.id === parseInt(id));

  const handleOrder = () => {
    dispatch(addOrder(food));
    console.log(orders);
  };

  if (!food) {
    return <h2>Food not found</h2>;
  }

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Container>
            <Row className="justify-content-center mb-4 mt-4">
              <Col md="6">
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={`/src/assets/images/${formatId(id)}.png`}
                    alt={food.name.english}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{food.name.english}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {food.type.join(", ")}
                    </CardSubtitle>
                    <CardText>
                      <strong>Calories:</strong> {food.nutritions.Calories}
                      <br />
                      <strong>Cholesterol:</strong>{" "}
                      {food.nutritions.Cholesterol}
                      <br />
                      <strong>Kali:</strong> {food.nutritions.Kali}
                      <br />
                      <strong>Natri:</strong> {food.nutritions.Natri}
                      <br />
                      <strong>Protein:</strong> {food.nutritions.Protein}
                      <br />
                      <strong>Carbohydrat:</strong>{" "}
                      {food.nutritions.Carbohydrat}
                      <br />
                      <strong>Price:</strong> {food.price}
                      <br />
                    </CardText>
                    <Button color="primary" onClick={handleOrder}>
                      Add to Order
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default FoodDetails;
