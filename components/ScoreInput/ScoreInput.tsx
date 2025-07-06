interface ScoreInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export const ScoreInput: React.FC<ScoreInputProps> = ({ label, value, onChange }) => (
    <div className="space-y-2 flex-1">
        <label className="text-sm font-medium leading-none">{label}</label>
        <input
            type="number"
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
        />
    </div>
);
