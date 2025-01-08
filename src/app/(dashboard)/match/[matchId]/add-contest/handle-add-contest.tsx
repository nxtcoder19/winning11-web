/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Textfield } from '@/app/atom/textfield';
import { handleError } from '@/helpers/errors';
import Yup from '@/helpers/yup';
import useForm from '@/hooks/use-form';
import { contestRepository } from '@/server/repository/contest-repository';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Toast } from 'primereact/toast';
import { useRef, useState } from "react";


// type StepperRefType = {
//     nextCallback: () => void;
//     prevCallback: () => void;
// };


export const HandleAddContest = () => {

    const [winnings, setWinnings] = useState<{ rank: string; winningAmount: string }[]>([]);
    const [newWinning, setNewWinning] = useState({ rank: '', winningAmount: '' });

    // const stepperRef = useRef(null);
    const contestApi = contestRepository
    // const stepperRef = useRef<StepperRefType | null>(null);
    const stepperRef = useRef<any>(null);

    const params = useParams()
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const searchParams = useSearchParams()

    // const matchId = params.matchId
    const matchId = Array.isArray(params.matchId) ? params.matchId[0] : params.matchId;

    const show = () => {
        toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your match details has been updated successfully' });
    };


    const {values, handleChange, handleSubmit, isLoading} = useForm({
        initialValues: {
            contestName: "",
            displayName: "",
            totalWinningAmount: 0,
            entryAmount: 0,
            discountAmount: 0,
            totalSpot: 0,
            availableSpot: 0,
            firstPrice: 0,
            winningPercentage: 0,
            maximumAllowedTeams: 0,
            isFlexible: false,
            flexibleInstructions: "In case of tie, winning amount will be shared",
            winnings: [],
        },
        validationSchema: Yup.object().shape({
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
            console.log(val);
            console.log("winnings", winnings);
            try {
                const response = await contestApi.addContest({
                    contestData: {
                        matchId: matchId,
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
                        winnings: winnings,
                    }
                })
                console.log("++++", response)

                if (response.isSuccess) {
                    console.log('Contest added successfully!', response.data);                    
                    show();
                    router.push(`/match/${matchId}/contests?sportsType=${searchParams.get('sportsType')}`);
                    router.refresh();
                }
            } catch (error) {
                handleError(error)
            }
        }
    })

    const addWinningEntry = () => {
        if (newWinning.rank && newWinning.winningAmount) {
            setWinnings([...winnings, newWinning]);
            setNewWinning({ rank: '', winningAmount: '' });
        }
    };

    const removeWinningEntry = (index: number) => {
        const updatedWinnings = winnings.filter((_, i) => i !== index);
        setWinnings(updatedWinnings);
    };

    // const saveAllEntries = () => {
    //     console.log('Saved Winnings:', winnings);
    //     // You can integrate API calls or other logic here
    // };

    return (
        <div className="flex flex-col card flex-1 justify-content-center gap-4">   
            <Toast ref={toast} position="bottom-left"/>     
            <div className="flex flex-row items-center justify-between gap-4 py-2 border-b-2 border-dashed">
                <button
                    onClick={() => router.push(`/match/${matchId}/contests?sportsType=${searchParams.get('sportsType')}`)}
                    className="text-gray-600 hover:text-indigo-600 font-semibold px-2"
                >
                    ← Back
                </button>
                <h1 className="flex text-3xl font-bold justify-center items-center flex-grow text-center">
                    Add Contest Details
                </h1>
            </div>
            <Stepper  ref={stepperRef} >
                <StepperPanel header="Contest Details">
                    <div className="flex flex-col h-12rem">
                        {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div> */}
                        {/* <h2 className='text-4xl font-bold'>Contest Details</h2> */}
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
                    <div className="flex pt-4 justify-content-end">
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
                    </div>
                </StepperPanel>
                <StepperPanel header="Winning Details">
                    <div className="flex flex-col h-12rem">
                        {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div> */}
                        {winnings.map((win, index) => (
                            <div key={index} className="flex flex-row gap-2 py-2">
                                <div className="flex-1">
                                    <span className="text-sm font-medium">Rank1</span>
                                    <Textfield value={win.rank} type="text"  />
                                </div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium">Winning Amount</span>
                                    <Textfield value={win.winningAmount} type="text"  />
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-row gap-2 py-2">
                            <div className="flex-1">
                                <span className="text-sm font-medium">Rank</span>
                                <Textfield
                                    placeholder="Enter rank"
                                    value={newWinning.rank}
                                    type="text"
                                    onChange={(e) =>
                                        setNewWinning({ ...newWinning, rank: e.target.value })
                                    }
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-sm font-medium">Winning Amount</span>
                                <Textfield
                                    placeholder="Enter winning amount"
                                    value={newWinning.winningAmount}
                                    type="text"
                                    onChange={(e) =>
                                        setNewWinning({ ...newWinning, winningAmount: e.target.value })
                                    }
                                />
                            </div>
                            {/* <Button label="Add Entry" onClick={addWinningEntry} /> */}
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Button label="Add Entry" onClick={addWinningEntry} />
                            <Button label="Remove Entry" onClick={()=> {
                                removeWinningEntry(winnings.length -1);
                            }} />                            
                        </div>
                        {/* <Button label="Add New Entry" icon="pi pi-arrow-right" iconPos="right" onClick={addWinningEntry} className="bg-blue-600 hover:bg-blue-500 text-white" /> */}
                    </div>
                    <div className="flex pt-4 gap-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => {
                            if (newWinning.rank && newWinning.winningAmount) {
                                setWinnings([...winnings, newWinning]);
                                setNewWinning({ rank: '', winningAmount: '' });
                            }
                            stepperRef.current?.nextCallback()
                        }} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
                    </div>
                </StepperPanel>
                <StepperPanel header="Review Details">
                    <div className="flex flex-row h-12rem gap-4 justify-between">
                        {/* <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div> */}
                        <div>                            
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Contest Name</span>
                                    <span className="text-sm font-medium">{values.contestName}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Display Name</span>
                                    <span className="text-sm font-medium">{values.displayName}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Winning Amount</span>
                                    <span className="text-sm font-medium">{values.totalWinningAmount}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Entry Amount</span>
                                    <span className="text-sm font-medium">{values.entryAmount}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Discount Amount</span>
                                    <span className="text-sm font-medium">{values.discountAmount}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Total spot</span>
                                    <span className="text-sm font-medium">{values.totalSpot}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Available Spot</span>
                                    <span className="text-sm font-medium">{values.availableSpot}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Winning Percentage</span>
                                    <span className="text-sm font-medium">{values.winningPercentage}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">First Price</span>
                                    <span className="text-sm font-medium">{values.firstPrice}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed">
                                    <span className="text-sm font-bold">Maximum Allowed Teams</span>
                                    <span className="text-sm font-medium">{values.maximumAllowedTeams}</span>
                            </div>
                            <div className="flex flex-row justify-between gap-4 py-2 ">
                                    <span className="text-sm font-bold">Flexible Instructions</span>
                                    <span className="text-sm font-medium">{values.flexibleInstructions}</span>
                            </div>                            
                        </div>
                        {/* // winnings */}
                        <div className="flex flex-col gap-4">
                            <div className='flex flex-row justify-between gap-4 py-2 border-b-2 border-dashed'>
                                <span className="text-sm font-bold">Rank</span>
                                <span className="text-sm font-bold">Winning Amount</span>
                            </div>
                            {winnings.map((win, index) => (
                                <div key={index} className="flex flex-row gap-2 py-2">
                                    <div className="flex-1">
                                        {/* <span className="text-sm font-medium">Rank</span> */}
                                        <Textfield value={win.rank} type="text" disabled  />
                                    </div>
                                    <div className="flex-1">
                                        {/* <span className="text-sm font-medium">Winning Amount</span> */}
                                        <Textfield value={win.winningAmount} type="text" disabled  />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex pt-4 gap-4 justify-content-start justify-end">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" />
                        {/* <Button label="Finish" icon="pi pi-check" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2" /> */}
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
                            onClick={handleSubmit}
                            // disabled={isLoading || !isModified}
                        >{isLoading ? "Saving..." : "Submit"}</Button>
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    )
}