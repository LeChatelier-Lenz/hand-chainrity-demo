import { Box, Container, CssBaseline, Divider, Paper, Typography } from "@mui/material";
import { ReactComponent as MySvg } from '../../asset/HandChainrity.svg';
import { useEffect } from "react";

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div>
            <CssBaseline enableColorScheme />
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "flex-end", gap: 4 }}>
                    <div>
                        <Typography variant="h2" gutterBottom>
                            About <b>Us</b> 
                            <br />| 关于我们
                        </Typography>
                        <Divider />
                        <Typography>
                            Anything about HandChainrity -- Hand in hand through the chain.
                            <br />关于手链筹的一切 -- 手牵手，心链心。
                        </Typography>
                    </div>
                    <Box style={{ height: 200, width: 500, marginRight: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'start' }}>
                        <MySvg style={{ height: 150, width: 1000 }} />
                    </Box>
                </Box>
                <Paper sx={{ p: 4, gap: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h4" gutterBottom>
                        项目介绍：HandChainrity - 手链筹
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        在当前的社会环境中，公益筹款逐渐成为一种重要的支持形式。然而，传统的筹款方式往往存在透明度不足、资金去向不明等问题，影响了公众的信任和参与意愿。为了解决这些问题，我们推出了“手链筹”——一个基于区块链技术的创新应用，旨在通过区块链的透明性和不可篡改性，确保筹款过程的真实性和可靠性。
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        核心功能
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        1. 透明的资金流动：所有的筹款活动和资金流动都将在区块链上进行记录，任何人都可以实时查看资金的来源和去向，确保每一笔资金的使用都清晰可查。
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        2. 智能合约管理：使用智能合约来自动化筹款流程，设定资金使用的条件和规则，确保资金仅在满足特定条件后才能被使用，从而减少人为干预的可能性。
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        3. 用户友好的界面：提供简洁易用的界面，用户可以方便地创建、参与和管理筹款项目。
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        4. 多元化的筹款方式：支持多种筹款方式，以满足不同用户的需求。
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        5. 社区互动与反馈：建立一个活跃的社区平台，用户可以在此交流经验、分享故事、反馈项目进展。
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        技术优势
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        - 区块链技术：利用区块链的去中心化特性，确保数据的安全性和透明性。
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        - 可扩展性：系统架构设计灵活，能够根据需要快速扩展新的功能和服务。
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        - 数据隐私保护：采用先进的加密技术，保障用户的个人信息和交易数据的安全。
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        目标愿景
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        “手链筹”致力于为公益筹款提供一个安全、透明、高效的平台，让每一位参与者都能对自己的捐赠产生信心。同时，我们希望通过区块链技术推动社会公益事业的发展，让更多人参与到慈善行动中来，共同创造一个更加美好的未来。
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        结语
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        我们相信，通过“手链筹”，每一笔善款都能被妥善使用，每一个人的爱心都能被真实记录。期待与您携手，共同推动公益事业的创新与发展！
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        联系我们
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        如果您有任何疑问或建议，欢迎随时联系我们！    
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        邮箱: lechate0222@gmail.com
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        手机: 15356629682
                    </Typography>
                </Paper>
            </Container>
        </div>
    )
}
