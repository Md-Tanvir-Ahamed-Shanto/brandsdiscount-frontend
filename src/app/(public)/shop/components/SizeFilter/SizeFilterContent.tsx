const SIZE_OPTIONS = [
    { label: 'XXS (00)', value: 'xxs' },
    { label: 'XS (0-2)', value: 'xs' },
    { label: 'S (4-6)', value: 's' },
    { label: 'M (8-10)', value: 'm' },
    { label: 'L (12-14)', value: 'l' },
    { label: 'XL (16-18)', value: 'xl' },
    { label: 'XXL+ (20+)', value: 'xxl' },
    { label: 'O/S', value: 'os' }
];

const SizeFilterContent = ({
    selectedSizes,
    onChange
}: {
    selectedSizes: string[];
    onChange: (sizes: string[]) => void;
}) => {
    const handleChange = (value: string) => {
        const newSelected = selectedSizes.includes(value)
            ? selectedSizes.filter((v) => v !== value)
            : [...selectedSizes, value];
        onChange(newSelected);
    };

    return (
        <div className='w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-4 md:p-6 mb-8'>
            <h2 className='text-base md:text-lg font-semibold mb-4 text-center'>
                Select Your Size
            </h2>
            <div className='grid grid-cols-2 gap-4'>
                {SIZE_OPTIONS.map((size) => (
                    <label
                        key={size.value}
                        className={`flex text-sm md:text-base items-center px-4 py-3 rounded-lg border cursor-pointer transition-colors duration-150 ${selectedSizes.includes(size.value) ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200'}`}
                    >
                        <input
                            type='checkbox'
                            className='form-checkbox h-5 w-5 text-gray-900 mr-3 accent-black'
                            checked={selectedSizes.includes(size.value)}
                            onChange={() => handleChange(size.value)}
                        />
                        <span className='font-medium'>{size.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export { SizeFilterContent };
