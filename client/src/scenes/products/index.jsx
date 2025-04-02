import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useGetProductsQuery } from "state/api";
import { Header } from "components";
import axios from "axios";
import JiraCard from "../../components/Card";
// Product
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  // theme
  const theme = useTheme();
  // is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      {/* Content */}
      <CardContent>
        {/* Category */}
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>

        {/* Name */}
        <Typography variant="h5" component="div">
          {name}
        </Typography>

        {/* Price */}
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>

        {/* Rating */}
        <Rating value={rating} readOnly />

        {/* Description */}
        <Typography variant="body2">{description}</Typography>
      </CardContent>

      {/* See More/See Less */}
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "See Less" : "See More"}
        </Button>
      </CardActions>

      {/* More Info */}
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Products
const Products = () => {
  // get data
  const { data, isLoading } = useGetProductsQuery();
  // is medium/large desktop
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      await axios
        .get("http://localhost:8080/tickets/test")
        .then((res) => {
          setState(res.data.issues);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchIssues();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {state.length > 0 ? (
        <>
          <div className="grid mt-4">
            {state.map((issue, index) => (
              <JiraCard key={index} data={issue}></JiraCard>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default Products;
