import Link from "next/link";

export default function HelpPage() {
    return (
        <main className="bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 min-h-screen">

            {/* ================= PAGE HEADER ================= */}
            <section className="pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Help Center
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Find answers to common questions and learn how to shop
                        easily using our WhatsApp-based system.
                    </p>
                </div>
            </section>

            {/* ================= HELP SECTIONS ================= */}
            <section className="py-24 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

                    <HelpCard
                        title="How to Order"
                        items={[
                            "Browse categories from the home page",
                            "Open a product and add it to cart",
                            "Go to cart and proceed to checkout",
                            "Place your order directly on WhatsApp",
                        ]}
                    />

                    <HelpCard
                        title="Payment Information"
                        items={[
                            "Cash on Delivery (if available)",
                            "UPI or Bank Transfer via WhatsApp",
                            "Payment details shared after order confirmation",
                        ]}
                    />

                    <HelpCard
                        title="Delivery & Shipping"
                        items={[
                            "Delivery time depends on your location",
                            "Order updates shared on WhatsApp",
                            "Any delay will be communicated clearly",
                        ]}
                    />

                    <HelpCard
                        title="Returns & Refunds"
                        items={[
                            "Returns accepted for damaged products only",
                            "Issues must be reported within 24 hours",
                            "Refund process explained on WhatsApp",
                        ]}
                    />
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-24 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Still Need Help?
                    </h2>

                    <p className="text-gray-600 mb-12 leading-relaxed">
                        Our support team is available to assist you directly on WhatsApp.
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
                            WhatsApp Support
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
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ================= HELP CARD ================= */

function HelpCard({
    title,
    items,
}: {
    title: string;
    items: string[];
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
            <h3 className="text-xl font-semibold mb-5">
                {title}
            </h3>

            <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                {items.map((item, i) => (
                    <li key={i}>• {item}</li>
                ))}
            </ul>
        </div>
    );
}
