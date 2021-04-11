import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Table, Modal, Header } from 'semantic-ui-react';

const PointsForm = (props) => {
    const { players } = props;

    const teams = {};
    players.forEach(player => {
        if(!teams[player.team]) {
            teams[player.team] = [];
        }
        teams[player.team].push(player.name);
    });

    const [pointsInfo, setPointsInfo] = useState({});
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <React.Fragment>
            {
                Object.keys(teams).map(team => {
                    return (
                        <React.Fragment>
                            <h1> {team} </h1>
                            <Table className="form-table" basic key={team}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Player</Table.HeaderCell>
                                        <Table.HeaderCell>Enter Points to add</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        teams[team].map(player => {
                                            return (
                                                <Table.Row>
                                                    <Table.Cell>{player}</Table.Cell>
                                                    <Table.Cell>
                                                        <Input 
                                                            onChange={(event) => {
                                                                const newPointsInfo = {...pointsInfo};
                                                                newPointsInfo[player] = event.target.value;
                                                                setPointsInfo(newPointsInfo);
                                                            }}
                                                            value={pointsInfo[player] ? pointsInfo[player] : ''}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    }
                                </Table.Body>
                            </Table>

                            <Button className="submit-button" onClick={async () => {
                                setModalOpen(true);
                            }}>
                                Submit
                            </Button>

                            <Modal
                                open={modalOpen}
                                onOpen={() => setModalOpen(true)}
                                onClose={() => setModalOpen(false)}
                            >
                                <Modal.Description>
                                    <Header>Enter Password:</Header>
                                    <Input 
                                        value={password ? password : ''}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                    <Button
                                        onClick={async () => {
                                            const postData = {};
                                            Object.keys(pointsInfo).forEach(player => {
                                                if(pointsInfo[player] == parseInt(pointsInfo[player], 10)) {
                                                    postData[player] = parseInt(pointsInfo[player], 10);
                                                }
                                            });
                                            setPointsInfo({});

                                            const response = await axios.post('/auction/updateScores', {
                                                pointsInfo,
                                                password,
                                            });

                                            if(response.data === 'error') {
                                                alert('fuck off, kid');
                                            } else {
                                                alert('Success');
                                            }
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Modal.Description>
                            </Modal>
                        </React.Fragment>
                    );
                })
            }
        </React.Fragment>
    );
};

export default PointsForm;