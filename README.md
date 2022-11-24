### How to setup your project

We have a live site at `https://philea.io`, but you can also follow along to locally install Philea:

```bash
git clone https://github.com/herbievine/philea.git
cd philea
npm i # or yarn
npm run dev # or yarn dev
```

Then visit `http://localhost:3000` and it should be un and running!

### Problem

What problem does your project solve? How does it fit into the theme "Building a Decentralized Future"?

```
Blockchains had the reputation of having an high energy consumption, and thus, a high carbon footprint. 
This bad image does not help mass adoption. 

Nowadays, more and more networks choose to be Proof of Stake (PoS), and describe those transactions as negligeable for some blockchain. 
However, with millions of transactions everyday, it still has impact in a global point of view.

Moreover, not all blockchain are choosing PoS, and those switching (Ethereum for instance) still have an enormous carbon debt.
(cf : https://ethereum.org/en/energy-consumption) 
Many users and protocols lack awarness on that subject and are missing solution to solve it.
```

### Solution

How did you resolve this issue? What technologies did you use? What was your biggest technical challenge and how does your solution solve it?

```
We created a tool to scan transactions of a wallet or a smart contract. 
It calculates, depending of blockchain, the carbon footprint of the transactions since the creation of the wallet (or the smart contract). 
We provide carbon compensation solutions thanks to existing impact projects. 

This is just a first version of it. 
In the current version, you can buy carbon credits already produced by the project. 
75% is reinvested in other project in favor of conservation. 

In a later version, we will be able to invest in the future production of those credits.

Those carbon credits are a way to compensate and invest in the future development of impact projects.

In our prototype, we showcased only one project, but our partners brought us many more, with more that 1 million tons of carbon credits.
```

### Team and comments

Specify the name of your team (the same as on the discord/gather), and tell us what you learned during this hackathon!

```
Philea

It was great to discover how to articulate contracts and what is feasible in just a few days. 
Only one of us had saw solidity and smart contracts before, and it was at a beginner level. 
It has been an opportunity for us to understand how to articulate things around the partners solutions and learn about their tool.
It was also great to discover the dynamic of an online hackathon with a tool like gather. 
Badly not all the members were equally involved and we lost some of us. 
However, we manage to create something that is working and we are proud of it!
Furthermore, we would like to thank the organizers and the partners for their availability. 
You were at disposal to answer our questions, so thank you.
```

### Project Submission

- Provide an explanation of the features of your projects. You must link a demonstration video with commentary and screen recording of your presentation (10 slides max) or demo product (example: Loom, 4 minutes max).
- Include a brief demonstration of the use of Starton or its partners iExec, BNB Chain, NodeReal, or Ledger.
The more you use partner technologies, the more points you will earn. Example: Use the Starton API on the BNB Chain blockchain.
You have used two partners.

```
Please find our presentation and our video in the related typeform submission.

During the time we had at our disposal, we manage to parse some data from BNB Chain and its transactions.
It allowed us to estimate the carbon footprint of each transactions. 
The team was great and tried to find us the right informations by contacting all the validators. 
Badly, we did not have the answers in time.

Due to this incertitude, and our willingness to have a functionable prototype, we developed to make it functional on Ethereum.
It is also one of the blockchain where we thought our solution could make the more sense.

We tried to use Starton to implement a contract for the transactions.
However our level of knowledge regarding smart contracts weren't enough, we will keep that for further developments.
It is also mainly due to the fact that the Eth. network was busy and so the fees were high. 
Mistakes could have cost us a lot.
We plan to improve our tool with a flexible token smart contract, to have a trace of the compensation made.
Indeed, it will be useful if we manage to create rewards from newly produced carbon credits.

We manage to connect Metamask and Ledger, and we are using Nodereal to interact with our solution.

We wanted to add the possibility to give recommendations on when and where (which blokchain) make a transaction a time t thanks to iExec oracles. 
Due to lack of time, we weren't able to do so.

Used :
- NodeReal
- Ledger
- (Metamask)

Partially used :
- BNB Chain

Will be used :
- Starton
- iExec
```
