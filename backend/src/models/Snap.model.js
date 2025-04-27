import mongoose from 'mongoose'

const snapSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        image: {
            type: String, // url from cloudinary
            required: true
        }
    },
    {
        timestamps: true
    })

export const Snap = mongoose.model('Snap', snapSchema);