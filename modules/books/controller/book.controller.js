const knex = require('knex');
const knexConfig = require('../../../knexfile');
const {createBook,getBook,deleteBook,updateBook} = require("../service/book.service");
const db = knex(knexConfig);

const createBookByPost=async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required' });
    }
    try {
        const admin_id = req.user.id;
        const book_path = `uploads/book/${req.file.filename}`;
        const { book_name, course_id, doctor_name,description } = req.body;
        await createBook({ book_name, course_id, doctor_name, book_path, admin_id,description})
        return res.status(200).json({ success: true, message: 'Book created successfully' });
    }catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const getBookByGet=async(req,res)=>{
    try {
        const filters=req.query;
        const result=await getBook(filters);
        if (!result){
            res.status(404).json({
                success:false,
                message:"No books found."
            })
        }
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch (err) {
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
    }
}

const deleteBookByDelete=async(req,res)=>{
    try {
        const admin_id = req.user.id;
        const bookId=req.params.book_id;
        const result=await deleteBook(bookId,admin_id);
        if(!result){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Book deleted successfully,You can find it in archive table",
        })
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateBookByPut = async (req, res) => {

    const { book_id } = req.params;
    const { book_name, doctor_name,description } = req.body;

    const updateData = {};
    if (book_name) updateData.book_name = book_name;
    if (doctor_name) updateData.doctor_name = doctor_name;
    if(description) updateData.description = description;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ success: false, message: "No data to update." });
    }

    try {
        const result = await updateBook(book_id, updateData);
        if (!result) {
            return res.status(404).json({ success: false, message: "Book not updated." });
        }
        res.status(200).json({ success: true, message: "Book updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

module.exports={
    createBookByPost,
    getBookByGet,
    deleteBookByDelete,
    updateBookByPut
}