const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho Note
const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] }, // Định nghĩa tags là một mảng chuỗi
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: Date.now } // Sử dụng Date.now như một hàm để lấy thời gian hiện tại
});

// Tạo model từ schema và xuất ra
module.exports = mongoose.model('Note', noteSchema);
