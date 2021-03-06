import React from 'react';
import { Form, Input, Button, DatePicker, Rate, InputNumber, Card, message } from 'antd';
import { useDispatch } from "react-redux";
import { createAgent } from "../actions/agentActions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// Setup agent form for adding
const AgentForm = () => {
  const [form] = Form.useForm();
    
    const dispatch = useDispatch();
    // Create an new agent is submitted
    const onFinish = (newAgent) => {
      //Dispatch a create new agent to add data to db
        dispatch(createAgent(newAgent))
        .then(response=>
        {
            if(response.succeeded === true){
                message.success("Added successfully.", 2);
            }
            else{
                message.error("Added unsuccessfully.", 2);
            }
        })
        .catch(err =>{
            console.log(err);
            message.error("Something went wrong.", 2);
        });
      };

    // Resrt all fields
    const onReset = () => {
      form.resetFields();
    };

    // Render form
    return (
      <div id="agent" className="block agent-block">
      <div className="container-fluid">
        <div className="titleHolder">
          <h3>Add Agent Form</h3>
          <p>Saving agent infomation to system.</p>
        </div>
    <Card size="small">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
            label="Agent Name"
            name="Name"
            rules={[
              { 
                required: true,
                message: 'Please enter your agent name!' 
              }]
            }
        >
            <Input placeholder="Agent name" allowClear />
        </Form.Item>

        <Form.Item
            label="Email Address"
            name="Email"
            rules={[
                {
                type: 'email',
                message: 'The input is not valid email!',
                },
                {
                required: true,
                message: 'Please input your email!',
                },
            ]}
        >
            <Input placeholder="Email Address" allowClear />
        </Form.Item>
        
        <Form.Item
            label="Total Projects Delivered"
            name="TotalProjectsDelivered"
            rules={[
                { 
                required: true,
                message: 'Please enter your agent name!' 
                }]
            }
        >
            <InputNumber min="0" />
        </Form.Item>

        <Form.Item
            label="Reviews"
            name="Reviews"
            rules={[
                { 
                required: true,
                message: 'Please select star(s) to review!' 
                }]
            }
        >
            <Rate />
        </Form.Item>
        
        <Form.Item 
            label="Joined Date"
            name="JoinedDate" 
            rules={[
                {
                required: true,
                message: 'Please select a joined date',
                },
            ]}
        >
            <DatePicker picker="date" ></DatePicker>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            <Button htmlType="button" onClick={onReset} style={{margin:'0 8px'}}>
            Reset
            </Button>
        </Form.Item>
    </Form>
  </Card>
  </div>
  </div>
  );
};

export default AgentForm