import Link from "next/link";

export default function SupportPage() {
    return (
        <main className="bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 min-h-screen">

            {/* ================= PAGE HEADER ================= */}
            <section className="pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Support Center
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
                        We are here to help you with orders, products, delivery,
                        and any questions related to your shopping experience.
                    </p>
                </div>
            </section>

            {/* ================= SUPPORT OPTIONS ================= */}
            <section className="py-24 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                    <SupportCard
                        title="Order Related"
                        desc="Help with order status, confirmation, cancellation, or updates."
                    />

                    <SupportCard
                        title="Product Queries"
                        desc="Questions about size, color, availability, or product details."
                    />

                    <SupportCard
                        title="Delivery & Returns"
                        desc="Support for delivery delays, address changes, or returns."
                    />
                </div>
            </section>

            {/* ================= CONTACT ================= */}
            <section className="py-24 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Need Immediate Help?
                    </h2>

                    <p className="text-gray-600 mb-12 leading-relaxed">
                        Contact us directly on WhatsApp for fast and personal assistance.
                    </p>

                    <div className="flex justify-center gap-6 flex-wrap">
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            className="
                                px-10 py-4
                                bg-gradient-to-r from-green-500 to-emerald-600
                                text-black rounded-full font-semibold
                                shadow-lg hover:scale-105 transition
                            "
                        >
                            Chat on WhatsApp
                        </a>

                        <Link
                            href="/"
                            className="
                                px-10 py-4
                                border border-gray-300
                                rounded-full
                                hover:bg-black hover:text-white
                                transition
                            "
                        >
                            Go to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ================= SUPPORT CARD ================= */

function SupportCard({
    title,
    desc,
}: {
    title: string;
    desc: string;
}) {
    return (
        <div
            className="
                bg-white
                border border-gray-200
                rounded-2xl p-10
                hover:border-gray-400
                hover:-translate-y-1
                transition
                shadow-lg
            "
        >
            <h3 className="text-xl font-semibold mb-4">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {desc}
            </p>
        </div>
    );
}
