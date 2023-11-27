const connectionPool = require('../db/DatabaseConnection');

const initializeRegistration = (req, resp) => {
    
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        const sql = "SELECT program_id, program_name FROM program";
        const currentDate = new Date().toISOString().split('T')[0];

        connection.query(sql,(err,programs)=>{
            connection.release();
            if(!err){
                resp.render('registrations',{ programs, currentDate });
            }else{
                console.log(err);
            }
        });
    });
}


const createRegistration = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            resp.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const { registrationDate, payment, studentId, programId } = req.body;

        // Validate input
        if (!registrationDate || !payment || !studentId || !programId) {
            connection.release();
            resp.status(400).json({ error: 'All fields are required' });
            return;
        }

        // Check if studentId exists in the student table
        connection.query('SELECT * FROM student WHERE student_id = ?', [studentId], (errStudent, rowsStudent) => {
            if (errStudent) {
                connection.release();
                resp.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (rowsStudent.length === 0) {
                connection.release();
                resp.status(400).json({ error: 'Invalid studentId. Student not found.' });
                return;
            }

            // Check if programId exists in the program table
            connection.query('SELECT * FROM program WHERE program_id = ?', [programId], (errProgram, rowsProgram) => {
                if (errProgram) {
                    connection.release();
                    resp.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                if (rowsProgram.length === 0) {
                    connection.release();
                    resp.status(400).json({ error: 'Invalid programId. Program not found.' });
                    return;
                }

                // Check if the composite key (studentId, programId) already exists in the registration table
                connection.query(
                    'SELECT * FROM registration WHERE st_id = ? AND p_id = ?',
                    [studentId, programId],
                    (errCheck, rowsCheck) => {
                        if (errCheck) {
                            connection.release();
                            resp.status(500).json({ error: 'Internal Server Error' });
                            return;
                        }

                        if (rowsCheck.length > 0) {
                            connection.release();
                            resp.status(400).json({ error: 'Duplicate entry. Registration already exists for this student and program.' });
                            return;
                        }

                        // Continue with the registration insertion
                        connection.query(
                            'INSERT INTO registration (date, payment, st_id, p_id) VALUES (?,?,?,?)',
                            [registrationDate, payment, studentId, programId],
                            (errInsert, rowsInsert) => {
                                connection.release();
                                if (!errInsert) {
                                    resp.redirect('registrations');
                                } else {
                                    console.log(errInsert);
                                    resp.status(500).json({ error: 'Internal Server Error' });
                                }
                            }
                        );
                    }
                );
            });
        });
    });
};


module.exports = {
    initializeRegistration,
    createRegistration,
}



