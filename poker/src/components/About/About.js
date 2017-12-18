import React from  'react';

import "./about.css";


export default class About extends React.Component {
    render(){
        return(
            <div className="formAbout">
                <h2 className="ActionHeading">Our application is the good agile planning tool!!!</h2>
                <div className="AboutContent">
                    <p>Planning Poker is a digital card game designed to help agile and scrum development
                        teams effectively set their sprint goals through collaborative planning and consensus-based estimations.
                        Planning Poker is proven to be one of the most effective sprint planning tools for agile teams.
                    </p>
                    <p>
                        The Features You Need for Sprint Planning
                        Many teams see sprint planning as a chore. Planning Poker’s new features makes it fun and easy for your team to effectively and accurately set your sprint estimates:
                        <ul id="AboutContentLi">
                            <li>Play on mobile or desktop to support distributed teams</li>
                            <li>Choose from multiple pointing scales to build a sprint that fits your team</li>
                            <li>Register and play securely to protect your sprint</li>
                            <li>Edit scores to build team consensus around estimates</li>
                            <li>Expand your game room for larger agile teams (Select and Pro only)</li>
                            <li>Export stories to simply manage your sprint (Select and Pro only)</li>
                            <li>Monitor team velocity to ensure team members reach their goals (Select and Pro only)</li>
                            <li>Add story details and acceptance criteria for accurate estimates (Select and Pro only)</li>
                            <li>Build a custom pointing scale (Select and Pro only)</li>
                            <li>Import and export to JIRA, TFS, VersionOne and other agile software (Select and Pro only)</li>
                        </ul>
                    </p>
                </div>
            </div>
        )
    }
}