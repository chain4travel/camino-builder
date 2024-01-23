# 🔮 Polygon ID

We are excited to have Polygon ID as part of the DevWeekend event, and are excited to offer developers to integrate Polygon ID technology within your challenge submission. This section is dedicated to help you dive deeper into what Polygon ID is and how it works.

## Prerequisities
- You'll need a Polygon ID Wallet, which you can install for (IOS)[https://apps.apple.com/us/app/polygon-id/id1629870183] and (Android)[https://play.google.com/store/apps/details?id=com.polygonid.wallet&hl=en&gl=US]


## 💾 Tools
- (Issuer UI)[https://issuer-ui.polygonid.me/]
- (Issuer API)[https://issuer-admin.polygonid.me/]
- (Schema Builder)[https://schema-builder.polygonid.me/builder]
- (Query Builder)[https://schema-builder.polygonid.me/query-builder]

## 📟 Userful Links
- (PolygonID Documentation)[https://devs.polygonid.com/]
- (Quick Start Demo)[https://devs.polygonid.com/docs/quick-start-demo/]
- (PolygonID Smart Contract)[https://github.com/0xPolygonID/contracts]


## 🔦 What is PolygonID

### Context

Polygon ID is a complete platform that can be used to construct a variety of identity and trust services. The team is creating an open and enterprise-ready ecosystem for trust markets and trust management to build new attestation and access services with an incentive layer.

We will introduce you to Polygon IDs terminology that you can meet throughout (PolygonID Documentation)[https://devs.polygonid.com/].

### 📜 Vocabulary

- `DID` - Every identity is identified by a unique identifier called DID (Decentralized Identifier). Every identity-based information is represented via Verifiable Credentials (VCs). In the simplest terms, a VC represents any type of information related to an individual/enterprise/object. 
- `VC` - The `VC` could be as simple as the age of the entity or the highest degree held by it. It could also be a membership certificate issued by a DAO, for instance.
- `SSI` - Self Sovereign Identity


Polygon ID exists within the context of 3 entities:

1. Issuer - An entity issuing the identity verification/attestation. Required to have a "real-world" trust (e.g. Trust isn't originating from the technical side, but only being securely conducted by tech). At it's core we need to have an actor, a `Verifier` will choose to trust, not be forced to. The same way we trust money, identity or any data originated from a trusted source.

Examples: 
- Goverment issuing identity verification
- Event issuing confirmation of attendance
- University attestating for being an active student

2. Verifier - An entity checking whether Holder has a specific confirmation.

Examples:
- Bar checking whether the customer is older than 18.
- University checking whether you are an active student to grant access to restricted educational material.
- An Airdrop Distributor checking whether you have attended a specific event.

3. Holder - A user, or entity holding different attestations and confirmations. Basically the Polygon ID Wallet app. All the attestations and issued VC's belong to `Holder`.



## 📐 How to Integrate PolygonID

To help you figure out your next step - let's look at an example a challenge submission and breaking down how you can build it. Below you see a diagram describing a Booking Platform integrating Polygon ID, working with `Reservation Credentials`.

!(image)[https://github.com/juuroudojo/toolsReal/blob/main/images1/Untitled%20(1).png]


### Steps

1. Schema Creation 
    1. Reservation Credential
    2. Room Credential
2. Issue Reservation Credential
    1. Through direct Issuance (previously authenticated user)
    2. Through link
3. Verification
    1. Get the verification query with the Query Builder
        1. Query should be signed off-chain
        2. Linked proofs (You can provide proof for several credentials at a time with one QR Code)
        3. Nullifiers
    2. Set Up verifier backend
        1. Sign in with the query from the Query Builder
        2. Copy the body response and hit the store QR endpoint
        3. Pool the status endpoint until status == “success” or timeout after 10 mins
        4. Retrieve the user’s did from the JWZ token 
4. Issue Room Credential
5. Repeat verification process

## Contact Us

We are always happy to help you learn. If you want some additional support or want to contribute reach out to us on [Discord](https://discord.gg/camino).
  