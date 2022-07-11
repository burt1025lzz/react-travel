import React, {useEffect} from 'react'
import styles from './LoginForm.module.scss'
import {Button, Checkbox, Form, Input} from 'antd';
import {login} from "../../redux/user/slice";
import {useDispatch} from "react-redux";
import {useSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";

export const LoginForm: React.FC = () => {
  const loading = useSelector(state => state.user.loading)
  const jwt = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    jwt && navigate('/')
  }, [jwt])

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch<any>(login({
      email: values.username,
      password: values.password
    }))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.login__form}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
