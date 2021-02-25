const {Router}= require('express');
const {check}=require('express-validator');

const router=Router();

const {crearUsuario, loginUsuario, revalidarToken}= require('../controllers/auth');
const {validarCampos}= require('../middlewares/validar-campos');
const {validarJwt}= require('../middlewares/vaalidar-jwt');



router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es invalido o no fue ingresado').isEmail(),
        check('password','La contraseña debe tener un minimo de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
            );

router.post(
    '/',
    [        
        check('email','El email es invalido o no fue ingresado').isEmail(),
        check('password','La contraseña debe tener un minimo de 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    loginUsuario);

router.get('/renew', validarJwt,revalidarToken);


module.exports= router;