import { web3, HandChainrityContract } from '../utils/contracts';
import { CampaignType, Status } from '../types/interfaces';


/**
 * 获取区块链上所有状态的活动列表
 * @param setState 对应campaign list[活动列表]更改状态的函数
 */
export const fetchCampaigns = async(setState:any) => {
    if(HandChainrityContract){
        try{
          const newCampaigns:CampaignType[] = [];
          const campaignCount:number = await HandChainrityContract.methods.campaignCount().call();
          // console.log(campaignCount)
          for (let i = 1; i <= Number(campaignCount); i++) {
            const new_campaign:any = await HandChainrityContract.methods.campaigns(i).call();
            // console.log(new_campaign);
            newCampaigns.push({
              id: Number(new_campaign.hcuId),
              title: "Need To Load from Backend",
              description: new_campaign.description,
              details: "Need To Load from Backend",
              target: Number(web3.utils.fromWei(new_campaign.targetAmount,'ether')),
              current: Number(new_campaign.currentAmount),
              createdAt: new Date(Number(new_campaign.createdAt)*1000),
              deadline: new Date(Number(new_campaign.deadline)*1000),
              beneficiary: new_campaign.beneficiary,
              launcher: new_campaign.launcher,
              status: Status[Number(new_campaign.status)]
            });
          }
          setState(newCampaigns);
          // console.log(newCampaigns);
        }catch(e:any){
          console.error(e.message);
          // alert(`活动列表获取失败:${e.message}`);
        } 
    }else{
        alert('合约未部署');
    } 
}

/**
 * 通过id获取对应的活动
 * @param id 活动id
 * @param setState 对应活动更改状态的函数
 */
export const fetchCampaignById = async(id:number,setState:any) => {
    if(HandChainrityContract){
        try{
          const campaign:any = await HandChainrityContract.methods.campaigns(id).call();
          const newCampaign:CampaignType = {
            id: Number(campaign.hcuId),
            title: "Need To Load from Backend",
            description: campaign.description,
            details: "Need To Load from Backend",
            target: Number(web3.utils.fromWei(campaign.targetAmount,'ether')),
            current: Number(campaign.currentAmount),
            createdAt: new Date(Number(campaign.createdAt)*1000),
            deadline: new Date(Number(campaign.deadline)*1000),
            beneficiary: campaign.beneficiary,
            launcher: campaign.launcher,
            status: Status[Number(campaign.status)]
          };
          setState(newCampaign);
          console.log(newCampaign);
        }catch(e:any){
          console.error(e.message);
          alert(`活动获取失败:${e.message}`);
        } 
    }else{
        alert('合约未部署');
    } 
}


/**
 * 获取区块链上所有正在筹款中的活动列表
 * @param hcuId 活动id
 * @param setState 对应campaign list[活动列表]更改状态的函数
 */
export const fetchFundraisingCampaigns = async(setState:any) => {
  if(HandChainrityContract){
      try{
        const newCampaigns:CampaignType[] = [];
        const campaignId:number[] = await HandChainrityContract.methods.getActiveCampaignIdList().call();
        // console.log(campaignCount);
        console.log(campaignId);
        if(campaignId.length === 0){
          // alert('还没有任何活动正在筹款中！');
          console.log('还没有任何活动正在筹款中！')
          return;
        }
        for (let i = 0; i < campaignId.length; i++) {
          const new_campaign:any = await HandChainrityContract.methods.campaigns(Number(campaignId[i])).call();
          // console.log(new_campaign);
          newCampaigns.push({
            id: Number(new_campaign.hcuId),
            title: "Need To Load from Backend",
            description: new_campaign.description,
            details: "Need To Load from Backend",
            target: Number(web3.utils.fromWei(new_campaign.targetAmount,'ether')),
            current: Number(new_campaign.currentAmount),
            createdAt: new Date(Number(new_campaign.createdAt)*1000),
            deadline: new Date(Number(new_campaign.deadline)*1000),
            beneficiary: new_campaign.beneficiary,
            launcher: new_campaign.launcher,
            status: Status[Number(new_campaign.status)]
          });
        }
        setState(newCampaigns);
        // console.log(newCampaigns);
      }catch(e:any){
        console.error(e.message);
        // alert(`活动列表获取失败:${e.message}`);
      } 
  }else{
      alert('合约未部署');
  } 
}


/**
 * 获取区块链上所有刚发起的活动列表
 * @param campaignId 活动id
 * @param setState 对应campaign list[活动列表]更改状态的函数
 */
export const fetchLaunchedCampaigns = async(setState:any) => {
  if(HandChainrityContract){
      try{
        const newCampaigns:CampaignType[] = [];
        const campaignId:number[] = await HandChainrityContract.methods.getLaunchedCampaignIdList().call();
        // console.log(campaignCount);
        console.log(campaignId);
        if(campaignId.length === 0){
          // alert('还没有任何活动发起！');
          console.log('还没有任何活动发起！');
          return;
        }
        for (let i = 0; i < campaignId.length; i++) {
          const new_campaign:any = await HandChainrityContract.methods.campaigns(Number(campaignId[i])).call();
          // console.log(new_campaign);
          newCampaigns.push({
            id: Number(new_campaign.hcuId),
            title: "Need To Load from Backend",
            description: new_campaign.description,
            details: "Need To Load from Backend",
            target: Number(web3.utils.fromWei(new_campaign.targetAmount,'ether')),
            current: Number(new_campaign.currentAmount),
            createdAt: new Date(Number(new_campaign.createdAt)*1000),
            deadline: new Date(Number(new_campaign.deadline)*1000),
            beneficiary: new_campaign.beneficiary,
            launcher: new_campaign.launcher,
            status: Status[Number(new_campaign.status)]
          });
        }
        setState(newCampaigns);
        // console.log(newCampaigns);
      }catch(e:any){
        console.error(e.message);
        // alert(`活动列表获取失败:${e.message}`);
      } 
  }else{
      alert('合约未部署');
  } 
}

