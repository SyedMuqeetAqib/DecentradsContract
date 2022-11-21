// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./DecentradsFactory.sol";

interface DecentradsApplicationInterface {
        struct Ad {
        uint256 budget;
        address adOwner;
        string adTitle;
        string description;
        uint256 totalVoted;
        uint256 startDate;
        uint256 numberOfDays;
        uint256 submissionTime;
        bool appovedByApp;
        bool claimedFundsByDapp;
        uint256 voterShare;
    }

    event AdPosted(string _title, string _decription, uint256 _startDate, uint256 _numberOfDays);

    event AdApproved(uint256 _adId);

    event AdRetrieved(uint256 _adId);

    event FundsClaimedByOwner(uint256 _adId, uint256 decentradsShare, uint256 dappOwnerShare);

    event VotedOnAd(uint256 _adId, uint256 voterShare, uint256 totalUserIncentive );

    event FundsClaimedByVoter(uint256 userReward);

    event DappReported();

    event AddressWhitelist(address _user);

    event AddressBlacklist(address _user);

}

interface DecentradsFactoryInterface {
       struct DecentradsAppInfo {
        uint256 id;
        DecentradsApplication application;
        bool reported;
        mapping(uint256 => ReportProposal) dappReport;
    }

    struct Voter {
        address voterAddress;
        uint256 collateral;
    }

    struct ReportProposal {
        address dappAddress;
        string reportReason;
        uint256 numberOfVotes;
        bool isPassed;
    }

    event FactoryDeployed(uint256 dappCollatoralAmount,uint256 voterCollatoralAmount);

    event DappCollatoralChanged(uint256 _collatoral);

    event VoterCollatoralChanged(uint256 _collatoral);

    event AppRegistered(address[] whitelistAddress, address AppOwner,uint256 dappId, address dappAddress);

    event VoterRegistered();

    event DappReported(address _dappAddress, string _reportReason, uint256 _reportId);

    event VoteReportedDapp(address _dappAddress, uint256 _reportId);

    event ApplyDappReported(address _dappAddress, uint256 _reportId, bool _isReported);

}
