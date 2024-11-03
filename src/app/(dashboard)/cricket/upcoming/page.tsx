import { matchRepository } from "@/server/repository/match-repository";

async function getMatchList() {
    const matchApi = matchRepository
    const response = await matchApi.getMatchList();
    console.log("+++++++++++++++++++++++++++++++", response.data)
    return response;
}

export default async function Home() {
    const matchDetails = await getMatchList();
    console.log("------------", (matchDetails.data))

    return (
        <div>
            <h1>upcoming Cricket</h1>
        </div>
    )
}