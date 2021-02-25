const {Router}= require('express');
const router=Router();
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const {validarJwt}= require('../middlewares/vaalidar-jwt');
const {check}=require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const {isDate}= require('../helpers/isDate')


//Validacion de todas las rutas
router.use(validarJwt);

//Obtener eventos
router.get('/', getEvento);


//Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
     crearEvento);

//Actualizar evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento);

//Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports= router;