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
        const [placementData, setPlacementData] = useState({});
        const [sprData, setSprData] = useState({});
        const [avgPlacementData, setAvgPlacementData] = useState({});
        const [avgSprData, setAvgSprData] = useState({});
        const [loading, setLoading] = useState(true);
        const [options, setOptions] = useState({
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgb(71, 71, 71)'
                    },
                    title: {
                        display: true,
                        text: "Tournament",
                        color: 'white'
                    }
                },
                y: {
                    reverse: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgb(71, 71, 71)'
                    },
                    title: {
                        display: true,
                        text: "Placement",
                        color: 'white'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    color: 'white',
                    text: "Tournament Placements"
                },
                legend: {
                    display: false
                }
            },
            elements: {
                point: {
                    radius: 5,
                    backgroundColor: "rgb(110, 41, 230)"
                }
            }
        })

        // Functions to change chart dataset
        const placementMode = () => {
            setData(placementData);
            setOptions({
                ...options,
                scales: {
                    ...options.scales,
                    x: {
                        ...options.scales.x,
                        title: {
                            ...options.scales.x.title,
                            text: "Tournament"
                        }
                    },
                    y: {
                        ...options.scales.y,
                        reverse: true,
                        title: {
                            ...options.scales.y.title,
                            text: "Placement"
                        }
                    }
                },
                plugins: {
                    ...options.plugins,
                    title: {
                        ...options.plugins.title,
                        text: "Tournament Placement"
                    }
                }
            });
        }
        const sprMode = () => {
            setData(sprData);
            setOptions({
                ...options,
                scales: {
                    ...options.scales,
                    x: {
                        ...options.scales.x,
                        title: {
                            ...options.scales.x.title,
                            text: "Tournament"
                        }
                    },
                    y: {
                        ...options.scales.y,
                        reverse: false,
                        title: {
                            ...options.scales.y.title,
                            text: "SPR"
                        }
                    }
                },
                plugins: {
                    ...options.plugins,
                    title: {
                        ...options.plugins.title,
                        text: "SPR (Seed Performance Rating)"
                    }
                }
            })
        }
        const avgPlacementMode = () => {
            setData(avgPlacementData);
            setOptions({
                ...options,
                scales: {
                    ...options.scales,
                    x: {
                        ...options.scales.x,
                        title: {
                            ...options.scales.x.title,
                            text: "Season"
                        }
                    },
                    y: {
                        ...options.scales.y,
                        reverse: true,
                        title: {
                            ...options.scales.y.title,
                            text: "Average Placement"
                        }
                    }
                },
                plugins: {
                    ...options.plugins,
                    title: {
                        ...options.plugins.title,
                        text: "Average Placement by Season"
                    }
                }
            })
        }
        const avgSprMode = () => {
            setData(avgSprData);
            setOptions({
                ...options,
                scales: {
                    ...options.scales,
                    x: {
                        ...options.scales.x,
                        title: {
                            ...options.scales.x.title,
                            text: "Season"
                        }
                    },
                    y: {
                        ...options.scales.y,
                        reverse: false,
                        title: {
                            ...options.scales.y.title,
                            text: "Average SPR"
                        }
                    }
                },
                plugins: {
                    ...options.plugins,
                    title: {
                        ...options.plugins.title,
                        text: "Average SPR by Season"
                    }
                }
            })
        }

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

                // Calc stats for each season
                for (let i = 0; i < seasons.length; i++) {
                    let currentTournaments = tournaments.filter((tournament => tournament.season === seasons[i]))

                    await calcSeasonStats(currentTournaments, seasons[i], playerName).then(response => {
                        dataHolder.push(response);
                    });
                }

                const placingBySeason = dataHolder.map(season => season.avgPlacement)
                const sprBySeason = dataHolder.map(season => season.avgSpr);

                // Objects to plug into Chart.js
                const avgPlacementObject = {
                    labels: uniqueSeasons,
                    datasets: [
                        {
                            label: "Average Placement",
                            data: placingBySeason,
                            borderColor: "rgb(110, 41, 230)"
                        }
                    ]
                }
                const avgSprObject = {
                    labels: uniqueSeasons,
                    datasets: [
                        {
                            label: "Average SPR",
                            data: sprBySeason,
                            borderColor: "rgb(110, 41, 230)"
                        }
                    ]
                }

                setAvgPlacementData(avgPlacementObject);
                setAvgSprData(avgSprObject);

                // Sort tournaments by season and episode (ascending) for x-axis purposes
                const sortedTournaments = filteredTournaments.sort((a, b) => a.season - b.season || a.episode - b.episode)
                const seasonsArray = sortedTournaments.map(tournament => `S${tournament.season}E${tournament.episode}`)
                const placements = sortedTournaments.map(tournament => tournament.placement);
                const sprs = sortedTournaments.map(tournament => tournament.spr);

                // Objects to plug into Chart.js
                const placementObject = {
                    labels: seasonsArray,
                    datasets: [
                        {
                            label: "Placement",
                            data: placements,
                            borderColor: "rgb(110, 41, 230)"
                        }
                    ]
                }
                const sprObject = {
                    labels: seasonsArray,
                    datasets: [
                        {
                            label: "SPR",
                            data: sprs,
                            borderColor: "rgb(110, 41, 230)"
                        }
                    ]
                }


                setPlacementData(placementObject);
                setSprData(sprObject);

                // Start the chart on placement by tournament
                setData(placementObject);
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
            <div>
                <div className="flex flex-row content-center justify-center gap-2 mb-5">
                    <button onClick={placementMode} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{'backgroundColor': 'rgb(110, 41, 230)'}}>Placement</button>
                    <button onClick={sprMode} className="focus:outline-none text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{'backgroundColor': 'rgb(110, 41, 230)'}}>SPR</button>
                    <button onClick={avgPlacementMode} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{'backgroundColor': 'rgb(110, 41, 230)'}}>Avg Placement</button>
                    <button onClick={avgSprMode} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{'backgroundColor': 'rgb(110, 41, 230)'}}>Avg SPR</button>
                </div>
                <Line options={options} data={data} />
            </div>
            }
        </div>
    )
}
