import { useState } from "react";
import { CampaignType, ChildProps, OutletContext, Status } from "../types/interfaces";
import { HandChainrityContract, web3 } from "../utils/contracts";
import { fetchCampaignById, fetchCampaigns } from "../actions/campaign";
import { useOutletContext } from "react-router-dom";


export default function Launch() {
  const {account} = useOutletContext<OutletContext>();

  // 内联样式
  const [formData,setFormData] = useState<CampaignType>({
    id: 0,
    title: "",
    details: "",
    description: "",
    target: 0,
    current: 0,
    deadline: new Date(),
    beneficiary: "",
    launcher: "",
    status: ""
  });

  

  
  const [campaigns,setCampaigns] = useState<CampaignType[]>([]);


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    // console.log(name,value);
    // console.log(typeof(value));
    setFormData((prevData) => ({
      ...prevData,
    [name]: name === 'deadline' ? new Date(value) : value
    }));
  }

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认表单提交行为
    // setError(''); // 清空错误信息

    try {
        const targetValue = web3.utils.toWei(formData.target.toString(),'ether');
        // 按秒获取时间戳
        const ddlTimestamp = Math.floor(formData.deadline.getTime()/1000);
        const campaignId = await HandChainrityContract.methods.createCampaign(formData.description,targetValue,ddlTimestamp,formData.beneficiary).send({from:account});
        console.log('成功创建新手链筹单元');
        console.log(campaignId);
        // 处理成功后的逻辑，如清空表单或提示用户
        setFormData({
          id: 0,
          title: "",
          description: "",
          details: "",
          target: 0,
          current: 0,
          deadline: new Date(),
          beneficiary: "",
          launcher: "",
          status: ""
        })
        alert('提交成功！');
    } catch (err) {
        console.error('提交失败:', err);
        // setError('提交失败，请重试');
    }
  };

  const getCampaigns = async () => {
      fetchCampaigns(setCampaigns);
  }



  return (
    <div id="launch" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <h1>Launch</h1>
      <p>
        This is the launch page.
      </p>
      <p>Account:{account}</p>
      <div className="launch-form" style={{border:"solid"}}>
        <form onSubmit={handleSubmit}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div>
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Campaign Title" 
                value={formData.title}
                onChange={handleChange}
                /> 
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input 
                type="text" 
                id="description" 
                name="description" 
                placeholder="Campaign Description" 
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="details">Details</label>
              <input 
                type="text" 
                id="details" 
                name="details" 
                placeholder="Campaign Details" 
                value={formData.details}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="target">Target</label>
              <input 
                type="number" 
                id="target" 
                name="target" 
                placeholder="Campaign Target" 
                value={formData.target}
                onChange={handleChange}
                />
            </div>
            <div>
              <label htmlFor="deadline">Deadline</label>
              <input 
                type="date" 
                id="deadline" 
                name="deadline" 
                value={formData.deadline.toISOString().split('T')[0]}
                onChange={handleChange}
                />
            </div>
            <div>
              <label htmlFor="beneficiary">Beneficiary</label>
              <input 
                type="text" 
                id="beneficiary" 
                name="beneficiary" 
                placeholder="Campaign Beneficiary" 
                value={formData.beneficiary}
                onChange={handleChange}
                />
            </div>
            <div>
              <button type="submit">Launch</button>
            </div>
          </div>
        </form>
      </div>
      <div className="checkCampaigns">
        <button type="button" onClick={getCampaigns} >List</button>
        <div>
          <ul>
            {campaigns.map((campaign) => (
              <li style={{border:"solid"}} key={campaign.id}>
                <p>ID : {campaign.id}</p>
                <p>Title : {campaign.title}</p>
                <p>Description : {campaign.description}</p>
                <p>Details : {campaign.details}</p>
                <p>Target : {campaign.target}</p>
                <p>Current : {campaign.current}</p>
                <p>Deadline : {campaign.deadline.toISOString().split('T')[0]}</p>
                <p>Beneficiary : {campaign.beneficiary}</p>
                <p>Launcher : {campaign.launcher}</p>
                <p>Status : {campaign.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}