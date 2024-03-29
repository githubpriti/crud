// LOGIC, BUSINESS LOGIC
const User = require("../model/userModel");

exports.home = (req, res) =>{
    res.send("Hello from  backend");
};

exports.createUser = async (req, res) => {
  try {
    //Extracting name nd email from body
    const { name, email } = req.body;
    // To check all the details
    if (!name || !email) {
      throw new Error("Name and Email are Required");
    }
    const userExists = await User.findOne({ email });    //whether email entered is there or not

    if (userExists) {
      throw new Error("Email Already Exists");       
    }
    
    // Inserting into the Database
    
    const user = await User.create({ name, email});
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};