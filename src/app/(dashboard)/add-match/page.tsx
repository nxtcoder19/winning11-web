import { HandleAddMatch } from "./handle-add-match";

export const dynamic = "force-dynamic";

export default function Home() {

    return (
            <HandleAddMatch />
        // <Suspense fallback={<div>Loading...</div>}>
        //     <HandleAddMatch />
        // </Suspense>
    )
}