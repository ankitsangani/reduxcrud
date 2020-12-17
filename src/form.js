import React,{useState,useEffect} from 'react'
import {DeleteData, UpdateData, UserData} from "./Redux/formRedux/formAction";
import {Row, Col, Card, Form,Input,Radio,InputNumber, Button} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import Users from "./table";


const FormRedux = (props) => {
    const {list,dispatch} = props
    const [editedIndex,setIndex] = useState(null)
    const [errors,setError] = useState({});
    const [data, setData] = useState([]);
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        password: "",
    });
    useEffect(()=>{
            setData(list)
    },[data,list])
    const handleUpdate = (index) => {
        setUserDetail(list[index])
        setIndex(index)
    }
    const handleDelete =(id)=>{
        dispatch(DeleteData(id))
    }
    const validation = (name,value) => {
        const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ig;
        switch (name) {
            case 'firstName':
                if (!value) {
                    return "Please Enter First Name!!";
                } else {
                    return  "";
                }
            case 'lastName':
                if (!value) {
                    return "please Enter Last Name!!";
                }else {
                    return "";
                }
            case 'email':
                if(!emailRegx.test(value)) {
                    return "please Enter valid email";
                }else {
                    return "";
                }
            case 'age':
                if(isNaN(value)||value<1||value>100) {
                    return "please enter valid age";
                }
                else {
                    return "";
                }
            case 'gender':
                if(!value) {
                    return "please Select Gender";
                }
                else {
                    return "";
                }
            case 'password':
                if (!value) {
                    return "Please Enter Valid Password";
                }
                else {
                    return "";
                }
        }
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    }
    const submit = () => {
        let allErrors = {};
        const userData = {
            firstName:userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email,
            age: userDetail.age,
            gender: userDetail.gender,
            password:userDetail.password
        }
        Object.keys(userData).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error;
            }
        })
        if (Object.keys(allErrors).length) {
            return setError(allErrors)

        } else {
            if (editedIndex !== null) {
                dispatch(UpdateData(userDetail))
                setIndex(null)
                setUserDetail({});
            }else {
                userDetail.id = data.length+1;
                dispatch(UserData(userDetail))
                setIndex(null)
                setUserDetail({});
            }
        }
        setError({})
    }
    return(
        <>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Card className="cardtop">
                        <h1 className="h2login">Register</h1>
                        <p><b>Create your account</b></p>
                        <Form>
                            <Form.Item>
                                <Input name="firstName" value={userDetail.firstName} onChange={handleChange}
                                       placeholder="Enter Your FirstName" addonBefore={<UserOutlined/>}/>
                                <span className="validation">{errors.firstName}</span>
                            </Form.Item>
                            <Form.Item>
                                <Input name="lastName" value={userDetail.lastName} onChange={handleChange}
                                       placeholder="Enter Your Lastname" addonBefore={<UserOutlined/>}/>
                                <span className="validation">{errors.lastName}</span>
                            </Form.Item>
                            <Form.Item>
                                <Input name="email" value={userDetail.email} onChange={handleChange}
                                       placeholder="Enter Your Email" addonBefore={<MailOutlined/>}/>
                                <span className="validation">{errors.email}</span>
                            </Form.Item>
                            <label>Gender: &nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <Form.Item>
                                <Radio.Group
                                    onChange={e => handleChange({target: {name: "gender", value: e.target.value}})}
                                    value={userDetail.gender}
                                >
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                                <span className="validation">{errors.gender}</span>
                            </Form.Item>
                            <Form.Item label="age">
                                <InputNumber placeholder="age" name="age"
                                             onChange={value => handleChange({target: {name: "age", value}})}
                                             value={userDetail.age || ""}
                                />
                                <span className="validation">{errors.age}</span>
                            </Form.Item>

                                    <Form.Item
                                    >
                                        <Input.Password id="password" name="password" value={userDetail.password} onChange={handleChange}
                                                        addonBefore={(< LockOutlined/>)} placeholder="Enter Your Password"/>
                                        <span className="validation">{errors.password}</span>
                                    </Form.Item>

                            <Form.Item>
                                <Button className="btn-md buttonsubmitlogin" onClick={submit} htmlType="submit"
                                        type="primary"
                                        size={"large"}>
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}/>
            </Row>
            <Users handleUpdate={handleUpdate} handleDelete={handleDelete} />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        list: state.Data
    }
}


export default connect(mapStateToProps)(FormRedux);