import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Button, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const linkStyle = {
  textDecoration: "none",
};

export default function SellerDashboard() {
  const [open, setOpen] = React.useState(false);
  const [PBathRooms, setPBathRooms] = React.useState(0);
  const [PAddress, setPAddress] = React.useState("");
  const [PArea, setPArea] = React.useState(0);
  const [PAmenties, setPAmenties] = React.useState("");
  const [Pname, setPName] = React.useState("");
  const [PBedRooms, setPBedRooms] = React.useState(0);
  const [data, setData] = React.useState();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [propertyId, setPropertyId] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(PBathRooms, PAddress);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/login/AddProperty",
        {
          name: Pname,
          area: PArea,
          bedrooms: PBedRooms,
          bathrooms: PBathRooms,
          amenities: PAmenties.split(",").map((item) => item.trim()), // Ensuring amenities is an array
          address: PAddress,
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
    handleClose();
  };

  React.useEffect(() => {
    const fetchProperty = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://rentify-3-3qv3.onrender.com/api/login/allProperty",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("SellerProperties==>", response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperty();
  }, []);

  const handleEdit = async (
    propId,
    name,
    area,
    bedrooms,
    bathrooms,
    amenities,
    address
  ) => {
    setPropertyId(propId);

    setPName(name);
    setPAddress(address);
    setPArea(area);
    setPBedRooms(bedrooms);
    setPBathRooms(bathrooms);
    setPAmenties(amenities);

    console.log(propId);

    handleOpenEdit();
  };

  const handleUpdateProperty = async (propId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://rentify-3-3qv3.onrender.com/api/login/editProperty/${propertyId}`,
        {
          name: Pname,
          area: PArea,
          bedrooms: PBedRooms,
          bathrooms: PBathRooms,
          amenities:
            typeof PAmenties === "string"
              ? PAmenties.split(",").map((item) => item.trim())
              : PAmenties,
          address: PAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseEdit();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (propId) => {
    setPropertyId(propId);
    console.log(propId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://rentify-3-3qv3.onrender.com/api/login/deleteProperty/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPropertyId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        height={40}
        my={4}
        display="flex"
        alignContent="center"
        justifyContent={"center"}
        gap={4}
        p={2}
        sx={{ border: "1px  grey" }}
      >
        <h1>SellerDashboard</h1>
      </Box>
      <Box
        height={50}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "1px  grey" }}
        justifyContent={"center"}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleOpen}>
            Add New Property
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            <Link to="/BuyerDashboard" style={linkStyle}>
              Home
            </Link>
          </Button>
        </Stack>
      </Box>

      <Box
        height={200}
        my={4}
        display="flex"
        alignContent="center"
        justifyContent={"center"}
        gap={4}
        p={2}
        sx={{ border: "1px  grey" }}
      >
        <Grid style={{ marginBottom: "40px", marginTop: "40px" }}>
          <Box
            height={20}
            my={4}
            display="flex"
            alignContent="center"
            justifyContent={"center"}
            gap={4}
            p={2}
            sx={{ border: "1px  grey" }}
          >
            <h2>Your Posted Properties</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Property Name
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Area (sqft)
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Bedrooms
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Bathrooms
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Amenities
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Edit
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "1.2rem" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((property, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{property.name}</TableCell>
                    <TableCell align="center">{property.area}</TableCell>
                    <TableCell align="center">{property.bedrooms}</TableCell>
                    <TableCell align="center">{property.bathrooms}</TableCell>
                    <TableCell align="center">{property.address}</TableCell>
                    <TableCell align="center">
                      {property.amenities.join(", ")}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <EditIcon
                        onClick={() =>
                          handleEdit(
                            property._id,
                            property.name,
                            property.area,
                            property.bedrooms,
                            property.bathrooms,
                            property.amenities,
                            property.address
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <DeleteIcon
                        onClick={() => handleDelete(property._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>

      {/* property edit modal */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="child-modal-title">Edit Property</h2>
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-name"
            label="Property Name"
            name="property-name"
            placeholder={Pname}
            onChange={(e) => setPName(e.target.value)}
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-address"
            label="Property Address"
            name="property-address"
            autoComplete="off"
            placeholder={PAddress}
            onChange={(e) => setPAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-area"
            label="Property Area (sqft)"
            name="property-area"
            type="number"
            autoComplete="off"
            placeholder={PArea}
            onChange={(e) => setPArea(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-bedrooms"
            label="Number of Bedrooms"
            name="property-bedrooms"
            type="number"
            autoComplete="off"
            placeholder={PBedRooms}
            onChange={(e) => setPBedRooms(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-bathrooms"
            label="Number of Bathrooms"
            name="property-bathrooms"
            type="number"
            autoComplete="off"
            placeholder={PBathRooms}
            onChange={(e) => setPBathRooms(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-amenities"
            label="Amenities (comma-separated)"
            name="property-amenities"
            autoComplete="off"
            placeholder={PAmenties}
            onChange={(e) => setPAmenties(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdateProperty}
          >
            Edit Property
          </Button>
        </Box>
      </Modal>

      {/* property add modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="child-modal-title">Add New Property</h2>
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-name"
            label="Property Name"
            name="property-name"
            onChange={(e) => setPName(e.target.value)}
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-address"
            label="Property Address"
            name="property-address"
            autoComplete="off"
            onChange={(e) => setPAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-area"
            label="Property Area (sqft)"
            name="property-area"
            type="number"
            autoComplete="off"
            onChange={(e) => setPArea(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-bedrooms"
            label="Number of Bedrooms"
            name="property-bedrooms"
            type="number"
            autoComplete="off"
            onChange={(e) => setPBedRooms(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-bathrooms"
            label="Number of Bathrooms"
            name="property-bathrooms"
            type="number"
            autoComplete="off"
            onChange={(e) => setPBathRooms(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="property-amenities"
            label="Amenities (comma-separated)"
            name="property-amenities"
            autoComplete="off"
            onChange={(e) => setPAmenties(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAdd}
          >
            Add Property
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
