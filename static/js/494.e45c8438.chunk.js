"use strict";(self.webpackChunkleave_management_app=self.webpackChunkleave_management_app||[]).push([[494],{494:(e,a,t)=>{t.r(a),t.d(a,{default:()=>p});var n=t(51),s=t(534),l=t(806);const o=[n.L.get("/api/leave-balance",(e=>(console.log("Intercepted /api/leave-balance"),s.c.json([{leaveType:"Annual Leave",balance:10,futureLeave:2,balanceMinusFutureLeave:8}])))),n.L.get("/api/request-overview",(e=>s.c.json([{leaveType:"Annual Leave",date:"2024-07-01",status:"Approved",approver:"Joe Supervisor",days:3,quotaUsed:3}]))),n.L.get("/api/leave-types",(e=>s.c.json({2e3:{type:"Annual Leave",balance:10},2001:{type:"Pers. Lv with Cert",balance:5}}))),n.L.post("/api/leave-request",(e=>s.c.json({message:"Leave request submitted successfully"})))],c=(0,l.k)(...o);function p(){return console.log("Initializing Mock API..."),c.start({onUnhandledRequest:"bypass"}).then((()=>{console.log("Mock API started")})).catch((e=>{console.error("Mock API failed to start:",e)}))}}}]);
//# sourceMappingURL=494.e45c8438.chunk.js.map