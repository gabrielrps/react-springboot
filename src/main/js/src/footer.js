import React from 'react';
import Container from './Container';
import { Button, Avatar } from 'antd';
import './footer.css';

const Footer = (props) => (
    <div className='footer'>
        <Container>
            {
                props.totalStudents ? <Avatar style={{backgroundColor:'#f56a00', marginRight:'5px'}} size='large'>{props.totalStudents}</Avatar> : null
            }
            <Button onClick={() => props.handleAddStudentClickEvent()} type='primary'>Add new Student +</Button>
        </Container>
    </div>
);

export default Footer;