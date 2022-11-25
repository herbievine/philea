### How to setup your project

#### Installation

We have a live site at `https://philea.io`, but you can also follow along to locally install Philea:

```bash
git clone https://github.com/herbievine/philea.git
cd philea
npm i # or yarn
npm run dev # or yarn dev
```

#### API Keys

You will also need to add an Ethereum JSON RPC URL with NodeReal, and optionally a Etherscan API key (rate limited at 1s/req).

```bash
mv .env.example .env.local
```

Then visit `http://localhost:3000` and it should be un and running!

### Problem

What problem does your project solve? How does it fit into the theme "Building a Decentralized Future"?

Blockchains had the reputation of having an high energy consumption, and thus, a high carbon footprint. 
This bad image does not help mass adoption. 

Nowadays, more and more networks choose to be Proof of Stake (PoS), and describe those transactions as negligeable. 
However, with millions of transactions everyday, it leads to a global impact which can't be ignored.

Moreover, not all blockchain are choosing PoS, and those switching (Ethereum for instance) still have an enormous carbon debt.
(cf : https://ethereum.org/en/energy-consumption) 
Many users and protocols lack awareness on the subject and are missing solution to solve it.

### Solution

How did you resolve this issue? What technologies did you use? What was your biggest technical challenge and how does your solution solve it?

We created a tool to scan transactions of a wallet or a smart contract. 
It calculates, depending on the network, the carbon footprint of the transactions since the creation of the address. 
We provide carbon compensation solutions thanks to existing impact projects generating those.

In a later version, we plan to issue ERC20 token, the equivalent of a kg of Co2, to track which addresses repay their carbon debt. These tokens will act as a on-chain receipt of carbon credits already produced by the project. Then, you will be able to invest in the future production of those credits to help the project development.

When you donate, 75% is reinvested in other project in favor of conservation and new project development, the remaining 25% is split between the project which generated the carbon credit, our partners (here, SmartB, who provide traceability of the carbon credit quality) and us. 

In our prototype, we showcased only one impact project, but our partners brought us many more, with at least 1 million tons of credits. Depending on the quality and origin of the credits, price may fluctuate between $25 for pre-produced Co2 credits and $8 for future produced credits. 

### Team and comments

Specify the name of your team (the same as on the discord/gather), and tell us what you learned during this hackathon!

#### Philea

It was great to discover how to articulate contracts and what is feasible in just a few days. Only one of us had saw solidity and smart contracts before, and it was at a beginner level. It has been a great opportunity for us to understand how to communicate and use the tools the hackathon partners provided us. It was also great to discover the dynamic of an online event with a tool like Gather. It was however unfortunate that half of our group dropped out. We still managed to create something that is working and we are proud of it!

Furthermore, we would like to thank the organizers and the partners for their availability. You were at disposal to answer our questions, so thank you :).

### Project Submission

- Provide an explanation of the features of your projects. You must link a demonstration video with commentary and screen recording of your presentation (10 slides max) or demo product (example: Loom, 4 minutes max).
- Include a brief demonstration of the use of Starton or its partners iExec, BNB Chain, NodeReal, or Ledger.
The more you use partner technologies, the more points you will earn. Example: Use the Starton API on the BNB Chain blockchain.
You have used two partners.

Please find our presentation and our video in the related typeform submission.

During the time we had at our disposal, we managed to parse some data from BNB Chain and its transactions.
It allowed us to estimate the carbon footprint of each transactions. 
The team was great and tried to find us the right informations by contacting all the validators. 
Badly, we did not have the answers in time.

Due to this incertitude, and our willingness to have a functionable prototype, we developed to make it functional on Ethereum.
It is also one of the blockchain where we thought our solution could make the most sense.

We wanted to use the Payment Splitter provided by Starton, but our use case didn't align with their documentation, so it was rather challenging to deploy a contract. It is in our plan to use their Payment Splitter Contract, the Flexible ERC20 Supply Contract, and the transaction Relayer to optimise our project development.

It was due to the fact that the Ethereum network was busy and the fees were expensive. Mistakes could have cost us a lot.

We manage to connect Metamask and Ledger, and we are using Nodereal as the JSON RPC to interact with our the Ethereum network.

We wanted to use the iExec Oracles to add the possibility to give recommendations on when and where (which blokchain) to make a transaction for the least emissions. Due to lack of time, we weren't able to do so.

Used :
- NodeReal (as the JSON RPC)
- Ledger (as a connection method via Ledger Live)

Partially used :
- BNB Chain

Will be used :
- Starton
- iExec
