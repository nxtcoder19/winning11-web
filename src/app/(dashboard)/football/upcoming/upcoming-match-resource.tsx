"use client"
import { Match } from "@/server/repository/match-repository";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react';

export const UpComingMatchResource = ({matchList}: {matchList: Match[]}) => {

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
                <Column header="Actions" body={actionTemplate} style={{ width: '6rem' }} />
            </DataTable>
        </div>
    )
}