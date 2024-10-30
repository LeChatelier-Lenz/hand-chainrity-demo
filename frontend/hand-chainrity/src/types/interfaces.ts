// types.ts
// 子组件的上下文类型【相当于props接口】

export interface ChildProps {
  prop_account: string;
}

export interface OutletContext {
  account: string;
}

export interface CampaignType {
    id: number;
    title: string;
    description: string;
    details: string;
    target: number;
    current: number;
    createdAt: Date;
    deadline: Date;
    beneficiary: string;
    launcher: string;
    status: string;
    [key: string]: any; // 允许其他属性，值的类型可以是任意
}

export interface ApplicationProps {
  id: number;
  address: string;
  name: string;
  idCard: string;
  phone: string;
  description: string;
  details: string;
  createdAt: Date;
  status: string;
  [key: string]: any; // 允许其他属性，值的类型可以是任意
}

// enum Status {
//     Launched,
//     Fundraising,
//     Rejected,
//     LimitReached, //金额或者是时间
//     Completed,
//     Revoked
// }

export const Status = ['Launched','Fundraising','Rejected','LimitReached','Completed','Revoked'];