"use client"
import { EmptyBanner } from "@/app/molecules/empty-banner";
import { Database } from "@/icons/jenga-icons";
import { Match } from "@/server/repository/match-repository";
import { useRouter } from "next/navigation";
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';


export const CompletedMatchResource = ({matchList, matchType}: {matchList: Match[], matchType: string}) => {
    
    const router = useRouter(); 

    const onRowClick = (event: DataTableRowClickEvent) => {
        const match = event.data as Match; // Cast event.data to Match type
        router.push(`/match/${match.id}/contests?sportsType=${match.sportsType}`)
        console.log("Row clicked:", match.matchStatus);
    };

    if (!matchList || matchList.length === 0) {
        return <EmptyBanner
         heading="Completed Matches"
         title="Completed Matches"
         description="You can create your matches here and manage your upcoming listed matches"
         iconComponent={<Database size={48} />}
         clickEventName="Create Match"
         onCLick={() => router.push(`/add-match?sportsType=${matchType}`)}/>
    }

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