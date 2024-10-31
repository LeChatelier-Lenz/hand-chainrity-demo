import React from 'react';
import { Typography,Grid ,TextField,FormControlLabel ,Checkbox, Button, List, ListItem, ListItemText, Paper, Card} from '@mui/material';
import { toBeEnabled } from '@testing-library/jest-dom/matchers';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';

export default function Check({beneficiary,setState}:{beneficiary:string,setState:any}) {  
  const [beneficiaryCheck, setBeneficiaryCheck] = React.useState(false);
  const [isClick, setIsClick] = React.useState(false);
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888', // 设置基础 URL
    timeout: 10000,                    // 可选：请求超时时间
  });

  const handleCheck = async () => {
    setIsClick(true);
    if(beneficiary.length === 0)
    {
       alert("请填写受益人地址"); 
    }
    else{
      try{
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo') || '{}').token
          },
        };
        const res = await axiosInstance.get(
          '/api/users/'+beneficiary,
          config
        );
        if (res.data === 'beneficiary') {
          setBeneficiaryCheck(true);
          setState(true);
        } else {
          setBeneficiaryCheck(false);
          setState(false);
        }
    }
    catch(err){
        setBeneficiaryCheck(false);
        //setState(false);
    }
    }
    //调用后端接口验证受益人身份

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        验证受益人身份
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <TextField 
            required
            disabled
            id="address"
            name="address"
            label="受益人钱包地址"
            fullWidth
            value={beneficiary}
            variant="standard"
          />
        </Grid>
        { (isClick && beneficiary.length !== 0)?(
          <Grid item xs={12} md={3}>
            {beneficiaryCheck?(
            <Card variant="outlined" sx={{maxHeight:"60px",maxWidth:"130px",display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
              <Typography variant="body1" gutterBottom> 
                验证成功
              </Typography>
              <CheckBoxIcon/>
            </Card>
            ):(
            <Card variant="outlined" sx={{maxHeight:"60px",maxWidth:"130px",display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
              <Typography variant="body1" gutterBottom>
                验证失败
              </Typography>
              <ErrorIcon/>
            </Card>
            )}
          </Grid>
        ) : (
          <></>
        )}

        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" onClick={handleCheck} >
            获取受益人信息
          </Button>
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="我已确认受益人身份"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
