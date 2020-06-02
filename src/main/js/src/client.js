import fetch from 'unfetch';

const checkError = response => {
        if (response.ok){
                return response;
        }else {
                let error = new Error(response.statusText);
                error.response = response;
                response.json().then(e => {
                        error.error = e;       
                });
                return Promise.reject(error)
        }
}

export const getAllStudents = (page, pageSize) => 
        fetch('api/students?page=' + page + '&limit=' + pageSize);

export const addNewStudent = (student) => 
        fetch('api/students', {
                headers:{
                        'Content-Type' : 'application/json'
                }, method: 'POST',
                   body: JSON.stringify(student)     
        });

export const getAllStudentsByEmail = (email) => 
        fetch('api/students/email/' + email).then(checkError);