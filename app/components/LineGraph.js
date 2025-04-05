import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { calcSeasonStats } from "../playerCardFunctions";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import LoadingSpinner from "./LoadingSpinner";

export default function LineGraph(props) {
        const { tournaments, playerName } = props;
        const [data, setData] = useState({
            datasets: []
        });
        const [avgPlacementData, setAvgPlacementData] = useState({});
        const [avgSprData, setAvgSprData] = useState({});
        const [loading, setLoading] = useState(true);

        let options = {
            responsive: true,
            yAxes: [
                {
                    reverse: true
                }
            ],
            plugins: {
                title: {
                    display: true,
                    text: "Average Placement by Season"
                }
            },
            elements: {
                point: {
                    radius: 5,
                    backgroundColor: "rgb(110, 41, 230)"
                }
            }
        };

        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

        // Tournaments with season 0 are 'special' tournaments, so we don't wish to include them on the player card.
        const filteredTournaments = tournaments.filter(tournament => tournament.season !== 0);

        // Source: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
        const uniqueSeasons = [...new Set(filteredTournaments.map(tournament => tournament.season))].sort((a, b) => (a-b));

        useEffect(() => {
            const getStats = async (tournaments, seasons, playerName) => {
                let dataHolder = [];

                for (let i = 0; i < seasons.length; i++) {
                    let currentTournaments = tournaments.filter((tournament => tournament.season === seasons[i]))

                    await calcSeasonStats(currentTournaments, seasons[i], playerName).then(response => {
                        dataHolder.push(response);
                    });
                }

                const placingBySeason = dataHolder.map(season => season.avgPlacement)
                const sprBySeason = dataHolder.map(season => season.avgSpr);

                const placementData = {
                    labels: uniqueSeasons,
                    datasets: [
                        {
                            label: "Average Placement",
                            data: placingBySeason,
                            borderColor: "rgb(110, 41, 230)"
                        }
                    ]
                }

                const sprData = {
                    labels: uniqueSeasons,
                    datasets: [
                        {
                            label: "Average SPR",
                            data: sprBySeason,
                            borderColor: "rgb(110, 41, 230)"
                        }
                    ]
                }

                setAvgPlacementData(placementData);
                setAvgSprData(sprData);
                setData(placementData);
            }

            setLoading(true);
            getStats(tournaments, uniqueSeasons, playerName);
            setLoading(false);
        }, [])

    return (
        <div className="w-[50%]">
            { loading ?
            <LoadingSpinner />
            :
            <Line options={options} data={data} />
            }
        </div>
    )
}
