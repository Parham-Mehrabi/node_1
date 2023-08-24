const Student = require('../models/student_model')


async function listFriends(id) {
    try {
        return await Student.findById(id).select('friends -_id').populate({
            path: 'friends',
            select: '_id name'
        })
    }
    catch (error) {
        throw error
    }
};

async function addFriend(student_id, friend_id) {
    try {
        const student = await Student.findByIdAndUpdate(student_id,
            { $push: { friends: friend_id } },
            { new: true })      // return the updated student
            .select('name friends -_id ')
            .populate({
                path: 'friends',
                select: '_id name'
            });
        if (!student) return null;
        const reorderedStudent = {
            // put name before friends
            name: student.name,
            _id: student._id,
            friends: student.friends
        };
        return reorderedStudent;
    }
    catch (error) { throw error };
};

async function removeFriendByID(student_id, friend_id) {
    try {
        const student = await Student.findByIdAndUpdate(student_id,
            { $pull: { friends: friend_id } },
            { new: true })
            .select('name friends -_id ')
            .populate({
                path: 'friends',
                select: '_id name'
            });
        if (!student) return null;
        const reorderedStudent = {
            // put name before friends
            name: student.name,
            _id: student._id,
            friends: student.friends
        };
        return reorderedStudent;
    }
    catch (error) { throw error };
}

module.exports.listFriends = listFriends;
module.exports.addFriend = addFriend;
module.exports.removeFriendByID = removeFriendByID;