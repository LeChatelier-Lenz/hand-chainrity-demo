// HandChainrity module 部署脚本
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HandChainrity = buildModule("HandChainrityModule", (m) => {
    // account 0 是部署者，account 1 是第三方公证机构
    const thirdparty = m.getAccount(1);
    const HandChainrity = m.contract("HandChainrity", []);
    // 初始设置一个第三方公证机构
    m.call(HandChainrity,"setNewThirdParty", [thirdparty]);
    return { HandChainrity };
});
export default HandChainrity;
