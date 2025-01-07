"use client"
import { EmptyBanner } from "@/app/molecules/empty-banner";
import { Database } from "@/icons/jenga-icons";
import { Match } from "@/server/repository/match-repository";
import { usePathname, useRouter } from "next/navigation";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react';

export const UpComingMatchResource = ({ matchList, matchType }: { matchList: Match[], matchType: string }) => {

    const pathname = usePathname();
    const router = useRouter();
    const pathSegments = pathname?.split('/').filter(Boolean); // Split and remove empty segments

    const [section, page] = pathSegments; // Extract 'cricket' and 'upcoming'

    console.log("Section:", section); // Should log "cricket"
    console.log("Page:", page);

    // const menuRefs = useRef<{ [key: string]: any }>({});
    const menuRefs = useRef<{ [key: string]: React.RefObject<Menu> }>({});

    const actionTemplate = (rowData: Match) => {
        const menuRef = menuRefs.current[rowData.id] || React.createRef();
        menuRefs.current[rowData.id] = menuRef;

        const menuItems = [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                command: () => handleSettings(rowData)
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => handleEdit(rowData)
            }
        ];

        return (
            <>
                <Menu model={menuItems} popup ref={menuRef} />
                <Button
                    icon="pi pi-ellipsis-v"
                    onClick={(e) => menuRef.current?.toggle(e)}
                    // className="p-button-rounded p-button-text"
                    aria-label="Options"
                />
            </>
        );
    };

    const handleSettings = (match: Match) => {
        console.log("Settings clicked for:", match);
        // Add your settings handling logic here
    };

    const handleEdit = (match: Match) => {
        console.log("Edit clicked for:", match);
        // Add your edit handling logic here
    };

    const onRowClick = (event: DataTableRowClickEvent) => {
        const match = event.data as Match; // Cast event.data to Match type
        router.push(`/match/${match.id}/contests?sportsType=${match.sportsType}`)
        console.log("Row clicked:", match.matchStatus);
    };

    if (!matchList || matchList.length === 0) {
        return <EmptyBanner
        //  heading="Upcoming Matches"
         title="Upcoming Matches"
         description="You can create your matches here and manage your upcoming listed matches"
         iconComponent={<Database size={48} />}
         clickEventName="Create Match"
         onCLick={() => router.push(`/add-match?sportsType=${matchType}`)}/>
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Upcoming Matches</h1>
                <Button onClick={() => router.push(`/add-match?sportsType=${matchType}`)} label="Add Match" icon="pi pi-plus" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
            </div>
            <div className="card py-4">
                <DataTable value={matchList} tableStyle={{ minWidth: '50rem' }}
                    onRowClick={onRowClick} selectionMode="single" >
                    <Column field="sportsType" header="Sports Type"></Column>
                    <Column field="matchStatus" header="Match Status"></Column>
                    <Column field="matchDay" header="Match Day"></Column>
                    <Column field="matchTime" header="Match Time"></Column>
                    <Column header="Actions" body={actionTemplate} style={{ width: '6rem' }} />
                </DataTable>
            </div>
        </div>
    )
}