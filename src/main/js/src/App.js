import React, { Component } from 'react';
import './App.css';
import { getAllStudents, getAllStudentsByEmail } from './client';
import { Table, Avatar, Spin, Pagination, Modal, Input } from 'antd';
import Container from './Container';
import Footer from './footer';
import { LoadingOutlined  } from '@ant-design/icons';
import AddStudentForm from './forms/addStudentForm';
import { errorNotification } from './notification';

const getIndicator = () => <LoadingOutlined style={{ fontSize: 24 }} />
const { Search } = Input;

class App extends Component{

  state = {
    students: [],
    isFetching: false,
    pageNumber : 1,
    totalElements: 0,
    totalPages: 0,
    pageSizeUser : 10,
    totalStudents : 0,
    isAddStudentModalVisible: false
  };

  componentDidMount() {
    console.log("Entro");
    this.fetchStudents(0, 10);
  };

  openAddStudentModalVisible = () => this.setState({isAddStudentModalVisible: true});
  closeAddStudentModalVisible = () => this.setState({isAddStudentModalVisible: false});

  getStudentsByEmail = (email) => {
    getAllStudentsByEmail(email)
      .then(res => res.json()
      .then(students => { 
            console.log(students);
            this.setState({
              students: students._embedded.studentList, 
              isFetching:false,
              pageNumber: students.page.number,
              totalElements: students.page.totalElements,
              pageSizeUser: students.page.size,
              totalStudents: students.page.totalElements
            })
          }))
          .catch(error => {
            const message = error.error.message;
            errorNotification(message, message);
            this.setState({isFetching: false});
          });
  };

  fetchStudents = (page, pageSize) => {
    this.setState({
      isFetching: true
    });
    
    getAllStudents(page, pageSize)
        .then(res => res.json()
        .then(students => { 
                console.log(students);
                this.setState({
                  students: students._embedded.studentList, 
                  isFetching:false,
                  pageNumber: students.page.number,
                  totalElements: students.page.totalElements,
                  pageSizeUser: students.page.size,
                  totalStudents: students.page.totalElements
                })
              }
      ));
  };

  render (){  

    const { students, isFetching, pageNumber, totalElements, pageSizeUser, totalStudents, isAddStudentModalVisible } = this.state;

    if(isFetching){
      return(
        <Container>
          <Spin indicator={getIndicator()} />
        </Container>
      );
    }
    
    if(students && students.length){
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )     
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId'    
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'    
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'    
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'    
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'    
        }    
      ];
      return (
      <Container>

        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => {this.getStudentsByEmail(value)}}
        />

        <Table 
          dataSource={students} 
          columns={columns} 
          rowKey='studentId'
          pagination={false} />

          <Modal title='Add new Student' 
                  visible={isAddStudentModalVisible} 
                  onOk={this.addAddStudentModalVisible} 
                  onCancel={this.closeAddStudentModalVisible}
                  width={1000}>
                  <AddStudentForm onSuccess={() => {this.closeAddStudentModalVisible(); this.fetchStudents(0, pageSizeUser)}}/>
          </Modal>

          <br />
          <br />

          <Pagination current={pageNumber + 1} showQuickJumper showSizeChanger pageSize={pageSizeUser} onShowSizeChange={(current, pageSize) => {this.setState({pageSizeUser:pageSize})}} pageSizeOptions={['10', '20', '50', '100']} total={totalElements} onChange={(page, pageSize) => {this.fetchStudents(page - 1, pageSize)}} />
        
          <br />
          <br />
          <br />
          <br />
          <br />


          <Footer totalStudents={totalStudents} handleAddStudentClickEvent={this.openAddStudentModalVisible}></Footer>
             
          </Container>
      )
    }

    return <h1>No Students Found</h1>;
  }
}

export default App;
