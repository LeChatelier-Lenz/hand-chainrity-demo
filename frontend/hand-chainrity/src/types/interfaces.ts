// types.ts
// 子组件的上下文类型【相当于props接口】
export interface OutletContext {
    account: string; // 根据实际情况修改
}

export interface CampaignType {
    id: number;
    title: string;
    description: string;
    details: string;
    target: number;
    current: number;
    deadline: Date;
    beneficiary: string;
    launcher: string;
    status: string;
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