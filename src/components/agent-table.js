import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, message, Rate } from 'antd';
import moment from 'moment';
import {EditTwoTone, DeleteTwoTone} from '@ant-design/icons'

import { useDispatch } from "react-redux";
import { getAgentList, updateAgent, deleteAgent} from "../actions/agentActions";

// Setup a row to table
const AgentDetailCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber min = "0" /> : <Input />;
  return (
    <td {...restProps} key="id">
      {editing ? (
          <span>
            {
            (dataIndex === 'email') ?
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid email!',
                    },
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
            >
            {inputNode}
            </Form.Item>
            :
            (dataIndex === 'reviews') ?
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
            >
            <Rate value={record.reviews}></Rate>
            </Form.Item>
            :
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                    required: true,
                    message: `Please Input ${title}!`,
                    },
                ]}
                >
                {inputNode}
            </Form.Item>
          }
        </span>
            
      ) : (
        children
      )}
    </td>
  );
};

// Create a AgentTable component
const AgentTable = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [agentId, setAgentId] = useState(null);

    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalRecords, setTotalRecords] = useState(0)

    const dispatch = useDispatch();

    // using useEffect to get data at the first time
    useEffect(()=>{
      // set loading icon
      setLoading(true)
      // getting data for table
      getAllAgents(page, pageSize)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

     // call api to get list of agents
    const getAllAgents = (pageNumber, pageSize)=>{
        dispatch(getAgentList(pageNumber, pageSize))
        .then(response=>{
          // set datasource to table
          setDataSource(response.data)
          // set page number
          setPage(response.pageNumber)
          // set page size
          setPageSize(response.pageSize)
          // set total pages
          setTotalRecords(response.totalRecords)
        })
        .catch(err=>{console.log(err)})
        .finally(()=>{setLoading(false)})
    }

  // check editing row  
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        id: '',
        name: '',
        email: '',
        totalProjectsDelivered: '',
        reviews:'',
        joinedDate:'',
        ...record,
    });
    setEditingKey(record.id);
  };

  // Reset editing row
  const cancel = () => {
    setEditingKey('');
  };

  // For event save click to update an agent
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        saveUpdate(newData[index])
        setEditingKey('');
      } else {
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // For updating an agent into db.
  const saveUpdate =(updateData)=>{
    // seting loading icon
    setLoading(true)
    // dispatch a update function to update db
    dispatch(updateAgent(updateData))
    .then(response=>
    {
        if(response.succeeded === true){
            message.success("Updated successfully.");
            // Reload data for table
            getAllAgents(page, pageSize);
        }
        else{
            message.error("Updated unsuccessfully.");
        }
    })
    .catch(err =>{
        console.log(err);
        message.error("Something went wrong.");
    })
    .finally(()=>{setLoading(false)})
  }

  // For deleting. Call api to delete data from DB
  const confirmDelete = (e)=> {
      // seting loading icon
      setLoading(true)
      // dispatch a delete function to datele data from db
      dispatch(deleteAgent(agentId))
      .then(response=>
      {
          if(response.succeeded === true){
              message.success("Deleted successfully.");
              // Reload data for table
              getAllAgents(page, pageSize);
          }
          else{
              message.error("Deleted unsuccessfully.");
          }
      })
      .catch(err =>{
          console.log(err);
          message.error("Something went wrong.");
      })
      .finally(()=>{setLoading(false)})
  }

  // Set columns to table
  const columns = [
    {
        key:"1",
        title:"Name",
        dataIndex:"name",
        editable:true
    },
    {
        key:"2",
        title:"Email",
        dataIndex:"email",
        editable:true
    },
    {
        key:"3",
        title:"Total Delivered Projects",
        dataIndex:"totalProjectsDelivered",
        editable:true
    },
    {
        key:"4",
        title:"Reviews",
        dataIndex:"reviews",
          render:(reviews)=>{
            return <Rate value={reviews}></Rate>
        }, 
        editable:true
    },
    {
        key:"5",
        title:"Joined Date",
        dataIndex:"joinedDate",
       render:(joinedDate)=>{
            const date = moment(new Date(joinedDate));
            return date.format("DD-MMM-YYYY")
       },
    },
    {
        key:"6",
        title: 'Action',
        dataIndex: 'operation',
        render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            {/* eslint-disable-next-line */}
            <a href="#" className="agent-block-save"
              onClick={() => save(record.id)}
            >
              Save
            </a>
            <Popconfirm title="Are you sure to cancel?" onConfirm={cancel}>
              {/* eslint-disable-next-line */}
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit <EditTwoTone />
            </Typography.Link>

            <Popconfirm
            title="Are you sure to delete this agent?"
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No">
            {/* eslint-disable-next-line */}
            <a href="#" style={{padding:10}}>Delete <DeleteTwoTone/></a>
            </Popconfirm>
            </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: (col.dataIndex === 'reviews' || col.dataIndex === 'totalProjectsDelivered') ? 
                    'number' : (col.dataIndex === 'email') ? 'email' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

// Render a table
  return (
    <div id="table" className="block agent-block">
    <div className="container-fluid">
    <div className="titleHolder">
      <h3>Agent List</h3>
      <p>Showing all agents infomation on table.</p>
    </div>
    <Form form={form} component={false}>
      <Table
      rowKey="id"
        components={{
          body: {
            cell: AgentDetailCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
            current:page,
            pageSize:pageSize,
            total:totalRecords,
            onChange:(pageNumber, pageSize) =>{
                // setting loading icon
                setLoading(true);
                // setting page number
                setPage(pageNumber);
                // setting page size
                setPageSize(pageSize)
                //get data with page number and page size
                getAllAgents(pageNumber, pageSize)
            }
        }}
        loading={loading}
        onRow={rowData => ({
            onClick: () => {setAgentId(rowData.id); }          
        })}
      />
    </Form>
    </div>
    </div>
  );
};

export default AgentTable