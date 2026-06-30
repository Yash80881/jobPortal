const User = require("../models/userModel");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");

const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
              return res.status(404).json({
                success: false,
                message: "User not found"
              });
        }
        return res.status(200).json({
            success: true,
            user
        });
    }catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

const updateProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id);

         if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const {
            name,
            bio,
            skills,
            education,
            experience
        } = req.body;

        if (name!==undefined) user.name = name;

        if (bio!==undefined) user.profile.bio = bio;

        if (education!==undefined)
            user.profile.education = education;

        if (experience!==undefined)
            user.profile.experience = experience;

        if (skills!==undefined) {
            user.profile.skills = skills
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0);
        }

        const profilePhoto = req.files?.profilePhoto?.[0];

        if (profilePhoto) {

            if (user.profile.profilePhoto.public_id) {
                await deleteFromCloudinary(
                    user.profile.profilePhoto.public_id
                );
            }

//console.log(profilePhoto);
// console.log(profilePhoto.buffer);
// console.log(Buffer.isBuffer(profilePhoto.buffer));
// console.log(profilePhoto.buffer.constructor.name);

            const uploadedImage = await uploadToCloudinary(
                profilePhoto.buffer,
                "profile-photos",
                "image"  
            );

            user.profile.profilePhoto = {
                url: uploadedImage.secure_url,
                public_id: uploadedImage.public_id
            };
        }    
        
        const resume = req.files?.resume?.[0];

        if (resume) {

            if (user.profile.resume.public_id) {
                await deleteFromCloudinary(
                    user.profile.resume.public_id
                );
            }

            const uploadedResume = await uploadToCloudinary(
                resume.buffer,
                "resumes",
                "raw"
            );
            // console.log(uploadedResume);
            user.profile.resume = {
                url: uploadedResume.secure_url,
                public_id: uploadedResume.public_id
            };
        }        

        const isProfileComplete =
            user.name &&
            user.profile.bio &&
            user.profile.skills.length > 0 &&
            user.profile.education &&
            user.profile.experience &&
            user.profile.profilePhoto.url &&
            user.profile.resume.url;

            user.profileCompleted = Boolean(isProfileComplete);

        await user.save();

        const updatedUser = await User.findById(user._id).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    }catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {getProfile, updateProfile};