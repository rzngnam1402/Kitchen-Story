import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { removeOrder, resetCart } from "../store/orderSlice";
import Navbar from "../components/Navbar";
import Login from "./Login";

const OrderCart = () => {
  const orders = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showReceipt, setShowReceipt] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeOrder(id));
  };

  const handleConfirmPayment = () => {
    setShowReceipt(true);
  };

  const handleResetCart = () => {
    dispatch(resetCart());
    setShowReceipt(false);
    window.location.reload();
  };

  const calculateTotalPrice = () => {
    const itemMap = new Map();
    orders.forEach((order) => {
      const { id, name, price } = order;
      if (itemMap.has(id)) {
        const existingItem = itemMap.get(id);
        itemMap.set(id, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.totalPrice + price,
        });
      } else {
        itemMap.set(id, {
          ...order,
          quantity: 1,
          totalPrice: price,
        });
      }
    });

    let totalPrice = 0;
    itemMap.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    return { totalPrice, items: Array.from(itemMap.values()) };
  };

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Container>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Food Name</th>
                  <th>Calories</th>
                  <th>Cholesterol</th>
                  <th>Kali</th>
                  <th>Natri</th>
                  <th>Protein</th>
                  <th>Carbohydrates</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {calculateTotalPrice().items.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name.english}</td>
                    <td>{item.nutritions.Calories}</td>
                    <td>{item.nutritions.Cholesterol}</td>
                    <td>{item.nutritions.Kali}</td>
                    <td>{item.nutritions.Natri}</td>
                    <td>{item.nutritions.Protein}</td>
                    <td>{item.nutritions.Carbohydrat}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="8" className="text-right">
                    <strong>Total Price:</strong>
                  </td>
                  <td colSpan="3">
                    <strong>
                      ${calculateTotalPrice().totalPrice.toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button color="primary" onClick={handleConfirmPayment}>
              Confirm Payment
            </Button>
          </Container>

          {/* Receipt Modal */}
          <Modal
            isOpen={showReceipt}
            toggle={() => setShowReceipt(!showReceipt)}
          >
            <ModalHeader toggle={() => setShowReceipt(!showReceipt)}>
              Receipt
            </ModalHeader>
            <ModalBody>
              <h5>Receipt List</h5>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Food Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {calculateTotalPrice().items.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name.english}</td>
                      <td>{item.quantity}</td>
                      <td>${item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={handleResetCart}>
                Confirm Payment
              </Button>{" "}
              <Button color="secondary" onClick={() => setShowReceipt(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default OrderCart;
