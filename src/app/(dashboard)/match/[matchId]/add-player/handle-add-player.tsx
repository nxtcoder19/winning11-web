"use client"
import { Textfield } from "@/app/atom/textfield";
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
import { playerRepository } from "@/server/repository/player-repository";
import { useParams, useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export const HandleAddPlayer = () => {

    const params = useParams()
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const playerTypes = ["wicketkeeper", "batsman", "all-rounder", "bowler"];
    const playerStatus = ["announced", "unannounced", "substitute"];

    const playerApi = playerRepository
    const matchId = Array.isArray(params.matchId) ? params.matchId[0] : params.matchId;

    const show = () => {
      toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your player details has been added successfully' });
  };

    const {values, handleChange, handleSubmit, isLoading} = useForm({
        initialValues: {
            playerName: "",
            displayName: "",
            teamName: "",
            playerType: "",
            playerImage: "",
            playerPoints: 0,
            playerCredit: 0,
            isPlayedLastMatch: false,
            playerStatus: "",
        },
        validationSchema: Yup.object().shape({
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
            console.log(val);
            try {
                const response = await playerApi.addPlayer({
                    playerData: {
                        matchId: matchId,
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
                    console.log('Player added successfully!', response.data);                    
                    show();
                    router.push(`/match/${matchId}/players`);                    
                }
            } catch (error) {
                handleError(error)
            }
        }
    })

    // const show = () => {
    //     toast.current?.show({ severity: 'success', summary: 'Info', detail: 'Your match details has been updated successfully' });
    // };

    return (
        <div className="flex flex-col gap-4 p-4">
          <Toast ref={toast} position="bottom-left"/>     
          <h1 className="text-3xl font-bold">Add Player Details</h1>

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
              <Select onValueChange={(value) => handleChange("playerStatus")({ target: { value } })}>
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
              <Select onValueChange={(value) => handleChange("playerType")({ target: { value } })}>
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

          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2"
              onClick={handleSubmit}
              // disabled={isLoading || !isModified}
            >{isLoading ? "Saving..." : "Save Changes"}</Button>
          </div>

        </div>
    )
}