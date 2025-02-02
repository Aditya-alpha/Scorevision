import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";

export default function ShowScore() {

    const navigate = useNavigate()

    let { username, id } = useParams();
    let [creditScoreData, setCreditScoreData] = useState(null);
    const [value, setValue] = useState(350)
    const min = 350;
    const max = 900;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://scorevision.onrender.com/${username}/showscore/${id}`, {
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
                <div className="text-3xl font-semibold">Loading...</div>
            </div>
        );
    }

    // Correctly map value to an angle between 180 and 0
    const angle = ((value - min) / (max - min)) * 180; // 180 for 350, 0 for 900
    const angleInRadians = angle * (Math.PI / 180);
    const x = 100 - 80 * Math.cos(angleInRadians);
    const y = 100 - 80 * Math.sin(angleInRadians);

    let rating = null

    if (value < 500) { rating = "Bad"; }
    if (value >= 500 && value < 600) { rating = "Poor"; }
    if (value >= 600 && value < 700) { rating = "Good"; }
    if (value >= 700 && value < 800) { rating = "Very Good"; }
    if (value >= 800 && value < 900) { rating = "Excellent"; }

    let suggestion = null

    if (value >= 800) {
        suggestion = "Keep credit utilization under 10%, monitor credit regularly, and enjoy the best rates and perks available.";
    } else if (value >= 750) {
        suggestion = "Use credit strategically, continue paying on time, and take advantage of rewards and better loan terms.";
    } else if (value >= 700) {
        suggestion = "Refinance debts at better rates, maintain low utilization, and limit inquiries.";
    } else if (value >= 650) {
        suggestion = "Optimize credit with diverse types, refinance high-interest debt, and keep monitoring your credit report.";
    } else if (value >= 600) {
        suggestion = "Focus on maintaining low credit utilization and minimizing credit inquiries for better terms.";
    } else if (value >= 550) {
        suggestion = "Continue to remove late payments, avoid high balances, and stay on top of your credit report.";
    } else if (value >= 500) {
        suggestion = "Remove late payments, consolidate debt if possible, and keep utilization low.";
    } else if (value >= 450) {
        suggestion = "Work on debt reduction, use credit responsibly, and diversify your credit with installment loans.";
    } else if (value >= 400) {
        suggestion = "Avoid late payments, pay down high-interest debt, and request credit limit increases to lower utilization.";
    } else if (value >= 350) {
        suggestion = "Establish a payment history with credit-builder loans, reduce debt, and keep credit utilization under 30%.";
    } else {
        suggestion = "Focus on building credit with secured cards or becoming an authorized user, and always pay bills on time.";
    }

    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <div className="bg-gray-200 h-full w-full px-36 max-xl:20px max-lg:px-8 max-md:px-4">
                <div className="flex max-sm:flex-col">
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
                        <div className="absolute w-full text-center top-40 text-6xl font-semibold max-lg:text-4xl max-md:text-3xl">{value}</div>
                        <div className="absolute w-full text-center top-[350px] text-4xl font-semibold max-lg:text-3xl max-md:text-3xl">{rating}</div>
                    </div>
                    <div>
                        <div className="w-96 mt-24 px-6 py-5 bg-white ml-48 shadow-lg h-96 rounded-xl space-y-2 max-xl:w-80 max-xl:ml-40 max-lg:w-72 max-lg:ml-32 max-sm:w-[500px] max-sm:ml-12">
                            <p className="text-xl font-semibold">Individual Credit Score</p>
                            <p>Age Level: {creditScoreData.age_lvl}</p>
                            <p>Assets Level: {creditScoreData.assets_lvl}</p>
                            <p>City Level: {creditScoreData.city_lvl}</p>
                            <p>Debts Level: {creditScoreData.debts_lvl}</p>
                            <p>Dependents Level: {creditScoreData.dep_lvl}</p>
                            <p>Education Level: {creditScoreData.education_lvl}</p>
                            <p>Income Level: {creditScoreData.income_lvl}</p>
                            <p>Installment Level: {creditScoreData.installments_lvl}</p>
                            <p>Late Level: {creditScoreData.late_lvl}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <p className="text-xl font-semibold">Suggestion based on your credit score : {suggestion}</p>
                </div>
                <div className="flex justify-between mt-16">
                    <div className="cursor-pointer">
                        <p onClick={() => { navigate(`/${username}/history`) }} className="text-blue-500 py-2 hover:underline text-lg font-medium hover:scale-110 transition-all duration-200 max-sm:text-base">See History</p>
                    </div>
                    <div className="cursor-pointer">
                        <p onClick={() => { navigate("/") }} className="text-blue-500 px-8 py-2 hover:underline text-lg font-medium hover:scale-110 transition-all duration-200 max-sm:text-base">Return to homepage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

