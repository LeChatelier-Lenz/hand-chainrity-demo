import { Checkbox, FormControlLabel, TextField, Grid,Typography, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { CampaignType } from '../../types/interfaces';

export default function FillSheet({onHandleAddress,rootFormData}:{onHandleAddress:any,rootFormData:CampaignType}) { 
  const [formData, setFormData] = useState(rootFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("当前的change:",e);
    const { name, value } = e.target;
    console.log("name和value:",name,value);

    const new_formData = {      ...formData,
      [name]: name === "deadline" ? new Date(value) : value,}
    console.log("new_formData:",formData);

    setFormData(new_formData);
    onHandleAddress(formData);
  };



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom >
        填写筹款活动信息
      </Typography>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            label="活动标题"
            fullWidth
            autoComplete="title"
            onChange={handleChange}
            value={formData.title}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="beneficiary"
            name="beneficiary"
            label="受益人地址"
            fullWidth
            autoComplete="beneficiary"
            onChange={handleChange}
            value={formData.beneficiary}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            // label="Description"
            label="活动概述"
            fullWidth
            autoComplete="description"
            onChange={handleChange}
            value={formData.description}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="details"
            name="details"
            // label="Details"
            label="活动具体详情"
            type="text"
            fullWidth
            autoComplete="details"
            onChange={handleChange}
            value={formData.details}
            variant="standard"  
            // multiline
            // rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="target"
            name="target"
            label="目标筹款金额"
            fullWidth
            type="number"
            autoComplete="target"
            onChange={handleChange}
            value={formData.target}
            variant="standard"
            slotProps={{
              input:{
                startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
              }}
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="deadline"
            name="deadline"
            // label="Deadline"
            label="截止日期"
            type="date"
            fullWidth
            autoComplete="deadline"
            onChange={handleChange}
            value={formData.deadline.toISOString().split("T")[0]}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          {/* 上传文件 */}
          <Typography variant="h6" gutterBottom>
            相关证明文件
          </Typography>
          <input type="file" id="file" name="file" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="同意保存信息到链上"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
