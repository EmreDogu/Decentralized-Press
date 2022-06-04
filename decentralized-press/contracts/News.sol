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
        string coverImageHash;
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
        string coverImageHash,
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
        return news[_id];
    }

    function createNew(
        string memory _title,
        string memory _description,
        string memory _coverImageHash,
        string memory _date
    ) public {
        require(bytes(_coverImageHash).length > 0);
        require(bytes(_title).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0));

        totalNews++;

        _newIds.increment();

        news.push(
            New(
                _newIds.current(),
                _title,
                _description,
                _coverImageHash,
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
            _coverImageHash,
            _date,
            msg.sender,
            false,
            0,
            0
        );
    }
}