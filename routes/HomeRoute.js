const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');
const StudentController = require('../controllers/StudentController');
const ProgramController = require('../controllers/ProgramController');
const RegistrationController = require('../controllers/RegistrationController');

router.get('/',HomeController.initializeUi);

router.get('/students',StudentController.showAllStudents);
router.post('/create-student',StudentController.createStudent);
router.post('/find-students',StudentController.findStudents);
router.get('/delete-student/:student_id',StudentController.deleteStudent);
router.get('/update-student-form/:student_id',StudentController.updateStudentForm);
router.post('/update-student',StudentController.updateStudent);

router.get('/programs',ProgramController.showAllPrograms);
router.post('/create-program',ProgramController.createProgram);
router.post('/find-programs',ProgramController.findPrograms);
router.get('/delete-program/:program_id',ProgramController.deleteProgram);
router.get('/update-program-form/:program_id',ProgramController.updateProgramForm);
router.post('/update-program',ProgramController.updateProgram);
router.get('/show-registrations/:program_id',ProgramController.showRegistrations);

router.get('/registrations',RegistrationController.initializeRegistration); //load the registration page
router.post('/create-registration',RegistrationController.createRegistration);

module.exports=router;