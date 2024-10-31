import React from 'react';
import { Typography , List , ListItem, ListItemText,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';


const useStyles = makeStyles((theme:any) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({rootFormData,account}:{rootFormData:any,account:any}) {
  const [formData, setFormData] = React.useState(rootFormData);
  const classes = useStyles();
  const [beneficiaryName,setBeneficiaryName] = React.useState("");
  const [beneficiaryEmail,setBeneficiaryEmail] = React.useState("");
  const [beneficiaryPhone,setBeneficiaryPhone] = React.useState("");
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888', // 设置基础 URL
    timeout: 10000,                    // 可选：请求超时时间
  });
  const fetchData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo') || '{}').token
      },
    };
    try {
      const res = await axiosInstance.get(
        '/api/users/'+formData.beneficiary,
        config
      );
      setBeneficiaryName(res.data.name);
      setBeneficiaryEmail(res.data.email);
      setBeneficiaryPhone(res.data.phone);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (formData.beneficiary) {
      fetchData();
    }
  }, [formData.beneficiary]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        筹款活动概览 
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary={formData.title?formData.title:"无标题信息，请填写"} secondary={formData.description?formData.description:"无描述信息，请填写"} />
          <Typography variant="body2">--------- 活动标题</Typography>
        </ListItem>

        <ListItem className={classes.listItem}>
          <ListItemText primary={"受益人地址: "+ (formData.beneficiary ?formData.beneficiary:"无，请填写")} secondary={"发起人地址: "+account} />
          <Typography variant="body2">--------- 身份信息</Typography>
        </ListItem>

        <ListItem className={classes.listItem}>
          <ListItemText primary={"筹款目标金额: "+ (formData.target!==0?formData.target : "无金额信息，请填写")} secondary={"预设截止日期: " + (formData.deadline)} />
          <Typography variant="body2">--------- 目标信息</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="" />
          <Typography variant="subtitle1" className={classes.total}>
            请保证信息准确无误
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            受益人信息
          </Typography>
          <Typography gutterBottom>{"姓名: "+beneficiaryName}</Typography>
          <Typography gutterBottom>{"电话: "+beneficiaryPhone}</Typography>
          <Typography gutterBottom>{"邮箱: "+beneficiaryEmail}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            注意事项
          </Typography>
          <Typography variant="body2" gutterBottom className={classes.title} color="textDisabled">
            您的信息如何保存
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>交易明细信息</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>上链</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>活动详情描述</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>数据库存储</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>受益人隐私信息</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>数据库存储</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
