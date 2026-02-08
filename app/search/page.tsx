import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center text-gray-600">
                    Loading search…
                </div>
            }
        >
            <SearchClient />
        </Suspense>
    );
}
