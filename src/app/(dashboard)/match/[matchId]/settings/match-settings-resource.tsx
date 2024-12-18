"use client"
import { Textfield } from "@/app/atom/textfield";
import { Button } from "@/components/ui/button";
import { handleError } from "@/helpers/errors";
import Yup from "@/helpers/yup";
import useForm from "@/hooks/use-form";
import { Match, matchRepository } from "@/server/repository/match-repository";
import { useRouter } from "next/navigation";
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";

export const MatchSettings = ({matchDetails}: {matchDetails: Match}) => {

    const matchApi = matchRepository
    const router = useRouter();
    const toast = useRef<Toast>(null);

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your match details has been updated successfully' });
    };

    const {values, handleChange, handleSubmit, resetValues, isLoading} = useForm({
        initialValues: {
            sportsType: matchDetails?.sportsType,
            matchStatus: matchDetails?.matchStatus,
            matchName: matchDetails?.matchName,
            seriesName: matchDetails?.seriesName,
            firstTeamName: matchDetails?.firstTeamName,
            firstTeamShortName: matchDetails?.firstTeamShortName,
            secondTeamName: matchDetails?.secondTeamName,
            secondTeamShortName: matchDetails?.secondTeamShortName,
            matchDay: matchDetails?.matchDay,
            matchTime: matchDetails?.matchTime,
        },
        validationSchema: Yup.object({
            sportsType: Yup.string().required('sportsType is required'),
            matchStatus: Yup.string().required('matchStatus is required'),
            matchName: Yup.string().required('matchName is required'),
            seriesName: Yup.string().required('seriesName is required'),
            firstTeamName: Yup.string().required('firstTeamName is required'),
            firstTeamShortName: Yup.string().required('firstTeamShortName is required'),
            secondTeamName: Yup.string().required('secondTeamName is required'),
            secondTeamShortName: Yup.string().required('secondTeamShortName is required'),
            matchDay: Yup.string().required('matchDay is required'),
            matchTime: Yup.string().required('matchTime is required'),
        }),
        onSubmit: async (val) => {
            try {
                const response = await matchApi.updateMatch({
                    matchId: matchDetails.id,
                    matchData: {
                        id: matchDetails.id,
                        displayName: matchDetails.displayName,
                        sportsType: val.sportsType,
                        matchStatus: val.matchStatus,
                        matchName: val.matchName,
                        seriesName: val.seriesName,
                        firstTeamName: val.firstTeamName,
                        firstTeamShortName: val.firstTeamShortName,
                        firstTeamLogo: matchDetails.firstTeamLogo,
                        secondTeamLogo: matchDetails.secondTeamLogo,
                        secondTeamName: val.secondTeamName,
                        secondTeamShortName: val.secondTeamShortName,
                        matchDay: val.matchDay,
                        matchTime: val.matchTime,
                    },
                });
                console.log("++++", response)

                if (response.isSuccess) {
                    console.log('Match updated successfully!', response.data);
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
            (key) => values[key] !== matchDetails[key]
        );
        
        setIsModified(isChanged);
    }, [values, matchDetails]);

    const handleDiscard = () => {
        resetValues();
        setIsModified(false); 
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <Toast ref={toast} position="bottom-left"/>
            <div className={"border border-b-2 p-4"}>
                <div className="flex flex-row justify-between">                    
                    <h2 className={"text-lg font-semibold"}>Match Details</h2>
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
                        <span className={"text-sm font-medium"}>Sports Type</span>
                        <Textfield 
                            placeholder={"Enter your name"}
                            value={values.sportsType}
                            type="text"
                            name="sportsType"
                            onChange={handleChange("sportsType")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Match Status</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={values.matchStatus}
                            type="text"
                            name="matchStatus"
                            onChange={handleChange("matchStatus")}
                        /> 
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Match Name</span>
                        <Textfield 
                            // placeholder={"Enter your email address"}
                            value={values.matchName}
                            type="text"
                            name="matchName"
                            onChange={handleChange("matchName")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Series Name</span>
                        <Textfield 
                            placeholder={"Enter your mobile number"}
                            value={values.seriesName}
                            type="text"
                            name="seriesName"
                            onChange={handleChange("seriesName")}
                        />
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>First Team Name</span>
                        <Textfield 
                        placeholder={"Enter your email address"}
                        value={values.firstTeamName}
                        type="text"
                        name="firstTeamName"
                        onChange={handleChange("firstTeamName")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>First Team Short Name</span>
                        <Textfield 
                        placeholder={"Enter your mobile number"} 
                        value={values.firstTeamShortName}
                        type="text"
                        name="firstTeamShortName"
                        onChange={handleChange("firstTeamShortName")}
                        />
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Second Team Name</span>
                        <Textfield 
                            placeholder={"Enter your email address"} 
                            value={values.secondTeamName}
                            type="text"
                            name="secondTeamName"
                            onChange={handleChange("secondTeamName")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Second Team Short Name</span>
                        <Textfield 
                            placeholder={"Enter your mobile number"} 
                            value={values.secondTeamShortName}
                            type="text"
                            name="secondTeamShortName"
                            onChange={handleChange("secondTeamShortName")}
                        />
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Match Day</span>
                        <Textfield 
                            placeholder={"Enter your email address"} 
                            value={values.matchDay}
                            type="text"
                            name="matchDay"
                            onChange={handleChange("matchDay")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Match Time</span>
                        <Textfield placeholder={"Enter your mobile number"} value={values.matchTime}/>
                    </div>
                </div>
            </div>
        </div>
    )
}