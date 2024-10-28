import { useEffect, useState } from "react";

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