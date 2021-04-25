import React, {useCallback, useState} from 'react';
import { Accordion, List, Image } from 'semantic-ui-react';

const teamIcons = {
    MI: 'https://www.mumbaiindians.com/favicon.ico',
    RCB: 'https://www.searchpng.com/wp-content/uploads/2019/02/Royal-Challengers-Bangalore-Logo-PNG.png',
    RR: 'https://www.blenheimchalcot.com/wp-content/uploads/2018/07/rrlogo_with_whiteborder-1.png',
    DC: 'https://www.delhicapitals.in/static-assets/images/cssimages/dd-logo.svg',
    CSK: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
    PBKS: 'https://www.punjabkingsipl.in/static-assets/images/cssimages/logo.svg?v=2.3',
    SRH: 'https://www.sunrisershyderabad.in/dist/img/srh-logo.gif',
    KKR: 'https://www.kkr.in/static-assets/images/cssimages/logo.svg?v1.1',
};

const RankList = (props) => {
    const { rankList, players } = props;
    
    const [accordionIndex, setAccordionIndex] = useState(-1);

    const handleClick = useCallback((e, titleProps) => {
        const { index } = titleProps
        const newIndex = accordionIndex === index ? -1 : index
        setAccordionIndex(newIndex);
    }, [accordionIndex]);

    if(!rankList) {
        return null;
    }

    const playersTeamMap = {};
    players.forEach(player => {
        playersTeamMap[player.name] = player.team;
    });

    return (
        <Accordion>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    rankList.map((participant, index) => {
                        return (
                            <React.Fragment>
                                <tr>
                                    <td>#{index+1}</td>
                                    <Accordion.Title
                                        active={accordionIndex === 0}
                                        index={index}
                                        onClick={handleClick}
                                    >
                                        <td>{participant.name}</td>
                                    </Accordion.Title>
                                    <Accordion.Content active={accordionIndex === index}>
                                        <List verticalAlign="middle">
                                        {
                                            participant.players.map((player) => {
                                                let designation = '';
                                                if(participant.captain === player) {
                                                    deisngation = '(C)';
                                                } else if(participant.viceCaption === player) {
                                                    designation = '(VC)';
                                                }
                                                return (
                                                    <List.Item>
                                                        <Image avatar src={teamIcons[playersTeamMap[player]]} />
                                                        <List.Content>
                                                            <List.Header>{player} {designation}</List.Header>
                                                        </List.Content>
                                                    </List.Item>
                                                );
                                            })
                                        }
                                        </List>
                                    </Accordion.Content>
                                    <td>{participant.score}</td>
                                </tr>
                            </React.Fragment>
                        );
                    })
                }
            </tbody>
        </table>
        </Accordion>
    );
};

export default RankList;