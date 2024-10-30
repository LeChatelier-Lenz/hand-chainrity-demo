import { useState} from "react";
import { CampaignType, OutletContext } from "../types/interfaces";
import CssBaseline from '@mui/material/CssBaseline';

import { HandChainrityContract, web3 } from "../utils/contracts";
import { fetchCampaigns } from "../actions/campaign";
import { useOutletContext } from "react-router-dom";
// import getBlogTheme from '../theme/getBlogTheme';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Container
} from "@mui/material";
import React from "react";

export default function Launch() {
  const { account } = useOutletContext<OutletContext>();
  const [formData, setFormData] = useState<CampaignType>({
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

  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "deadline" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const targetValue = web3.utils.toWei(formData.target.toString(), "ether");
      const ddlTimestamp = Math.floor(formData.deadline.getTime() / 1000);

      await HandChainrityContract.methods
        .createCampaign(formData.description, targetValue, ddlTimestamp, formData.beneficiary)
        .send({ from: account });

      alert("提交成功！");
      setFormData({
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

  const getCampaigns = async () => {
    await fetchCampaigns(setCampaigns);
  };

  return (
    
    <div>
    <CssBaseline enableColorScheme />
    <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
    <Box 
      sx={{ 
        
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: 2, 
        mt: 4,
        backgroundColor: 'background.default',
          

      }}
    >
      <Typography variant="h4">Launch Campaign</Typography>
      <Typography>Account: {account}</Typography>

      <Paper sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              name="title"
              variant="standard"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              variant="standard"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Details"
              name="details"
              variant="standard"
              value={formData.details}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Target (ETH)"
              name="target"
              variant="standard"
              type="number"
              value={formData.target}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              variant="standard"
              value={formData.deadline.toISOString().split("T")[0]}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Beneficiary"
              name="beneficiary"
              variant="standard"
              value={formData.beneficiary}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Launch
            </Button>
          </Box>
        </form>
      </Paper>

      <Button variant="outlined" onClick={getCampaigns}>
        List Campaigns
      </Button>

      <List sx={{ width: "100%", maxWidth: 600 }}>
        {campaigns.map((campaign) => (
          <Paper key={campaign.id} sx={{ mb: 2, p: 2 }}>
            <ListItem>
              <ListItemText
                primary={`ID: ${campaign.id} - ${campaign.title}`}
                secondary={
                  <>
                    <p>Description: {campaign.description}</p>
                    <p>Details: {campaign.details}</p>
                    <p>Target: {campaign.target} ETH</p>
                    <p>Current: {campaign.current} ETH</p>
                    <p>CreatedAt: {campaign.createdAt.toISOString().split("T")[0]}</p>
                    <p>Deadline: {campaign.deadline.toISOString().split("T")[0]}</p>
                    <p>Beneficiary: {campaign.beneficiary}</p>
                    <p>Launcher: {campaign.launcher}</p>
                    <p>Status: {campaign.status}</p>
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
    </Container>
    </div>
    
  );
}
