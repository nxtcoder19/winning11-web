/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";

export default async function Home(props: any) {
    const matchType = props.params.matchType
    return (
        // redirect("/cricket/upcoming")
        redirect(`/${matchType}/upcoming`)
    )
}