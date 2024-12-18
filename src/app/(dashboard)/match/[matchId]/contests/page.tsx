// import { cookies } from 'next/headers';

import { contestRepository } from "@/server/repository/contest-repository";
import { ContestsResource } from "./contests-resource";

async function getMContestList({matchId}: {matchId: string}) {
    const contestApi = contestRepository
    const response = await contestApi.getContestList({matchId: matchId});
    return response;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home(props: any) {

    // const cookie = cookies().get("hotspot-session")
    const contestList = await getMContestList({matchId: props.params.matchId})

    return (
        <div className="p-4">
            {/* <h1>Contests Page</h1> */}
            <ContestsResource contestList={contestList.data?.contestList || []} />
        </div>
    )
}