"use client"
import { Match } from "@/server/repository/match-repository";
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';

export const LiveMatchResource = ({matchList}: {matchList: Match[]}) => {

    

    const onRowClick = (event: DataTableRowClickEvent) => {
        const match = event.data as Match; // Cast event.data to Match type
        // router.push(`/match/${match.id}`);
        console.log("Row clicked:", match.matchStatus);
    };

    return (
        <div className="card">
            <DataTable  value={matchList}  tableStyle={{ minWidth: '50rem' }} 
            onRowClick={onRowClick} selectionMode="single" >
                <Column field="sportsType" header="Sports Type"></Column>
                <Column field="matchStatus" header="Match Status"></Column>
                <Column field="matchDay" header="Match Day"></Column>
                <Column field="matchTime" header="Match Time"></Column>
            </DataTable>
        </div>
    )
}