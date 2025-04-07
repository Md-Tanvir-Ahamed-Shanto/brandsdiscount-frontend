import { CheckCircle } from 'lucide-react';

type StepIndicatorProps = {
    currentStep: number;
    totalSteps: number;
};

export function FormStepIndicator({
    currentStep,
    totalSteps
}: StepIndicatorProps) {
    return (
        <div className='w-full mb-8'>
            <div className='flex justify-between mb-2'>
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className='flex flex-col items-center'>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                index < currentStep
                                    ? 'bg-green-100 text-green-600'
                                    : index === currentStep
                                      ? 'bg-primary text-white'
                                      : 'bg-gray-100 text-gray-400'
                            }`}
                        >
                            {index < currentStep ? (
                                <CheckCircle className='w-5 h-5' />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </div>
                        <span className='text-sm mt-1'>
                            {index === 0 ? 'Details' : 'Confirmation'}
                        </span>
                    </div>
                ))}
            </div>
            <div className='relative w-full h-2 bg-gray-200 rounded-full'>
                <div
                    className='absolute h-full bg-primary rounded-full transition-all duration-300'
                    style={{
                        width: `${(currentStep / (totalSteps - 1)) * 100}%`
                    }}
                ></div>
            </div>
        </div>
    );
}
