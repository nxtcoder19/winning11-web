"use client"
import { Textfield } from "@/app/atom/textfield";
import { DeleteDialog } from "@/app/molecules/delete-dialog";
// import { DeleteDialog } from "@/app/molecules/delete-dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { handleError } from "@/helpers/errors";
import Yup from "@/helpers/yup";
import useForm from "@/hooks/use-form";
import { Player, playerRepository } from "@/server/repository/player-repository";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";


export const PlayerSettingsResource = ({ playerDetails }: { playerDetails: Player }) => {

    // const params = useParams()
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const searchParams = useSearchParams()
    const playerApi = playerRepository

    const playerTypes = ["wicketkeeper", "batsman", "all-rounder", "bowler"];
    const playerStatus = ["announced", "unannounced", "substitute"];

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your player details has been updated successfully' });
    };

    const handleDelete = async() => {
        try {
            const response = await playerApi.deletePlayer({
                playerId: playerDetails.id,
            })
            console.log("++++", response)

            if (response.isSuccess) {
                console.log('Player deleted successfully!', response.data);
                router.push(`/match/${playerDetails.matchId}/contests?sportsType=${searchParams.get('sportsType')}`);
                router.refresh();
                show();
            }
        } catch (error) {
            handleError(error)
        }
    }

    const {values, handleChange, handleSubmit, resetValues, isLoading} = useForm({
        initialValues: {
            playerName: playerDetails?.playerName,
            displayName: playerDetails?.displayName,
            teamName: playerDetails?.teamName,
            playerType: playerDetails?.playerType,
            playerImage: playerDetails?.playerImage,
            playerPoints: playerDetails?.playerPoints,
            playerCredit: playerDetails?.playerCredit,
            isPlayedLastMatch: playerDetails?.isPlayedLastMatch,
            playerStatus: playerDetails?.playerStatus,
        },
        validationSchema: Yup.object({
            playerName: Yup.string().required('playerName is required'),
            displayName: Yup.string().required('displayName is required'),
            teamName: Yup.string().required('teamName is required'),
            playerType: Yup.string().required('playerType is required'),
            playerImage: Yup.string().required('playerImage is required'),
            playerPoints: Yup.number().required('playerPoints is required'),
            playerCredit: Yup.number().required('playerCredit is required'),
            isPlayedLastMatch: Yup.boolean().required('isPlayedLastMatch is required'),
            playerStatus: Yup.string().required('playerStatus is required'),
        }),
        onSubmit: async (val) => {
            try {
                const response = await playerApi.updatePlayer({
                    playerId: playerDetails.id,
                    playerData: {
                        matchId: playerDetails.matchId,
                        playerName: val.playerName,
                        displayName: val.displayName,
                        teamName: val.teamName,
                        playerType: val.playerType,
                        playerImage: val.playerImage,
                        playerPoints: val.playerPoints,
                        playerCredit: val.playerCredit,
                        isPlayedLastMatch: val.isPlayedLastMatch,
                        playerStatus: val.playerStatus,
                    }
                })
                console.log("++++", response)

                if (response.isSuccess) {
                    console.log('Player updated successfully!', response.data);
                    setIsModified(false);
                    router.refresh();
                    show();
                }
            } catch (error) {
                handleError(error)
            }
        }
    })

    const [isModified, setIsModified] = useState(false);

    // Watch for changes in the form values
    useEffect(() => {
        const isChanged = (Object.keys(values) as Array<keyof typeof values>).some(
            (key) => values[key] !== playerDetails[key]
        );
        
        setIsModified(isChanged);
    }, [values, playerDetails]);

    const handleDiscard = () => {
        resetValues();
        setIsModified(false); 
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <Toast ref={toast} position="bottom-left"/>
            <div className={"border border-b-2 p-4"}>
                <div className="flex flex-row justify-between">                    
                    <h2 className={"text-lg font-semibold"}>Player Details</h2>
                    <div className="flex gap-2">
                        <Button
                            disabled={!isModified}  
                            onClick={handleDiscard}                       
                        >Discard Changes</Button>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
                            onClick={handleSubmit}
                            disabled={isLoading || !isModified}
                        >{isLoading ? "Saving..." : "Save Changes"}</Button>
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Player Name</span>
                        <Textfield
                            placeholder={"Enter your name"}
                            value={values.playerName}
                            type="text"
                            name="playerName"
                            onChange={handleChange("playerName")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Display Name</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={values.displayName}
                            type="text"
                            name="displayName"
                            onChange={handleChange("displayName")}
                        /> 
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Team Name</span>
                        <Textfield
                            placeholder={"Enter your name"}
                            value={values.teamName}
                            type="text"
                            name="teamName"
                            onChange={handleChange("teamName")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Player Image</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={values.playerImage}
                            type="text"
                            name="playerImage"
                            onChange={handleChange("playerImage")}
                        /> 
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Player Points</span>
                        <Textfield
                            placeholder={"Enter your name"}
                            value={String(values.playerPoints)}
                            type="number"
                            name="playerPoints"
                            onChange={handleChange("playerPoints")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Player Credit</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={String(values.playerCredit)}
                            type="number"
                            name="playerCredit"
                            onChange={handleChange("playerCredit")}
                        /> 
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Player Status</span>
                        <Select 
                            value={values.playerStatus}
                            onValueChange={(value) => handleChange("playerStatus")({ target: { value } })}>
                            <SelectTrigger className="w-full border border-solid border-gray-300 rounded">
                                <SelectValue placeholder="Select Player Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Player Status</SelectLabel>
                                    {playerStatus.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Player Type</span>
                        <Select 
                            value={values.playerType}
                            onValueChange={(value) => handleChange("playerType")({ target: { value } })}>
                            <SelectTrigger className="w-full border border-solid border-gray-300 rounded">
                                <SelectValue placeholder="Select Player Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Player Types</SelectLabel>
                                    {playerTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border border-b-2 p-4">
            <h1 className={"text-lg font-semibold py-4"}>Delete And Deactivate Account</h1>
                <div className={"text-sm pb-4"}>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</div>
                <div className={"flex flex-row gap-2 py-2"}>
                    <DeleteDialog deleteContent="Delete Player"  onDelete={handleDelete}/>
                </div>
            </div>

        </div>
    );
};