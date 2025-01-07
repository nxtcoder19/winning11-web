import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textfield } from "../atom/textfield";

export const DeleteDialog = ({ deleteContent,onDelete }: { deleteContent: string, onDelete: () => void }) => {

    const [textInput, setTextInput] = useState('')

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {/*<Button variant="outline">Show Dialog</Button>*/}
                <Button className="bg-red-500 text-white hover:bg-red-600" variant="destructive">{deleteContent}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <div className={"py-2"}>
                        <AlertDialogDescription>
                            Type <b>confirm</b> to delete
                        </AlertDialogDescription>
                    </div>
                    <Textfield
                        // placeholder="confirm"
                        type={"text"}
                        name={"Description"}
                        onChange={(e)=> {
                            setTextInput(e.target.value)
                        }}
                        // onChange={handleChange}
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={"bg-blue-500 hover:bg-blue-600"} disabled={textInput !== 'confirm'} onClick={()=> {
                        console.log("delete clicked")
                        setTextInput('')
                        onDelete()
                    }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};