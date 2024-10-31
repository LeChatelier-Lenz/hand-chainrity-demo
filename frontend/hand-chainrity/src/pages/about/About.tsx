import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";

export default function About() {
    return (
        <div>
            <CssBaseline enableColorScheme />
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div>
                        <Typography variant="h1" gutterBottom>
                        Anything About HandCharity
                        </Typography>
                        <Typography>Charity through hand & chain</Typography>
                    </div>
                </Box>
                <Paper sx={{ p: 4 ,gap : 1 ,display:"flex",flexDirection:"column" }}>
                    <Typography variant="h6" gutterBottom>
                        HandCharity
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        HandCharity is a decentralized charity platform that is based on blockchain technology. It aims to provide a transparent and efficient charity platform for charity organizations and donors. HandCharity is a decentralized charity platform that is based on blockchain technology. It aims to provide a transparent and efficient charity platform for charity organizations and donors.
                        <br/>HandChainrity: 手链筹——基于区块链，实现透明、高效、可追溯的公益筹款，手牵手，心链心。
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Features
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        HandCharity has the following features:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        1. Transparent: All donation records are stored on the blockchain and can be viewed by anyone.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        2. Efficient: Donors can donate directly to charity organizations without the need for intermediaries.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        3. Secure: All transactions are recorded on the blockchain and cannot be tampered with.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        How it works
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        HandCharity uses smart contracts to facilitate donations between donors and charity organizations. Donors can donate to charity organizations by sending cryptocurrency to the smart contract address. The smart contract will then distribute the donations to the charity organizations based on predefined rules.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Get involved
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        If you are a charity organization or a donor who wants to get involved with HandCharity, please contact us at
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: lechate0222@gmail.com
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Phone: 15356629682
                    </Typography>
                </Paper>
            </Container>
        </div>
    )
}