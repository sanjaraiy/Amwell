import e from 'express';
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        email: [true, 'Email is required'],
        unique: true


    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    speciality: {
        type: String,
        required: [true, 'Speciality is required']
    },
    degree: {
        type: String,
        required: [true, 'Degree is required']
    },
    experience: {
        type: String,
        required: [true, 'Experience is required']
    },
    about: {
        type: String,
        required: [true, 'About is required']

    },
    available: {
        type: Boolean,
        default: true,
        required: [true, 'Available is required']
    },
    fees: {
        type: Number,
        required: [true, 'Fees is required']
    },
    address: {
        type: Object,
        required: [true, 'Address is required']
    },
    date: {
        type: Number,
        required: [true, 'Date is required']
    },
    slots_booked: {
        type: Object,
        default: {},
    }

}, {minimize: false});

const Doctor = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default Doctor;