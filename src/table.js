import React,{useState,useEffect} from 'react';
import { Table, Row, Col,Popconfirm,Button} from 'antd';
import {connect} from "react-redux";



const Users = (props) => {
    const {list,handleUpdate,handleDelete} = props;
    const [data1,setData1] = useState([])
    useEffect(()=>{
        setData1(list)
    },[list])

    const columns = [
        {
            title: 'First Name',
            key: 'firstName',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            key: 'lastName',
            dataIndex: 'lastName',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Age',
            key: 'age',
            dataIndex: 'age',
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text, record,index) => (
                <div>
                    <Popconfirm title="Are you sure to Update？"  style={{ color: 'red' }} onConfirm={()=> {handleUpdate(index)}} >
                        <Button className="btn btn-outline-primary btn-mini"  >Edit</Button>
                    </Popconfirm>
                    &nbsp;&nbsp;
                    <Popconfirm title="Are you sure to Delete？"   onConfirm={()=> {handleDelete(record.id)}} >
                        <Button className="btn btn-outline-danger btn-mini"  >Delete</Button>
                    </Popconfirm>
                </div>
            )
        },
    ]
    return (
        <>

            <h3>Users Details</h3>
            <Row>
                <Col span={4}> </Col>
                <Col span={16}>
                    <Table
                        columns={columns}
                        dataSource={data1 || []}
                        pagination={{pageSize: 5}}/>
                </Col>
                <Col/>
            </Row>
        </>
    );
}
    const mapStateProps = (state) => {
        return {
            list:state.Data
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {

            }
        }

export default connect(mapStateProps,mapDispatchToProps)(Users);