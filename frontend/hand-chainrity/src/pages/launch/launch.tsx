import React from 'react';
import { AppBar, Button, Container, CssBaseline, Link, Paper, Step, StepLabel, Stepper, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddressForm from './FillSheet';
import PaymentForm from './Check';
import Review from './Review';
import { CampaignType, OutletContext } from '../../types/interfaces';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { HandChainrityContract,web3 } from '../../utils/contracts';
import FillSheet from './FillSheet';
import Check from './Check';
import Footer from '../campaign/components/Footer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme:any) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['填写筹款活动信息', '验证受益人身份', '最终确认'];



export default function Launch() {
  const [beneficiaryCheck, setBeneficiaryCheck] = React.useState(false);
  const { account } = useOutletContext<OutletContext>();
  const [rootFormData, setRootFormData] = useState({
    id: 0,
    title: "",
    details: "",
    description: "",
    target: 0,
    current: 0,
    createdAt: new Date(),
    deadline: new Date(),
    beneficiary: "",
    launcher: "",
    status: ""
  });

  const handleSubmit = async () => {
    try {
      const targetValue = web3.utils.toWei(rootFormData.target.toString(), "ether");
      const ddlTimestamp = Math.floor(rootFormData.deadline.getTime() / 1000);

      await HandChainrityContract.methods
        .createCampaign(rootFormData.description, targetValue, ddlTimestamp, rootFormData.beneficiary)
        .send({ from: account });

      alert("提交成功！");
      setRootFormData({
        id: 0,
        title: "",
        description: "",
        details: "",
        target: 0,
        current: 0,
        createdAt: new Date(),
        deadline: new Date(),
        beneficiary: "",
        launcher: "",
        status: ""
      });
    } catch (err) {
      console.error("提交失败:", err);
      alert("提交失败，请重试");
    }
  };

  function getStepContent(step:any) {
  
    switch (step) {
      case 0:
        return <FillSheet onHandleAddress={setRootFormData} rootFormData={rootFormData} />;
      case 1:
        return <Check beneficiary={rootFormData.beneficiary} setState={setBeneficiaryCheck} />;
      case 2:
        return <Review rootFormData={rootFormData} account={account} />;
      default:
        throw new Error('Unknown step');
    }
  }

  

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = ( )=> {
    if(activeStep < 2){
      setActiveStep(activeStep + 1);
      return;
    }else{
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >
        <div>
          <Typography variant="h1" gutterBottom>
            Start a Raising Campaign
          </Typography>
          <Typography>Fill the Sheet Below Now!</Typography>
        </div>
        <Container sx={{ py: 2 }} maxWidth="md">
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                发起筹款活动
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      感谢你为善心出力！
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          上一步
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleNext}
                        className={classes.button}
                        disabled={(activeStep === 0 && rootFormData.beneficiary.length === 0 )}
                          // ||(activeStep ===1 && beneficiaryCheck === false)}
                      >
                        {activeStep === steps.length - 1 ? '确认申请' : '下一步'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </Container>
          
      </Container>
      <Footer />
    </>
  );
}
