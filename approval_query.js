
const http   = require("http")
const config = require('./config.json');

function main_chioce() {
    console.log(`=============================================
0. 查询指定的提案信息(旧). \n
1. 查询指定的提案信息(新). \n
=============================================`);
    let user_choice = Number(console.readLine("choice: "));
    switch (user_choice) {
        case 0:
            approval_query();
            break;
        case 1:
            new_approval_query();
            break;
        default:
            console.notice("you no choice");
            break;
    }
}

function approval_query(){
    const proposal_name = console.readLine("输入提案的名称: ");
    const proposer = console.readLine("输入提案发起人账户: ");

    let requested_approvals = [];
    let provided_approvals = [];

    const result = http.post(config.httpEndpoint + "/v1/chain/get_table_rows", {
        json: {
            "code": "eosio.msig",
            "scope": proposer,
            "table": "approvals",
            "json": true,
            "limit": 100
        }
    });

    result.json().rows.forEach(row => {
        if (row.proposal_name === proposal_name) {
            row.requested_approvals.forEach(requested_approval => {
                requested_approvals.push(requested_approval.actor);
            })
            row.provided_approvals.forEach(provided_approval => {
                provided_approvals.push(provided_approval.actor);
            })
        }
    });

    if (requested_approvals.length == 0) {
        console.log(`提案人 ${proposer} 的提案 ${proposal_name} 已被执行或者该提案不存在.`);
        return;
    }

    console.log(`提案人: ${proposer}, 提案: ${proposal_name} 投票情况如下:`);
    console.log("未投票人员如下:")
    requested_approvals.forEach(requested_approval => {
        console.log(`${requested_approval} \n`);
    });

    console.log("已投票人员如下:")
    provided_approvals.forEach(provided_approval => {
        console.log(`${provided_approval} \n`);
    });

    main_chioce();
}

function new_approval_query(){
    const proposal_name = console.readLine("输入提案的名称: ");
    const proposer = console.readLine("输入提案发起人账户: ");

    let requested_approvals = [];
    let provided_approvals = [];

    const result = http.post(config.httpEndpoint + "/v1/chain/get_table_rows", {
        json: {
            "code": "eosio.msig",
            "scope": proposer,
            "table": "approvals2",
            "json": true,
            "limit": 100
        }
    });

    result.json().rows.forEach(row => {
        if (row.proposal_name === proposal_name) {
            row.requested_approvals.forEach(requested_approval => {
                requested_approvals.push(requested_approval.level.actor);
            })
            row.provided_approvals.forEach(provided_approval => {
                provided_approvals.push(provided_approval.level.actor);
            })
        }
    });

    if (requested_approvals.length == 0) {
        console.log(`提案人 ${proposer} 的提案 ${proposal_name} 已被执行或者该提案不存在.`);
        return;
    }

    console.log(`提案人: ${proposer}, 提案: ${proposal_name} 投票情况如下:`);
    console.log("未投票人员如下:")
    requested_approvals.forEach(requested_approval => {
        console.log(`${requested_approval} \n`);
    });

    console.log("已投票人员如下:")
    provided_approvals.forEach(provided_approval => {
        console.log(`${provided_approval} \n`);
    });

    main_chioce();
}

main_chioce();