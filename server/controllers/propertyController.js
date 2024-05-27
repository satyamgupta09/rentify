const Property = require("../model/Property");

exports.addProperty = async (req, res) => {
  const { name, area, bedrooms, bathrooms, amenities, address } = req.body;
  try {
    const newProperty = new Property({
      seller: req.userData.id,
      name,
      area,
      bedrooms,
      bathrooms,
      amenities,
      address,
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ error: "Error in adding new property" });
  }
};

exports.getAllProperties = async (req, res) => {
  const id = req.userData.id;
  try {
    const properties = await Property.find({ seller: id });
    res.status(201).json(properties);
  } catch (error) {
    res.status(400).json({ error: "Error in fetching all properties" });
  }
};

exports.editProperty = async (req, res) => {
  const propId = req.params.id;
  const { name, area, bedrooms, bathrooms, amenities } = req.body;
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propId,
      { name, area, bedrooms, bathrooms, amenities },
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(400).json({ error: "Error in editing property" });
  }
};

exports.deleteProperty = async (req, res) => {
  const propId = req.params.id;
  try {
    await Property.findByIdAndDelete(propId);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error in deleting property" });
  }
};

exports.getAllPropertiesPublic = async (req, res) => {
  try {
    const properties = await Property.find({}).populate("seller");
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ error: "Error in fetching all properties" });
  }
};
