import Doctor from "../models/doctorModel.js";

const changeAvailablity = async (req, res) => {
    try {
        const {docId} = req.body;
      
        const docData = await Doctor.findById(docId);
        await Doctor.findByIdAndUpdate(docId, {available: !docData.available});

        res.status(200).json({
            success: true,
            message: 'Availability Changed'
        })

    } catch (error) {
         console.log(error);
         res.json({success: false, message: error.message});
    }
}

export {
    changeAvailablity
}