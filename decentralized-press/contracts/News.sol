pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract News {
    uint256 totalNews;

    using Counters for Counters.Counter;
    Counters.Counter private _newIds;

    constructor() {
        console.log("News deployed");
    }

    struct New {
        uint256 id;
        string title;
        string description;
        string image;
        string date;
        address author;
        bool voted;
        int approved;
        int declined;
    }

    event NewCreated(
        uint256 id,
        string title,
        string description,
        string image,
        string date,
        address author,
        bool voted,
        int approved,
        int declined
    );

    New[] news;

    function getAllNews() public view returns (New[] memory) {
        return news;
    }

    function getTotalNews() public view returns (uint256) {
        return totalNews;
    }

    function getNew(uint256 _id) public view returns (New memory) {
        return news[_id-1];
    }

    function vote(uint256 _id, string memory _vote) public {
        require(news[_id-1].voted==false);
        if (keccak256(bytes(_vote)) == keccak256(bytes("Approved"))) {
            news[_id-1].approved += 1;
        } else if (keccak256(bytes(_vote)) == keccak256(bytes("Declined"))) {
            news[_id-1].declined += 1;
        }

        if (news[_id-1].approved == 2 || news[_id-1].declined == 2) {
            news[_id-1].voted = true;
        }
    }

    function createNew(
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _date
    ) public {
        require(bytes(_title).length > 0);
        require(bytes(_description).length > 0);
        //require(bytes(_image).length > 0);
        require(msg.sender != address(0));

        totalNews++;

        _newIds.increment();

        news.push(
            New(
                _newIds.current(),
                _title,
                _description,
                _image,
                _date,
                msg.sender,
                false,
                0,
                0
            )
        );

        emit NewCreated(
            _newIds.current(),
            _title,
            _description,
            _image,
            _date,
            msg.sender,
            false,
            0,
            0
        );
    }
}