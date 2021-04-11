import React from "react";
import axios from "axios";
import "./styles.css";

export default class App extends React.Component {
  state = {
      rankList: null,
  };
  componentDidMount() {
    axios.get("/rankList").then((response) => {
      this.setState({ rankList: response.data });
    });
  }
  render() {
    return (
        this.state.rankList && 
        <table class="styled-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.rankList.map(participant => {
                        return (
                            <tr>
                                <td>{participant.name}</td>
                                <td>{participant.score}</td>
                            </tr>
                        );
                    })
                }  
            </tbody>
        </table>
    );
  }
}