import { Button } from "@/components/ui/button";
import { Database } from "@/icons/jenga-icons";
import { matchRepository } from "@/server/repository/match-repository";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your theme
import { UpComingMatchResource } from "./upcoming-match-resource";

async function getMatchList() {
    const matchApi = matchRepository
    const response = await matchApi.getMatchList();
    return response;
}

export default async function Home() {
    const matchDetails = await getMatchList();
    const matchList = matchDetails.data?.matchList.filter(match => match.matchStatus === "Upcoming" && match.sportsType === "Football")

    if (!matchList || matchList.length === 0) {
        return (
            <div className="flex flex-col gap-8 items-center justify-center h-full">
                <div className="w-3/4 text-left">
                    <h1 className="text-3xl font-bold">Upcoming Matches</h1>
                </div>
                <div className="flex-col border-2 border-dashed border-gray-400 rounded-lg w-3/4 min-h-80 flex items-center justify-center text-center p-4 gap-4">
                    <Database size={48} />
                    <div className="text-gray-600 font-bold text-2xl">This is where you will manage your upcoming matches</div>
                    <div className="text-gray-600 text-sm">You can create your matches here and manage your upcoming listed matches</div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white" >Create Match</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4">
            <UpComingMatchResource matchList={matchList || []} />
        </div>
    )
}