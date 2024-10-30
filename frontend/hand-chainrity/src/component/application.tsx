import { CssBaseline, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useState } from "react";
import { ApplicationProps } from "../types/interfaces";

export default function Application() {
    const [formData, setFormData] = useState<ApplicationProps>({
        id: 0,
        address: "",
        name: "",
        idCard: "",
        phone: "",
        description: "",
        details: "",
        createdAt: new Date(),
        status: ""
    });
    const [applications, setApplications] = useState<ApplicationProps[]>([]);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    
    const getCampaigns = async () => {
        
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("当前的change:",e);
        const { name, value } = e.target;
        // console.log("name和value:",name,value);
        console.log("formData:",formData);
    
        setFormData((prevData) => ({      
          ...prevData,
          [name]: name === "deadline" ? new Date(value) : value,
        }));
      };
      
    return (
        <div style={{ margin: '-20px' }}>
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
                <Typography variant="h4">申请信息</Typography>
          
                <Paper sx={{ p: 4, width: "100%", maxWidth: 600 }}>
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <TextField
                        label="真实姓名"
                        name="name"
                        variant="standard"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="身份证"
                        name="idCard"
                        variant="standard"
                        value={formData.idCard}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="电话号码"
                        name="phone"
                        variant="standard"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="描述"
                        name="description"
                        variant="standard"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="详情"
                        name="details"
                        variant="standard"
                        value={formData.details}
                        onChange={handleChange}
                        fullWidth
                      />
                      
                      <Button type="submit" variant="contained" color="primary">
                        提交申请
                      </Button>
                    </Box>
                  </form>
                </Paper>
          
                
          
                <List sx={{ width: "100%", maxWidth: 600 }}>
                  {applications.map((application) => (
                    <Paper key={application.id} sx={{ mb: 2, p: 2 }}>
                      <ListItem>
                        <ListItemText
                          primary={`ID: ${application.id} - ${application.title}`}
                          secondary={
                            <>
                              <p>Description: {application.description}</p>
                              <p>Details: {application.details}</p>
                              <p>Target: {application.target} ETH</p>
                              <p>Current: {application.current} ETH</p>
                              <p>CreatedAt: {application.createdAt.toISOString().split("T")[0]}</p>
                              <p>Deadline: {application.deadline.toISOString().split("T")[0]}</p>
                              <p>Beneficiary: {application.beneficiary}</p>
                              <p>Launcher: {application.launcher}</p>
                              <p>Status: {application.status}</p>
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
    )
}