import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";

export default function ShowScore() {
    let { username, id } = useParams();
    let [creditScoreData, setCreditScoreData] = useState(null);
    const [value, setValue] = useState(350); // Default value
    const min = 350;
    const max = 900;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/${username}/showscore/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setCreditScoreData(data);
            setValue(data.creditscore);
        };
        fetchData();
    }, [username, id]);

    if (creditScoreData === null) {
        return (
            <div className="flex flex-col items-center">
                <div>Loading...</div>
            </div>
        );
    }

    // Correctly map value to an angle between 180 and 0
    const angle = ((value - min) / (max - min)) * 180; // 180 for 350, 0 for 900
    const angleInRadians = angle * (Math.PI / 180);
    const x = 100 - 80 * Math.cos(angleInRadians);
    const y = 100 - 80 * Math.sin(angleInRadians);

    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <div className="bg-gray-200 h-full w-full px-36">
                <div className="relative w-[600px] h-96">
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 100">
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: "red", stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "green", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Arc Path with Gradient */}
                        <path
                            d="M 10 100 A 90 90 0 0 1 190 100"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="10"
                        />

                        {/* Pointer */}
                        <line
                            x1="100"
                            y1="100"
                            x2={x}
                            y2={y}
                            stroke="red"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute w-full text-center top-40 text-6xl font-semibold">{value}</div>
                </div>
            </div>
        </div>
    );
}