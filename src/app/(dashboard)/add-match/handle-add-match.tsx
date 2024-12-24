"use client"
import { Textfield } from "@/app/atom/textfield";
import { Button } from "@/components/ui/button";
import Yup from "@/helpers/yup";
import useForm from "@/hooks/use-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

import { formatDate, formatTime } from "@/common/utils-common";
import { handleError } from "@/helpers/errors";
import { matchRepository } from "@/server/repository/match-repository";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";



export const HandleAddMatch = () => {

    const searchParams = useSearchParams();
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const matchApi = matchRepository

    const sportsType = searchParams.get("sportsType");
    const [date, setDate] = useState<Nullable<Date>>(null);
    const [time, setTime] = useState<Nullable<Date>>(null);

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your match details has been added successfully' });
      };

      const getMatchBasedOnSportsType = (sportsType: string) => {
        if (sportsType === "Cricket") {
            return "cricket";
        } else if (sportsType === "Football") {
            return "football";
        } else if (sportsType === "Basket Ball") {
            return "basketball";
        } else if (sportsType === "Volley Ball") {
            return "volleyball";
        }
    }

    const {values, handleChange, handleSubmit, isLoading} = useForm({
        initialValues: {
            sportsType: sportsType || "Cricket",
            matchStatus: "Upcoming",
            seriesName: "",
            matchName: "",
            displayName: "",
            firstTeamName: "",
            secondTeamName: "",
            firstTeamShortName: "",
            secondTeamShortName: "",
            firstTeamLogo: "",
            secondTeamLogo: "",
        },
        validationSchema: Yup.object().shape({
            sportsType: Yup.string().required('sportsType is required'),
            matchStatus: Yup.string().required('matchStatus is required'),
            seriesName: Yup.string().required('seriesName is required'),
            matchName: Yup.string().required('matchName is required'),
            displayName: Yup.string().required('displayName is required'),
            firstTeamName: Yup.string().required('firstTeamName is required'),
            secondTeamName: Yup.string().required('secondTeamName is required'),
            firstTeamShortName: Yup.string().required('firstTeamShortName is required'),
            secondTeamShortName: Yup.string().required('secondTeamShortName is required'),
            firstTeamLogo: Yup.string().required('firstTeamLogo is required'),
            secondTeamLogo: Yup.string().required('secondTeamLogo is required'),
        }),
        onSubmit: async (val) => {
            try {
                const response = await matchApi.addMatch({
                    matchData: {
                        sportsType: val.sportsType,
                        matchStatus: val.matchStatus,
                        seriesName: val.seriesName,
                        matchName: val.matchName,
                        displayName: val.displayName,
                        firstTeamName: val.firstTeamName,
                        secondTeamName: val.secondTeamName,
                        firstTeamShortName: val.firstTeamShortName,
                        secondTeamShortName: val.secondTeamShortName,
                        firstTeamLogo: val.firstTeamLogo,
                        secondTeamLogo: val.secondTeamLogo,
                        matchDay: formatDate(date),
                        matchTime: formatTime(time),
                    }
                })
                console.log("++++", response)                
                if (response.isSuccess) {
                    console.log('Match added successfully!', response.data);                    
                    show();
                    router.push(`${getMatchBasedOnSportsType(val.sportsType)}/upcoming`);
                }
            } catch (error) {
                handleError(error)
            }
        }
    })

    return (
        <div className="flex flex-col gap-4 p-4 h-screen overflow-y-auto">
            <Toast ref={toast} position="bottom-left"/>     
            <h1 className="text-3xl font-bold">Add Match Details</h1>

            <div className={"flex flex-row justify-between gap-2 py-2"}>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>Sports Type</span>
                    <Textfield
                        placeholder={"Enter your name"}
                        value={values.sportsType}
                        type="text"
                        name="sportsType"
                        onChange={handleChange("sportsType")}
                        disabled
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
                        disabled
                    /> 
                </div>
            </div>  
            
            <div className={"flex flex-row justify-between gap-2 py-2"}>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>Series Name</span>
                    <Textfield
                        placeholder={"Enter your name"}
                        value={values.seriesName}
                        type="text"
                        name="seriesName"
                        onChange={handleChange("seriesName")}
                    />
                </div>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>Match Name</span>
                    <Textfield
                        placeholder={"Enter your name"}
                        value={values.matchName}
                        type="text"
                        name="matchName"
                        onChange={handleChange("matchName")}
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

            {/* <div className={"flex flex-row justify-between gap-2 py-2"}>
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
            </div> */}

            <div className={"flex flex-row justify-between gap-2 py-2"}>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>First Team Name</span>
                    <Textfield
                        placeholder={"Enter your name"}
                        value={values.firstTeamName}
                        type="text"
                        name="firstTeamName"
                        onChange={handleChange("firstTeamName")}
                    />
                </div>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>Second Team Name</span>
                    <Textfield 
                        placeholder={"Enter your name"} 
                        value={values.secondTeamName}
                        type="text"
                        name="secondTeamName"
                        onChange={handleChange("secondTeamName")}
                    /> 
                </div>
            </div>

            <div className={"flex flex-row justify-between gap-2 py-2"}>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>First Team Short Name</span>
                    <Textfield
                        placeholder={"Enter your name"}
                        value={values.firstTeamShortName}
                        type="text"
                        name="firstTeamShortName"
                        onChange={handleChange("firstTeamShortName")}
                    />
                </div>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>Second Team Short Name</span>
                    <Textfield 
                        placeholder={"Enter your name"} 
                        value={values.secondTeamShortName}
                        type="text"
                        name="secondTeamShortName"
                        onChange={handleChange("secondTeamShortName")}
                    /> 
                </div>
            </div>

            <div className={"flex flex-row justify-between gap-2 py-2"}>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>First Team Logo</span>
                    <Textfield 
                        placeholder={"Enter your name"} 
                        value={values.firstTeamLogo}
                        type="text"
                        name="firstTeamLogo"
                        onChange={handleChange("firstTeamLogo")}
                    /> 
                </div>
                <div className={"flex-1"}>
                    <span className={"text-sm font-medium"}>Second Team Logo</span>
                    <Textfield 
                        placeholder={"Enter your name"} 
                        value={values.secondTeamLogo}
                        type="text"
                        name="secondTeamLogo"
                        onChange={handleChange("secondTeamLogo")}
                    /> 
                </div>
            </div>

            <div className={"flex flex-row justify-between gap-2 py-2"}>
                <div className={"flex flex-col flex-1"}>
                    <span className={"text-sm font-medium"}>Match Day</span>
                    {/* <span className={"text-sm font-medium"}>Match Day</span> */}
                    <Calendar 
                        className="border border-solid border-gray-300 rounded px-4 py-2"
                        value={date} 
                        onChange={(e) => setDate(e.value)}
                        showIcon  
                      />
                </div>
                <div className={"flex flex-col flex-1"}>
                    <span className={"text-sm font-medium"}>Match Time</span>
                    <Calendar 
                        className="border border-solid border-gray-300 rounded px-4 py-2"
                        value={time} 
                        onChange={(e) => setTime(e.value)} showIcon timeOnly  
                        icon={() => <i className="pi pi-clock" />} 
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
                    onClick={handleSubmit}
                    // disabled={isLoading || !isModified}
                >{isLoading ? "Saving..." : "Save Changes"}</Button>
            </div>
        </div>
    )
}