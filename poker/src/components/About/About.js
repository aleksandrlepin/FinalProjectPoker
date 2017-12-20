import React from  'react';
import "./about.css";

export default class About extends React.Component {
    render(){
        return(
            <div className="formAbout">
                <h2 className="AboutHeading">Our application is the good agile planning tool!!!</h2>
                <div className="AboutContent">
                    <p>Planning Poker is a digital card game designed to help agile and scrum development
                        teams effectively set their sprint goals through collaborative planning and consensus-based estimations.
                        Planning Poker is proven to be one of the most effective sprint planning tools for agile teams.
                    </p>
                    <hr />

                    <h3>The Features You Need for Sprint Planning</h3>
                    <p>Many teams see sprint planning as a chore. Planning Poker’s new features makes it fun and easy for your
                        team to effectively and accurately set your sprint estimates:</p>
                    <ul className="AboutContentLi">
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
                    <hr />

                    <h3>Equipment</h3>
                    <p>Planning poker is based on a list of features to be delivered, several copies of a deck of cards and optionally,
                        an egg timer that can be used to limit time spent in discussion of each item.</p>
                    <p>The feature list, often a list of user stories, describes some software that needs to be developed.</p>
                    <p>The cards in the deck have numbers on them. A typical deck has cards showing the Fibonacci sequence including a zero:
                        0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89; other decks use similar progressions.</p>
                    <p>The reason for using the Fibonacci sequence is to reflect the inherent uncertainty in estimating larger items.[citation needed]</p>
                    <p>Several commercially available decks use the sequence: 0, ½, 1, 2, 3, 5, 8, 13, 21, 34, 100, and optionally a ? (unsure),
                        an infinity symbol (this task cannot be completed) and a coffee cup (I need a break), and I will make the rest of the team tea.
                        Some organizations[which?] use standard playing cards of Ace, 2, 3, 5, 8 and king. Where king means: "this item is too big or
                        too complicated to estimate". "Throwing a king" ends discussion of the item for the current sprint.</p>
                    <hr/>

                    <h3>Procedure</h3>
                    <p>At the estimation meeting, each estimator is given one deck of the cards. All decks have identical sets of cards in them.</p>
                    <p>The meeting proceeds as follows:</p>
                    <ul className ="AboutContentLi">
                        <li>A Moderator, who will not play, chairs the meeting.</li>
                        <li>The Product Manager provides a short overview of one user story to be estimated. The team is given an opportunity to ask
                            questions and discuss to clarify assumptions and risks. A summary of the discussion is recorded by the Project Manager.</li>
                        <li>Each individual lays a card face down representing their estimate for the story. Units used vary - they can be days duration,
                            ideal days or story points. During discussion, numbers must not be mentioned at all in relation to feature size to avoid anchoring.</li>
                        <li>Everyone calls their cards simultaneously by turning them over.</li>
                        <li>People with high estimates and low estimates are given a soap box to offer their justification for their estimate and then discussion continues.</li>
                        <li>Repeat the estimation process until a consensus is reached. The developer who was likely to own the deliverable has a large portion of the
                            "consensus vote", although the Moderator can negotiate the consensus.</li>
                    </ul>
                    <br/>
                    <p>The cards are numbered as they are to account for the fact that the longer an estimate is, the more uncertainty it contains. Thus, if a developer
                        wants to play a 6 he is forced to reconsider and either work through that some of the perceived uncertainty does not exist and play a 5, or accept
                        a conservative estimate accounting for the uncertainty and play an 8.</p>
                    <hr />

                    <h3>Benefits</h3>
                    <p>A study by Moløkken-Østvold and Haugen[5] reported that planning poker provided accurate estimates of programming task completion time, although
                        estimates by any individual developer who entered a task into the task tracker was just as accurate. Tasks discussed during planning poker rounds
                        took longer to complete than those not discussed and included more code deletions, suggesting that planning poker caused more attention to code quality.
                        Planning poker was considered by the study participants to be effective at facilitating team coordination and discussion of implementation strategies.</p>
                </div>
            </div>
        )
    }
}