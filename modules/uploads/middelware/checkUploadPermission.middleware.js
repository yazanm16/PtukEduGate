const knex = require('knex');
const config = require('../../../knexfile');
const db = knex(config);

const checkUploadPermission = async (req, res, next) => {
    try {
        const uploadId = req.params.upload_id;
        const adminId = req.user.id;
        const role = req.user.role;

        if (role === 'superadmin') return next();

        const admin = await db('admins').where({ admin_id: adminId }).first();
        if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

        const upload = await db('upload').where({ upload_id: uploadId }).first();
        if (!upload) return res.status(404).json({ success: false, message: "Upload not found" });

        const isAuthorized = await db('departments_courses')
            .where({
                course_id: upload.course_id,
                department_id: admin.department_id
            })
            .first();

        if (!isAuthorized) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to approve/reject this upload"
            });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Authorization check failed"
        });
    }
};

module.exports = checkUploadPermission;
