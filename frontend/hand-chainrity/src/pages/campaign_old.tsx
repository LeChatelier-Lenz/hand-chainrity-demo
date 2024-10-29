import { useEffect, useState } from "react";
import {web3,HandChainrityContract} from "../utils/contracts";
import { CampaignType, Status,LaunchProps } from "../types/interfaces";


export default function Campaign({ prop_account }: LaunchProps) {
    const [campaigns, setCampaigns] = useState<CampaignType[]>([]); // Campaign[] is an array of Campaign objects
    
    useEffect(() => {
      const getCampaigns = async () => {
        if(HandChainrityContract){
          try{
            const newCampaigns:CampaignType[] = [];
            const campaignCount:number = await HandChainrityContract.methods.campaignCount().call();
            // console.log(campaignCount);
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
                deadline: new Date(Number(new_campaign.deadline)*1000),
                beneficiary: new_campaign.beneficiary,
                launcher: new_campaign.launcher,
                status: Status[Number(new_campaign.status)]
              });
            }
            setCampaigns(newCampaigns);
            console.log(campaigns);
          }catch(e:any){
            console.error(e.message);
            alert(`活动列表获取失败:${e.message}`);
          }   
        }
      }
      getCampaigns();
    }, [campaigns]);

    


    return (      
      <div id="campaign">
        <h1>Campaign</h1>
        <p>
          This is the campaign page.
        </p>
        { prop_account?
            <p>Connected Account: {prop_account}</p>:
            <p>Not Connected</p>
        }
        <div className="campaign-list" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <h2>Active Campaign List</h2>
          <ul>
            {campaigns.map((campaign) => (
              <li style={{display:"flex",flexDirection:"column",border:"solid",margin:"10px",padding:"10px"}} key={campaign.id}>
                <h3>Title: {campaign.title}</h3>
                <p>ID: {campaign.id}</p>
                <p>Description:{campaign.description}</p>
                <p>Details: {campaign.details}</p>
                <p>Target: {campaign.target}</p>
                <p>Current: {campaign.current}</p>
                <p>Deadline: {campaign.deadline.toString()}</p>
                <p>Beneficiary: {campaign.beneficiary}</p>
                <p>Launcher: {campaign.launcher}</p>
                <p>Status: {campaign.status}</p>
              </li>
            ))}
          </ul>
          </div>
      </div>
    );
}