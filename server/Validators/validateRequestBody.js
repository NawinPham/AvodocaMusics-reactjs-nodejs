const Joi = require('joi');

// Định nghĩa schema để validate body
const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'any.required': 'Tên là bắt buộc',
        'string.empty': 'Tên không được để trống',
        'string.min': 'Tên phải có ít nhất 3 ký tự'
    }),
    image: Joi.string().pattern(/\.(jpg|jpeg|png|gif|webp)$/i).required().messages({
        'any.required': 'Ảnh là bắt buộc',
        'string.pattern.base': 'Ảnh chỉ chấp nhận định dạng jpg, jpeg, png, gif'
    }),
    description: Joi.string().optional()
});

// Function để validate
function validatRequestBody(req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

module.exports = validatRequestBody;
