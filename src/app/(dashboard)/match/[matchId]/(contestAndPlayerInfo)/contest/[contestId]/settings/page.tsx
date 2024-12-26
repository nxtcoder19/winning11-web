/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/server/api-call";
import { Contest, contestRepository } from "@/server/repository/contest-repository";
import { ContestSettingsResource } from "./contest-settings-resource";

async function getContest({contestId}: {contestId: string}): Promise<ApiResponse<Contest>> {
    const contestApi = contestRepository
    const response = await contestApi.getContest({contestId: contestId});
    return response;
}

export default async function Home( props: any ) {
    const contestDetails = await getContest({contestId: props.params.contestId})
    return (
        <div>
            <ContestSettingsResource contestDetails={contestDetails.data as Contest} />
        </div>
    )
}