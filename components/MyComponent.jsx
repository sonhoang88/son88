import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import axios from 'axios';
import './MyComponent.css';

const schema = {
  title: 'Lưu trữ dữ liệu góc trên DB',
  type: 'object',
  required: ['number'],
  properties: {
    number:{type:'number', title: 'Nhập góc:' }
  },
};

const uiSchema = {
  'ui:title': (
    <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
      Lưu trữ dữ liệu góc trên DB
    </div>
  ),
  number: {
    'ui:widget': 'text',
    'ui:options': { classNames: 'custom-input' },
  },
};

const MyComponent = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async ({ formData }) => {
    try {
      console.log('Dữ liệu gửi đi:', formData);

      // Gửi dữ liệu đến endpoint
      const response = await axios.post(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-qkzjg/endpoint/post123',
        formData
      );

      console.log('Kết quả từ server:', response.data);

      // Reset form sau khi submit thành công
      setFormData({});
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <Form
        schema={schema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
        uiSchema={uiSchema}
      />
    </div>
  );
};

export default MyComponent;
