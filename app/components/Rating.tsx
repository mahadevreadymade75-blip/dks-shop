interface Props {
    value?: number;
    size?: "sm" | "md";
}

export default function Rating({ value = 0, size = "sm" }: Props) {
    const stars = Math.round(value);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    className={`${i <= stars ? "text-yellow-400" : "text-gray-600"
                        } ${size === "md" ? "text-lg" : "text-sm"}`}
                >
                    ★
                </span>
            ))}
            {value > 0 && (
                <span className="text-xs text-gray-400 ml-1">
                    {value}
                </span>
            )}
        </div>
    );
}
