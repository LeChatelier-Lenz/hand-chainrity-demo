// import { useEffect, useState } from "react";
// import {web3,HandChainrityContract} from "../utils/contracts";
// import { CampaignType, Status,ChildProps } from "../types/interfaces";
// import { fetchCampaignById, fetchCampaigns } from "../actions/campaign";
// import { fetchTransactions } from "../actions/blockchain";

// export default function Campaign({ prop_account }: ChildProps) {
//     const [campaigns, setCampaigns] = useState<CampaignType[]>([]); // Campaign[] is an array of Campaign objects
//     const [campaignFound,setCampaignFound] = useState<CampaignType>({
//       id: 0,
//       title: "",
//       details: "",
//       description: "",
//       target: 0,
//       current: 0,
//       createdAt: new Date(),
//       deadline: new Date(),
//       beneficiary: "",
//       launcher: "",
//       status: ""
//     });
//     const [campaignId,setCampaignId] = useState<number>(0);

//     useEffect(() => {
//         fetchCampaigns(setCampaigns);
//     }, [campaigns]);

//     const findCampaignById = async (e:React.ChangeEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       try{
//         fetchCampaignById(campaignId,setCampaignFound);
//       }catch(e:any){
//         console.error(e.message);
//         alert(`活动获取失败:${e.message}`);
//       }
//     }


    
//     return (      
//       <div id="campaign">
//         <h1>Campaign</h1>
//         <p>
//           This is the campaign page.
//         </p>
//         { prop_account?
//             <p>Connected Account: {prop_account}</p>:
//             <p>Not Connected</p>
//         }
//         <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
//           <h2>Find Campaign By ID</h2>
//           <form onSubmit={findCampaignById}>
//             <label>
//               Campaign ID:
//               <input type="number" name="id" onChange={(e) => setCampaignId(Number(e.target.value))}/>
//             </label>
//             <button type="submit" >Find</button>
//           </form>
//           {campaignFound.id !== 0?
//             <div style={{display:"flex",flexDirection:"column",border:"solid",margin:"10px",padding:"10px"}}>
//               <h3>Title: {campaignFound.title}</h3>
//               <p>ID: {campaignFound.id}</p>
//               <p>Description:{campaignFound.description}</p>
//               <p>Details: {campaignFound.details}</p>
//               <p>Target: {campaignFound.target}</p>
//               <p>Current: {campaignFound.current}</p>
//               <p>Deadline: {campaignFound.deadline.toString()}</p>
//               <p>Beneficiary: {campaignFound.beneficiary}</p>
//               <p>Launcher: {campaignFound.launcher}</p>
//               <p>Status: {campaignFound.status}</p>
//             </div>:
//             <p>No Campaign Found</p>
//           }
//           </div>
//         <div className="campaign-list" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
//           <h2>Active Campaign List</h2>
//           <ul>
//             {campaigns.map((campaign) => (
//               <li style={{display:"flex",flexDirection:"column",border:"solid",margin:"10px",padding:"10px"}} key={campaign.id}>
//                 <h3>Title: {campaign.title}</h3>
//                 <p>ID: {campaign.id}</p>
//                 <p>Description:{campaign.description}</p>
//                 <p>Details: {campaign.details}</p>
//                 <p>Target: {campaign.target}</p>
//                 <p>Current: {campaign.current}</p>
//                 <p>Deadline: {campaign.deadline.toString()}</p>
//                 <p>Beneficiary: {campaign.beneficiary}</p>
//                 <p>Launcher: {campaign.launcher}</p>
//                 <p>Status: {campaign.status}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <p>获取对应账户区块交易信息</p>
//           <button onClick={() => fetchTransactions(prop_account)}>获取</button>
//         </div>
//       </div>
//     );
// }

export {}