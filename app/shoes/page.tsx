import { Suspense } from "react";
import ShoesClient from "./ShoesClient";

export default function ShoesPage() {
    return (
        <Suspense fallback={<div className="p-10 text-white">Loading shoes...</div>}>
            <ShoesClient />
        </Suspense>
    );
}