/**
 * 根据id向已有活动捐款
 * @param campaignId 活动id
 * @param amount 捐款金额
 * @param account 用户账户（钱包地址）
 */
export const donateToCampaign = async(campaignId:number,amount:number,account:string) => {
    if(HandChainrityContract){
        try{
          const donation = await HandChainrityContract.methods.participateInCampaign(campaignId).send({from:account,value:web3.utils.toWei(amount.toString(),'ether')});
          console.log(donation);
          alert('捐款成功！');
        }catch(e:any){
          console.error(e.message);
          alert(`捐款失败:${e.message}`);
        } 
    }else{
        alert('合约未部署');
    } 
}

/**
 * 根据id结束活动
 * @param campaignId 活动id
 * @param account 用户账户（钱包地址）
 */
export const finalizeCampaign = async(campaignId:number,account:string) => {
    if(HandChainrityContract){
        try{
          const end = await HandChainrityContract.methods.finalizeCampaign(campaignId).send({from:account});
          console.log(end);
          alert('活动结束成功！');
        }catch(e:any){
          console.error(e.message);
          alert(`活动结束失败:${e.message}`);
        } 
    }else{
        alert('合约未部署');
    }
  }

/**
 * 根据id撤销活动
 * @param campaignId 活动id
 * @param account 用户账户（钱包地址）
 */
export const revokeCampaign = async(campaignId:number,account:string) => {
  if(HandChainrityContract){
      try{
        const revoke = await HandChainrityContract.methods.revokeCampaign(campaignId).send({from:account});
        console.log(revoke);
        alert('活动撤销成功！');
      }catch(e:any){
        console.error(e.message);
        alert(`活动撤销失败:${e.message}`);
      } 
  }else{
      alert('合约未部署');
  }
}

/**
 * 根据id获取活动的捐款记录
 * @param campaignId 活动id
 * @param account 用户账户（钱包地址）
 */ 


/**
 * 获取用户的活动参与列表
 * @param account 用户账户（钱包地址）
 * @param setState 对应活动更改状态的函数
 * @returns 返回用户参与的活动列表（CampaignType[]）
 */
export const fetchUserCampaigns = async(account:string,setState:any) => {
    if(HandChainrityContract){
        try{
          const newCampaigns:CampaignType[] = [];
          const campaignId:number[] = await HandChainrityContract.methods.getParticipantCampaigns(account).call();
          // console.log(campaignCount);
          console.log(campaignId);
          if(campaignId.length === 0){
            alert('您还没有参与任何活动！');
            return;
          }
          for (let i = 0; i < campaignId.length ; i++) {
            const new_campaign:any = await HandChainrityContract.methods.campaigns(Number(campaignId[i])).call();
            if(new_campaign.launcher === account){
              newCampaigns.push({
                id: Number(new_campaign.hcuId),
                title: "Need To Load from Backend",
                description: new_campaign.description,
                details: "Need To Load from Backend",
                target: Number(web3.utils.fromWei(new_campaign.targetAmount,'ether')),
                current: Number(new_campaign.currentAmount),
                createdAt: new Date(Number(new_campaign.createdAt)*1000),
                deadline: new Date(Number(new_campaign.deadline)*1000),
                beneficiary: new_campaign.beneficiary,
                launcher: new_campaign.launcher,
                status: Status[Number(new_campaign.status)]
              });
            }
          }
          setState(newCampaigns);
          // console.log(newCampaigns);
        }catch(e:any){
          console.error(e.message);
          alert(`活动列表获取失败:${e.message}`);
        } 
    }else{
        alert('合约未部署');
    } 
}


/**
 * 第三方对活动进行审核
 * @param campaignId 活动id
 * @param checkResult 审核结果
 * @return 返回审核结果
 */
export const checkCampaign = async(campaignId:number, checkResult:boolean, account:any) => {
    if(HandChainrityContract){
        try{
          const check = await HandChainrityContract.methods.approveCampaign(campaignId,checkResult).send({from:account, gas: "3000000"});
          console.log(check);
          alert('审核成功！');
          return check;
        }catch(e:any){
          console.error(e.message);
          alert(`审核失败:${e.message}`);
        } 
    }else{
        alert('合约未部署');
    }
  }


/**
 * 获取对应筹款活动的参与人数
 * @param campaignId 活动id
 * @return 返回参与人数
 */
export const getParticipantCount = async(campaignId:number) => {
  if(HandChainrityContract){
      try{
        const participants:[] = await HandChainrityContract.methods.getParticipants(campaignId).call();
        console.log(participants.length);
        return participants.length;
      }catch(e:any){
        console.error(`获取参与人数失败:${e.message}`);
        // alert(`获取参与人数失败:${e.message}`);
      }
    }else{
        alert('合约未部署');
    }
}


