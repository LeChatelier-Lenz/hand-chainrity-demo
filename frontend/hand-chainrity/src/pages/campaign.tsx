import { useEffect, useState } from "react";
import {web3,HandChainrityContract} from "../utils/contracts";
export default function Campaign() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]); // Campaign[] is an array of Campaign objects
    
    interface Campaign {
        id: number;
        title: string;
        description: string;
        target: number;
        current: number;
        deadline: Date;
        beneficiary: string;
        launcher: string;
        status: string;
    }

    useEffect(() => {
      const fetchCampaigns = async () => {
          if(HandChainrityContract){
            try{
              const campaign_list:[] = await HandChainrityContract.methods.campaigns().call();
              console.log(campaign_list);
              campaign_list.forEach((campaign:any) => {
                setCampaigns([...campaigns, {
                  id: campaign.hcu_id,
                  title: campaign.title,
                  description: campaign.description,
                  target: campaign.target,
                  current: campaign.current,
                  deadline: campaign.deadline,
                  beneficiary: campaign.beneficiary,
                  launcher: campaign.launcher,
                  status: campaign.status
                }]);
              });
            }catch(e:any){
              console.error(e.message);
            }   
          }
      }
      fetchCampaigns();
    }, [campaigns]);

    


    return (      
      <div id="campaign">
        <h1>Campaign</h1>
        <p>
          This is the campaign page.
        </p>
        <div className="campaign-list">
          <h2>Campaign List</h2>
          {/*  */}
          </div>
      </div>
    );
}