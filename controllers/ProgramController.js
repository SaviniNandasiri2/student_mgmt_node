const connectionPool = require('../db/DatabaseConnection');

const showAllPrograms = (req, resp)=>{
    
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        const sql = "SELECT * FROM program";
        connection.query(sql,(err,rows)=>{
            connection.release();

            if(!err){
                resp.render('programs',{rows});
            }else{
                console.log(err);
            }
        });
    });

}
const createProgram = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;
        }
        const {programId,programName,startDate,duration} = req.body;

        if (!programId || !programName || !startDate || !duration) {
            resp.status(400).json({ error: 'All fields are required' });
            return false;
        }

        connection.query('INSERT INTO program VALUES (?,?,?,?)',
        [programId,programName,startDate,duration],(err,rows)=>{
            connection.release();

            if(!err){
                resp.redirect('programs');
            }else{
                console.log(err);
            }
            
        });
    });
}

const findPrograms = (req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        let searchText = req.body.text;
        connection.query('SELECT * FROM program WHERE program_name LIKE ?',
                ['%'+searchText+'%'],(err,rows)=>{
            connection.release();

            if(!err){
                resp.render('programs',{rows});
            }else{
                console.log(err);
            }

        });
    });
}

const deleteProgram = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        connection.query('DELETE FROM program WHERE program_id=?',
        [req.params.program_id],(err,rows)=>{
            connection.release();
            if(!err){
                resp.redirect('/programs');
            }else{
                console.log(err);
            }
        });
    });
    
}

const updateProgramForm = (req, resp)=>{
        connectionPool.getConnection((error, connection)=>{
            if (error) {
                throw error;  
            }
    
            connection.query('SELECT * FROM program WHERE program_id=?',
            [req.params.program_id],(err,rows)=>{
                connection.release();
                const data = rows[0];
                if(!err){
                    resp.render('update-program-form',{program:data});
                }else{
                    console.log(err);
                }
            });
        });
}
const updateProgram = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        const {programId,programName,startDate,duration} = req.body;

        if (!programId || !programName || !startDate || !duration) {
            resp.status(400).json({ error: 'All fields are required' });
            return false;
        }
        
        connection.query('UPDATE program SET program_name=?, start_date=?, duration=? WHERE program_id=?',
        [programName,startDate,duration,programId],(err,rows)=>{
            connection.release();
            if(!err){
                resp.redirect('/programs');
            }else{
                console.log(err);
            }
        });
    }); 
}

const showRegistrations = (req, resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if (error) {
            throw error;  
        }
        programId = req.params.program_id;
        connection.query('SELECT registration.st_id, student.full_name, registration.p_id, program.program_name, registration.date, registration.payment FROM registration INNER JOIN student ON registration.st_id = student.student_id INNER JOIN program ON registration.p_id = program.program_id WHERE registration.p_id = ?',
        [programId],(err,rows)=>{
            connection.release();
            
            if(!err){
                resp.render('show-registrations',{program_id:programId,rows:rows});
            }else{
                console.log(err);
            }
        });
    });
}

module.exports={
    showAllPrograms,
    createProgram,
    findPrograms,
    deleteProgram,
    updateProgramForm,
    updateProgram,
    showRegistrations
}