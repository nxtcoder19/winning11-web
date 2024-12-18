"use client"
import { Player } from "@/server/repository/player-repository";
import { Button } from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';

export const PlayersResource = ({playersList}: {playersList: Player[]}) => {

    const onRowClick = (event: DataTableRowClickEvent) => {
        const match = event.data as Player; // Cast event.data to Match type
        // router.push(`/match/${match.id}`);
        console.log("Row clicked:", match.playerName);
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Players</h1>
                <Button label="Add Player" icon="pi pi-plus" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
            </div>
            <div className="card py-4">
                <DataTable  value={playersList} paginator rows={10}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    tableStyle={{ minWidth: '50rem' }} 
                    onRowClick={onRowClick} selectionMode="single" >
                    <Column field="teamName" header="Team Name"></Column>
                    <Column field="playerName" header="Player Name"></Column>
                    <Column field="playerType" header="Player Type"></Column>
                    <Column field="playerStatus" header="Player Status"></Column>
                </DataTable>
            </div>
        </div>
    )
}