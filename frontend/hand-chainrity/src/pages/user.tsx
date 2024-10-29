
import AppAppBar from '../component/AppAppBar';
import React, { useState } from 'react';
import { CampaignType } from '../types/interfaces';
import { fetchUserCampaigns } from '../actions/campaign';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../types/interfaces';

export default function User() {
  const { account } = useOutletContext<OutletContext>();
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  // React.useEffect(() => {
  //   // fetchCampaigns(setCampaigns);
  //   fetchUserCampaigns(account,setCampaigns);
  // }, [campaigns, account]);
  const fetchCampaigns = async () => {
    // fetchCampaigns(setCampaigns);
    // console.log(account);
    fetchUserCampaigns(account,setCampaigns);
    console.log(campaigns);
  }

  return (
    <div id="user">
      <AppAppBar />
      <h1>User</h1>
      <p>
        This is the user page.
      </p>
      <button onClick={fetchCampaigns}>My Participated Campaign List</button>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>{campaign.details}</p>
            <p>{campaign.target}</p>
            <p>{campaign.current}</p>
            <p>{campaign.deadline.toISOString()}</p>
            <p>{campaign.beneficiary}</p>
            <p>{campaign.launcher}</p>
            <p>{campaign.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}