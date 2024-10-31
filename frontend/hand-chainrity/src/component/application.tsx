import { CssBaseline, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useState } from "react";
import { ApplicationProps } from "../types/interfaces";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888', // 设置基础 URL
    timeout: 10000,                    // 可选：请求超时时间
  });

export default function Application() {
    // const [formData, setFormData] = useState<ApplicationProps>({
    //     id: 0,
    //     address: "",
    //     name: "",
    //     idCard: "",
    //     phone: "",
    //     description: "",
    //     details: "",
    //     createdAt: new Date(),
    //     status: ""
    // });
    const [application, setApplication] = useState<ApplicationProps>({
        id: 0,
        address: "",
        name: "",
        idCard: "",
        phone: "",
        description: "",
        details: "",
        createdAt: new Date(),
        status: ""
    }

    );

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const config = {
              headers: {
                'Content-Type': 'application/json', // 修改为 JSON 格式
                'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo') || '{}').token
              },
            };
        
            // 直接创建 JSON 对象
            const requestData = {
                name: application.name,
                address: application.address,
                idCard: application.idCard,
                phone: application.phone,
                description: application.description,
                details: application.details,
                createdAt: new Date(),
            };
        
            const res = await axiosInstance.post('/api/application', requestData, config);
            console.log(res.data); // 确保只打印数据部分
            
            // 清空表单数据
            setApplication({
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
        
          } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage: string =
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        
            // 处理错误消息
            console.error(errorMessage);
          }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("当前的change:",e);
        const { name, value } = e.target;
        // console.log("name和value:",name,value);
        console.log("application:",application);
    
        setApplication((prevData) => ({      
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
                        value={application.name}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="身份证"
                        name="idCard"
                        variant="standard"
                        value={application.idCard}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="电话号码"
                        name="phone"
                        variant="standard"
                        value={application.phone}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="描述"
                        name="description"
                        variant="standard"
                        value={application.description}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="详情"
                        name="details"
                        variant="standard"
                        value={application.details}
                        onChange={handleChange}
                        fullWidth
                      />
                      
                      <Button type="submit" variant="contained" color="primary">
                        提交申请
                      </Button>
                    </Box>
                  </form>
                </Paper>
          
                
          
                
              </Box>
              </Container>
              </div>
    )
}