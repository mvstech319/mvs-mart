const Address=require('../models/address_schema')

const addAddress = async (req, res) => {
    const { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
    let userId = req.user; 
    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated', success: false });
    }
  
    // Validate required fields
    if (!fullName || !address || !city || !state || !country || !pincode || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }
    try {
      const userAddress = await Address.create({
        userId,
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
      });
  
      return res.json({
        message: 'Address Added Successfully...',
        userAddress,
        success: true
      });
    } catch (error) {
      console.error('Error adding address:', error);
      return res.status(500).json({
        message: 'Failed to add address. Please try again.',
        success: false
      });
    }
  };
  

const getAddress = async (req, res) => {
    try {
        // Fetch the latest address for the logged-in user
        const latestAddress = await Address.findOne({ userId: req.user })
            .sort({ createdAt: -1 }) // Sort by creation date descending
            .lean(); // Improve performance by returning plain JS object

        if (!latestAddress) {
            return res.status(404).json({ message: 'No address found', success: false });
        }

        res.status(200).json({
            message: 'Latest address fetched successfully',
            userAddress: latestAddress,
            success: true
        });
    } catch (error) {
        console.error('Error fetching latest address:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


module.exports={addAddress,getAddress};