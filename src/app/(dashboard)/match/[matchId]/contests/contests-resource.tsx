"use client"
import { Contest } from "@/server/repository/contest-repository";
import { useParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';

export const ContestsResource = ({contestList}: {contestList: Contest[]}) => {

    const router = useRouter();
    const params = useParams()

    const onRowClick = (event: DataTableRowClickEvent) => {
        const contest = event.data as Contest; // Cast event.data to Match type
        // router.push(`/match/${match.id}`);
        console.log("Row clicked:", contest.contestName);
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Contests</h1>
                <Button onClick={() => router.push(`/match/${params.matchId}/add-contest`)} label="Add Contest" icon="pi pi-plus" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
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