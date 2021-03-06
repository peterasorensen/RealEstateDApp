
/* Add the dependencies you're testing */
//const Token = artifacts.require("/.././Token.sol");
const Reputation = artifacts.require("./Reputation.sol");
const Token = artifacts.require("./Token.sol");
//
contract('testReputation', function(accounts) {
	/* Define your constant variables and instantiate constantly changing
	 * ones
	 */
	const args = {_owner: accounts[0], _agent: accounts[1], _contractor: accounts[2]};
	let reputation, token;

	/* Do something before every `describe` method */
	before(async function() {
		reputation = await Reputation.new({from: args._owner});
		token = Token.at(await reputation._repToken());


	});

	/* Group test cases together
	 * Make sure to provide descriptive strings for method arguements and
	 * assert statements
	 */
	describe('TestReputationSetup', function() {
		it("Reputation should be able to deploy token contract.", async function() {
			assert.equal(await token.owner(), reputation.address);
			assert.equal(await reputation._owner(), args._owner);
		});
		it("Owner should be able to set Agent.", async function() {
			reputation.setAgent(args._agent, {from: args._owner});
        	assert.equal(await reputation._agent(), args._agent);
        });
        it("Agent should be able to add potential Contractors.", async function() {
			reputation.setAgent(args._agent, {from: args._owner});
			reputation.AddToList(args._contractor, "Berkeley, CA", {from: args._agent});
			//assert.ok(await reputation.AngelList[args._contractor])
        	assert.equal(await token.balanceOf(args._contractor), 5);
		});
		it("Contractor should be set in AngelList.", async function() {
			reputation.setAgent(args._agent, {from: args._owner});
			reputation.AddToList(args._contractor, "Berkeley, CA", {from: args._agent});
			let addy = await reputation.AngelList(args._contractor);
			assert.equal(addy[1], "Berkeley, CA");
        });
	});

	describe('TestReputationStartJob', function() {
		it("stuff", async function() {
			reputation.setAgent(args._agent, {from: args._owner});
			reputation.AddToList(args._contractor, "Berkeley, CA", {from: args._agent});
			reputation.startJob(args._contractor, 10, "Job in Berkeley");
			let con = await reputation.AngelList(args._contractor);
			//let jobList = con[2];
			console.log(con);
			assert.ok(jobList("Job in Berkeley"));
		});
	});

});


