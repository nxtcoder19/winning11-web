"use client"
import { EmptyBanner } from "@/app/molecules/empty-banner";
import { Database } from "@/icons/jenga-icons";
import { Contest } from "@/server/repository/contest-repository";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';


export const ContestsResource = ({contestList}: {contestList: Contest[]}) => {

    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const sportsType = searchParams.get('sportsType');

    const onRowClick = (event: DataTableRowClickEvent) => {
        const contest = event.data as Contest;
        router.push(`/match/${params.matchId}/contest/${contest.id}/settings?sportsType=${sportsType}`)
        console.log("Row clicked:", contest.contestName);
    };

    if (!contestList || contestList.length === 0) {
        return <EmptyBanner
            title="Contests"
            description="You can create your contests here and manage your contests"
            iconComponent={<Database size={48} />}
            clickEventName="Create Contest"
            onCLick={() => router.push(`/match/${params.matchId}/add-contest?sportsType=${sportsType}`)}
        />
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Contests</h1>
                <Button onClick={() => router.push(`/match/${params.matchId}/add-contest?sportsType=${sportsType}`)} label="Add Contest" icon="pi pi-plus" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
            </div>
            <div className="card py-4">
                <DataTable  value={contestList} 
                    paginator rows={10}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    tableStyle={{ minWidth: '50rem' }} 
                    onRowClick={onRowClick} selectionMode="single" >
                    <Column field="contestName" header="Contest Name"></Column>
                    <Column field="totalWinningAmount" header="Total Winning Amount"></Column>
                    <Column field="entryAmount" header="Entry Amount"></Column>
                    <Column field="totalSpot" header="Total Spot"></Column>
                </DataTable>
            </div>
        </div>
    )
}