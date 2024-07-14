import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
} from "reactstrap";
import FoodCard from "../components/FoodCard";
import foodList from "../data/food.json";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Login from "./Login";

const FoodList = () => {
  const { user } = useSelector((state) => state.user);
  console.log("list page", user);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const foodPerPage = 6;

  const filteredFoodList = useMemo(() => {
    if (!searchQuery.trim()) {
      return foodList;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return foodList.filter(
      (food) =>
        food.name.english.toLowerCase().includes(lowerCaseQuery) ||
        food.name.japanese.toLowerCase().includes(lowerCaseQuery) ||
        food.name.chinese.toLowerCase().includes(lowerCaseQuery) ||
        food.name.french.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredFoodList.length / foodPerPage);

  const indexOfLastFood = currentPage * foodPerPage;
  const indexOfFirstFood = indexOfLastFood - foodPerPage;
  const currentFood = filteredFoodList.slice(
    indexOfFirstFood,
    indexOfLastFood
  );

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset page number when search query changes
  };

  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 10;
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage - halfWindow < 1) {
      endPage = Math.min(totalPages, endPage + (halfWindow - currentPage + 1));
    }

    if (currentPage + halfWindow > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfWindow - totalPages)
      );
    }

    if (startPage > 1) {
      paginationItems.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handleClick(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        paginationItems.push(
          <PaginationItem key="ellipsis1" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={() => handleClick(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <PaginationItem key="ellipsis2" disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handleClick(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Container>
            <Row>
              <Col>
                <Input
                  type="text"
                  className="mt-4"
                  placeholder="Search Food..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
            <Row>
              {currentFood.map((food) => (
                <Col key={food.id} sm="4">
                  <FoodCard food={food} />
                  
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <Pagination className="d-flex justify-content-center mt-4">
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink
                      onClick={() => handleClick(currentPage - 1)}
                      previous
                    />
                  </PaginationItem>
                  {renderPagination()}
                  <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink
                      onClick={() => handleClick(currentPage + 1)}
                      next
                    />
                  </PaginationItem>
                </Pagination>
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

export default FoodList;
