import { motion } from 'framer-motion';
import type { Contribution } from '../../types/team';

interface ContributionGraphProps {
    data: Contribution[];
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ data }) => {
    // Generate a mock 52-week grid or use actual data mapping
    // For simplicity in this mock, we'll create a 7x20 grid (last 20 weeks)
    const weeks = 20;
    const days = 7;

    // Helper to get color based on count
    const getColor = (count: number) => {
        if (count === 0) return 'bg-white/5';
        if (count < 3) return 'bg-brand-primary/40';
        if (count < 6) return 'bg-brand-primary/70';
        return 'bg-brand-accent';
    };

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-max">
                {Array.from({ length: weeks }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {Array.from({ length: days }).map((_, dayIndex) => {
                            // In a real app, map date here. For mock, randomized or props based.
                            // We use data if available, otherwise mock 0
                            const index = weekIndex * 7 + dayIndex;
                            const contribution = data[index] || { count: 0 };

                            return (
                                <motion.div
                                    key={`${weekIndex}-${dayIndex}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.005, duration: 0.2 }}
                                    className={`w-3 h-3 rounded-sm ${getColor(contribution.count)} hover:ring-1 hover:ring-white/50 transition-all`}
                                    title={`Contributions: ${contribution.count}`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-white/5" />
                    <div className="w-3 h-3 rounded-sm bg-brand-primary/40" />
                    <div className="w-3 h-3 rounded-sm bg-brand-primary/70" />
                    <div className="w-3 h-3 rounded-sm bg-brand-accent" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
};

export default ContributionGraph;
