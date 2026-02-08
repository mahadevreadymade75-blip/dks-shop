import { Suspense } from "react";
import WatchesClient from "./WatchesClient";

export default function WatchesPage() {
    return (
        <Suspense fallback={<div className="p-10">Loading watches...</div>}>
            <WatchesClient />
        </Suspense>
    );
}
