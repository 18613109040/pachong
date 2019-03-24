import React, { useState,useEffect  } from 'react'
import { Card, Tabs  } from 'antd';
import request from '../../utils/request'
const TabPane = Tabs.TabPane;
function Home() {
    const [activeKey,setActiveKey] = useState('2') 
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        request('/api/xiecheng/flightListSearch',{
            method:'POST',
            body:{
                contentType: 'json',
                flag: 8,
                preprdid:'',
                searchitem: [{
                    accode:'SHA',
                    dccode:'BJS',
                    dtime: '2019-03-25'
                }],
                subchannel: null,
                trptpe: 1
            }
        })
    });
    return (
        <Card>
            <Tabs activeKey={activeKey} onChange={(key)=>setActiveKey(key)}>
                <TabPane tab="国内机票" key="1">

                </TabPane>
                <TabPane tab="国际。港澳台机票" key="2"></TabPane>
            </Tabs>
        </Card>
    )
}
export default Home;