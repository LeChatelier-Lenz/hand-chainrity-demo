import React from 'react';
import { Typography , List , ListItem, ListItemText,Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
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