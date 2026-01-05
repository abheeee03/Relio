import WebsiteDetails from '@/components/WebsiteDetails';
import React from 'react'


export type Website = {
  id: string;
  url: string;
  user_id: string;
  ticks: {
  id: string;
  response_ms: number;
  status: string;
  region_id: string;
}[];
};


async function WebsitePage({params}: {params: {websiteID: string}}) {
    const {websiteID} = await params;
    let dummy: Website = {
  id: "site-6fef0567-3de0-4d07-ba4c-0001",
  url: "https://www.google.com",
  user_id: "user-541e1ed3-38f2-40fa-be6a-0001",
  ticks: [
    {
      id: "tick-001",
      response_ms: 132,
      status: "Up",
      region_id: "india"
    },
    {
      id: "tick-002",
      response_ms: 145,
      status: "Up",
      region_id: "india"
    },
    {
      id: "tick-003",
      response_ms: 0,
      status: "Down",
      region_id: "india"
    },
    {
      id: "tick-004",
      response_ms: 210,
      status: "Up",
      region_id: "usa"
    },
    {
      id: "tick-005",
      response_ms: 198,
      status: "Up",
      region_id: "usa"
    },
    {
      id: "tick-006",
      response_ms: 0,
      status: "Down",
      region_id: "usa"
    }
  ]
};
    
    return <WebsiteDetails data={dummy}/>
}

export default WebsitePage