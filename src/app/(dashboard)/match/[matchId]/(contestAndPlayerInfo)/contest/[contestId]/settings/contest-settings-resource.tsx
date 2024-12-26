"use client"
import { Textfield } from "@/app/atom/textfield";
import { Button } from "@/components/ui/button";
import { handleError } from "@/helpers/errors";
import Yup from "@/helpers/yup";
import useForm from "@/hooks/use-form";
import { Contest, contestRepository } from "@/server/repository/contest-repository";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

export const ContestSettingsResource = ({ contestDetails }: { contestDetails: Contest }) => {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const contestApi = contestRepository

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your contest details has been updated successfully' });
    };

    const {values, handleChange, handleSubmit, resetValues, isLoading} = useForm({
        initialValues: {
            contestName: contestDetails?.contestName,
            displayName: contestDetails?.displayName,
            totalWinningAmount: contestDetails?.totalWinningAmount,
            entryAmount: contestDetails?.entryAmount,
            discountAmount: contestDetails?.discountAmount,
            totalSpot: contestDetails?.totalSpot,
            availableSpot: contestDetails?.availableSpot,
            firstPrice: contestDetails?.firstPrice,
            winningPercentage: contestDetails?.winningPercentage,
            maximumAllowedTeams: contestDetails?.maximumAllowedTeams,
            isFlexible: contestDetails?.isFlexible,
            flexibleInstructions: contestDetails?.flexibleInstructions,
            winnings: contestDetails?.winnings,
        },
        validationSchema: Yup.object({
            contestName: Yup.string().required('contestName is required'),
            displayName: Yup.string().required('displayName is required'),
            totalWinningAmount: Yup.number().required('totalWinningAmount is required'),
            entryAmount: Yup.number().required('entryAmount is required'),
            discountAmount: Yup.number().required('discountAmount is required'),
            totalSpot: Yup.number().required('totalSpot is required'),
            availableSpot: Yup.number().required('availableSpot is required'),
            firstPrice: Yup.number().required('firstPrice is required'),
            winningPercentage: Yup.number().required('winningPercentage is required'),
            maximumAllowedTeams: Yup.number().required('maximumAllowedTeams is required'),
            isFlexible: Yup.boolean().required('isFlexible is required'),   
            flexibleInstructions: Yup.string().required('flexibleInstructions is required'),
            winnings: Yup.array().of(Yup.object().shape({
                rank: Yup.string().required('rank is required'),
                winningAmount: Yup.string().required('winningAmount is required'),
            })),
        }),
        onSubmit: async (val) => {
            try {
                const response = await contestApi.updateContest({
                    contestId: contestDetails.id,
                    contestData: {
                        matchId: contestDetails.matchId,
                        contestName: val.contestName,
                        displayName: val.displayName,
                        totalWinningAmount: val.totalWinningAmount,
                        entryAmount: val.entryAmount,
                        discountAmount: val.discountAmount,
                        totalSpot: val.totalSpot,
                        availableSpot: val.availableSpot,
                        firstPrice: val.firstPrice,
                        winningPercentage: val.winningPercentage,
                        maximumAllowedTeams: val.maximumAllowedTeams,
                        isFlexible: val.isFlexible,
                        flexibleInstructions: val.flexibleInstructions,
                        winnings: val.winnings,
                    }
                })
                console.log("++++", response)

                if (response.isSuccess) {
                    console.log('Contest updated successfully!', response.data);
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
            (key) => values[key] !== contestDetails[key]
        );
        
        setIsModified(isChanged);
    }, [values, contestDetails]);

    const handleDiscard = () => {
        resetValues();
        setIsModified(false); 
    };  

    return (
        <div className="flex flex-col gap-4 p-4">
            <Toast ref={toast} position="bottom-left"/>
            <div className={"border border-b-2 p-4"}>
                <div className="flex flex-row justify-between">                    
                    <h2 className={"text-lg font-semibold"}>Contest Details</h2>
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
                        <span className={"text-sm font-medium"}>Contest Name</span>
                        <Textfield
                            placeholder={"Enter your name"}
                            value={values.contestName}
                            type="text"
                            name="contestName"
                            onChange={handleChange("contestName")}
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
                        <span className={"text-sm font-medium"}>Winning Amount</span>
                        <Textfield
                            placeholder={"Enter entry amount"}
                            value={String(values.totalWinningAmount)}
                            type="number"
                            name="totalWinningAmount"
                            onChange={handleChange("totalWinningAmount")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Entry Amount</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={String(values.entryAmount)}
                            type="number"
                            name="entryAmount"
                            onChange={handleChange("entryAmount")}
                        /> 
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Discount Amount</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={String(values.discountAmount)}
                            type="number"
                            name="discountAmount"
                            onChange={handleChange("discountAmount")}
                        /> 
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Total spot</span>
                        <Textfield
                            placeholder={"Enter entry amount"}
                            value={String(values.totalSpot)}
                            type="number"
                            name="totalSpot"
                            onChange={handleChange("totalSpot")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Available Spot</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={String(values.availableSpot)}
                            type="number"
                            name="availableSpot"
                            onChange={handleChange("availableSpot")}
                        /> 
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Winning Percentage</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={String(values.winningPercentage)}
                            type="number"
                            name="winningPercentage"
                            onChange={handleChange("winningPercentage")}
                        /> 
                    </div>
                </div>
                <div className={"flex flex-row justify-between gap-2 py-2"}>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>First Price</span>
                        <Textfield
                            placeholder={"Enter entry amount"}
                            value={String(values.firstPrice)}
                            type="number"
                            name="firstPrice"
                            onChange={handleChange("firstPrice")}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Maximum Allowed Teams</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={String(values.maximumAllowedTeams)}
                            type="number"
                            name="maximumAllowedTeams"
                            onChange={handleChange("maximumAllowedTeams")}
                        /> 
                    </div>
                    <div className={"flex-1"}>
                        <span className={"text-sm font-medium"}>Flexible Instructions</span>
                        <Textfield 
                            placeholder={"Enter your name"} 
                            value={values.flexibleInstructions}
                            type="text"
                            name="flexibleInstructions"
                            onChange={handleChange("flexibleInstructions")}
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}   
