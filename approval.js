
const config = require('./config.json');

const CHAIN = require('@tpblock/client');

function main_chioce() {
    const proposal_name = console.readLine("输入提案的名称: ");
    const proposer = console.readLine("输入提案发起人账户: ");
    const account = console.readLine("输入投票的账户: ");
    const private_key = console.readLine("输入投票账户的私钥: ");

    // 创建 chain 对象, 用来发起交易到区块链上.
    const chain = CHAIN({
        chainId: config.chainId,
        keyProvider: private_key,
        httpEndpoint: config.httpEndpoint,
        logger: {
            log: null,
            error: null
        },
    });

    // 批准提案
    approval_proposal(chain, proposal_name, proposer, account);
}

function approval_proposal(chain, proposal_name, proposer, approval_account) {
    result = chain.transact_sync({
        actions: [{
            account: 'eosio.msig',
            name: 'approve',
            authorization: [
                {
                    actor: approval_account,
                    permission: 'active'
                },
            ],
            data: {
                proposer: proposer,
                proposal_name: proposal_name,
                level: {
                    actor: approval_account,
                    permission: 'active'
                }
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
        broadcast: true,
        sign: true
    });
    console.dir(result, {depth: 6});
}

main_chioce();