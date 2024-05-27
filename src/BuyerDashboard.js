import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Propane, Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerMobile, setSellerMobile] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSellerEmail("");
    setSellerMobile("");
    setSellerName("");
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/login/properties"
        );
        console.log(response.data);
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterProperties(event.target.value, amenitiesFilter);
  };

  const handleAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    let updatedFilter = [...amenitiesFilter];
    if (checked) {
      updatedFilter.push(value);
    } else {
      updatedFilter = updatedFilter.filter((item) => item !== value);
    }
    setAmenitiesFilter(updatedFilter);
    filterProperties(searchTerm, updatedFilter);
  };

  const filterProperties = (searchTerm, amenitiesFilter) => {
    let filteredProperties = properties.filter((property) => {
      // Filter by search term
      const matchSearchTerm = property.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by selected amenities
      const matchAmenities =
        amenitiesFilter.length === 0 ||
        amenitiesFilter.every((amenity) =>
          property.amenities.includes(amenity)
        );

      return matchSearchTerm && matchAmenities;
    });

    setFilteredProperties(filteredProperties);
  };

  const handleCheck = async (fname, lname, mobile, email) => {
    console.log("inside");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const name = fname + lname;

      setSellerName(name);
      setSellerEmail(email);
      setSellerMobile(mobile);
      console.log(name, email, mobile);
      handleSendEmail(name, mobile, email);
      handleClickOpen();
    } else {
      navigate("/login");
    }
  };

  const handleSendEmail = async (name, mobile, email) => {
    console.log(name, mobile, email);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/login/sendEmail",
        {
          sname: name,
          smobile: mobile,
          semail: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      {/* <Typography variant="h4" gutterBottom>
        Buyer Dashboard
      </Typography> */}
      <Box
        height={40}
        width={1200}
        my={4}
        display="flex"
        //   alignItems="center"
        justifyContent={"center"}
        gap={4}
        p={2}
        sx={{ border: "2px  grey" }}
      >
        <TextField
          label="Search Properties"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "1rem" }}
        />
      </Box>

      <Box
        height={60}
        width={1200}
        my={4}
        display="flex"
        justifyContent="center"
        gap={4}
        p={2}
        sx={{ border: "2px  grey" }}
      >
        <Stack>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            {" "}
            Filter by Amenities
          </Typography>
          <Grid container spacing={1} style={{ marginBottom: "1rem" }}>
            {["Hospital", "School", "Park", "Gym", "Market"].map((amenity) => (
              <Grid item key={amenity}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={amenitiesFilter.includes(amenity)}
                      onChange={handleAmenitiesChange}
                      value={amenity}
                    />
                  }
                  label={amenity}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {property.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Address: {property.address}
                  <br />
                  Area: {property.area}
                  <br />
                  Bedrooms: {property.bedrooms}
                  <br />
                  Bathrooms: {property.bathrooms}
                  <br />
                  Amenities: {property.amenities.join(", ")}
                </Typography>
              </CardContent>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ margin: "0 16px 16px 16px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(property.seller)}
                >
                  <ThumbUpIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleCheck(
                      property.seller.firstName,
                      property.seller.lastName,
                      property.seller.phoneNumber,
                      property.seller.email
                    )
                  }
                >
                  I'm interested
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seller' contact details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* sellers contact intformation */}
            <Typography>Name: {sellerName}</Typography>
            <Typography>MobileNumber: {sellerMobile}</Typography>
            <Typography>Email: {sellerEmail}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BuyerDashboard;
