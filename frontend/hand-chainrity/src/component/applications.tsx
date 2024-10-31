import React, { useEffect, useState } from "react";
import { CssBaseline, Typography, Container, Card, CardContent, Button, Box, CardActions } from "@mui/material";
import axios, { AxiosError } from "axios";
import { ApplicationProps } from "../types/interfaces";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 10000,
});

export default function Applications() {
    const [applications, setApplications] = useState<ApplicationProps[]>([]);

    const fetchApplications = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo') || '{}').token
                },
            };

            const res = await axiosInstance.get('/api/application/list/1', config);
            setApplications(res.data); // 假设返回的数据是申请数组
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage: string =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message;
            console.error(errorMessage);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo') || '{}').token
                },
            };

            await axiosInstance.post(`/api/application/approve/${id}`, {}, config);
            // 从申请列表中删除已批准的申请
            setApplications((prevApps) => prevApps.filter(app => app.id !== id));
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage: string =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message;
            console.error(errorMessage);
        }
    };

    const handleReject = async (id: number) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo') || '{}').token
                },
            };

            await axiosInstance.post(`/api/application/reject/${id}`, {}, config);
            // 从申请列表中删除已拒绝的申请
            setApplications((prevApps) => prevApps.filter(app => app.id !== id));
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            const errorMessage: string =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message;
            console.error(errorMessage);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div style={{ margin: '-20px' }}>
            <CssBaseline />
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
                <Typography variant="h4" gutterBottom>申请列表</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {applications.map((application) => (
                        <Card key={application.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{application.name}</Typography>
                                <Typography variant="body2">身份证: {application.idCard}</Typography>
                                <Typography variant="body2">电话: {application.phone}</Typography>
                                <Typography variant="body2">描述: {application.description}</Typography>
                                <Typography variant="body2">详情: {application.details}</Typography>
                                <Typography variant="body2">状态: {application.status}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="success" onClick={() => handleApprove(application.id)}>
                                    批准
                                </Button>
                                <Button size="small" color="error" onClick={() => handleReject(application.id)}>
                                    拒绝
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Container>
        </div>
    );
}
