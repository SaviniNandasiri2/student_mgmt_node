const connectionPool = require('../db/DatabaseConnection');

const showAllStudents = (req, resp)=>{
    
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        const sql = "SELECT * FROM student";
        connection.query(sql,(err,rows)=>{
            connection.release();

            if(!err){
                resp.render('students',{rows});
            }else{
                console.log(err);
            }
        });
    });

}
const createStudent = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            resp.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const {studentid,fullname,nic,birthday,gender,contact,email} = req.body;

          // Validate input
        if (!validateStudentInput(req, resp)) {
            connection.release();
            return;
        }

        connection.query('INSERT INTO student VALUES (?,?,?,?,?,?,?)',
        [studentid,fullname,nic,birthday,gender,contact,email],(err,rows)=>{
            connection.release();

            if(!err){
                resp.redirect('students');
            }else{
                console.log(err);
                resp.status(500).json({ error: 'Internal Server Error' });
            }
            
        });
    });

}

const findStudents = (req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        let searchText = req.body.text;
        connection.query('SELECT * FROM student WHERE full_name LIKE ?',
                ['%'+searchText+'%'],(err,rows)=>{
            connection.release();

            if(!err){
                resp.render('students',{rows});
            }else{
                console.log(err);
            }

        });
    });
}

const deleteStudent = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        connection.query('DELETE FROM student WHERE student_id=?',
        [req.params.student_id],(err,rows)=>{
            connection.release();
            if(!err){
                resp.redirect('/students');
            }else{
                console.log(err);
            }
        });
    });
    
}

const updateStudentForm = (req, resp)=>{
        connectionPool.getConnection((error, connection)=>{
            if (error) {
                throw error;  
            }
    
            connection.query('SELECT * FROM student WHERE student_id=?',
            [req.params.student_id],(err,rows)=>{
                connection.release();
                const data = rows[0];
                if(!err){
                    resp.render('update-student-form',{student:data});
                }else{
                    console.log(err);
                }
            });
        });
}
const updateStudent = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        const {studentid,fullname,nic,birthday,gender,contact,email} = req.body;
        
        // Validate input
        if (!validateStudentInput(req, resp)) {
            connection.release();
            return;
        }

        connection.query('UPDATE student SET full_name=?, nic=?, birthday=?,  gender=?, contact=?,email=? WHERE student_id=?',
        [fullname,nic,birthday,gender,contact,email,studentid],(err,rows)=>{
            connection.release();
            if(!err){
                resp.redirect('/students');
            }else{
                console.log(err);
            }
        });
    }); 
}

// Function for input validation
const validateStudentInput = (req, resp) => {
    const { studentid, fullname, nic, birthday, gender, contact, email } = req.body;

    // Perform common input validation
    if (!studentid || !fullname || !nic || !birthday || !gender || !contact || !email) {
        resp.status(400).json({ error: 'All fields are required' });
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        resp.status(400).json({ error: 'Invalid email format' });
        return false;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contact)) {
        resp.status(400).json({ error: 'Invalid phone number format' });
        return false;
    }

    // All validations passed
    return true;
};

module.exports={
    showAllStudents,
    createStudent,
    findStudents,
    deleteStudent,
    updateStudentForm,
    updateStudent
}