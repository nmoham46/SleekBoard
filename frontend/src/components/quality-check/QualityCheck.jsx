import { IconButton, Tooltip } from "@material-tailwind/react";
import { FaCheck, FaQuestion, FaBalanceScale, FaEye, FaPencilAlt, FaShip } from "react-icons/fa";
import { useState } from "react";

const QUALITIES = [
    { id: 'correct', label: 'Correct', icon: FaCheck, description: 'The user story is accurate and free from errors' },
    { id: 'unambiguous', label: 'Unambiguous', icon: FaQuestion, description: 'The user story has a clear and single interpretation' },
    { id: 'complete', label: 'Complete', icon: FaShip, description: 'The user story contains all necessary information' },
    { id: 'consistent', label: 'Consistent', icon: FaBalanceScale, description: 'The user story aligns with other project requirements' },
    { id: 'verifiable', label: 'Verifiable', icon: FaEye, description: 'The user story can be tested and validated' },
    { id: 'modifiable', label: 'Modifiable', icon: FaPencilAlt, description: 'The user story can be easily updated or changed' },
];

export default function QualityCheck({ quality, onToggle }) {

    const [showTooltip, setShowTooltip] = useState({});
    const [tooltipTimeout, setTooltipTimeout] = useState({});

    const handleMouseEnter = (qualityId) => {
        const timeout = setTimeout(() => {
            setShowTooltip(prev => ({ ...prev, [qualityId]: true }));
        }, 1000);
        setTooltipTimeout(prev => ({ ...prev, [qualityId]: timeout }));
    };

    const handleMouseLeave = (qualityId) => {
        if (tooltipTimeout[qualityId]) {
            clearTimeout(tooltipTimeout[qualityId]);
        }
        setShowTooltip(prev => ({ ...prev, [qualityId]: false }));
    };

  return (
    <div className="flex items-center gap-0 px-0.5 py-0.5 rounded-full shadow-sm bg-secondary">
        {QUALITIES.map((q) => {
            const IconComponent = q.icon;
            const isSelected = quality?.[q.id] ?? false;

            return (
                <div key={q.id} className="-mx-1 relative">
                    <Tooltip 
                        content={q.label + ": " + q.description}
                        open={showTooltip[q.id] || false}
                    >
                        <IconButton
                            variant="text"
                            onClick={() => onToggle(q.id)}
                            className={isSelected ? "opacity-100 rounded-full" : "opacity-30 rounded-full"}
                            onMouseEnter={() => handleMouseEnter(q.id)}
                            onMouseLeave={() => handleMouseLeave(q.id)}
                        >
                            <IconComponent />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        })}
    </div>
  );
}
