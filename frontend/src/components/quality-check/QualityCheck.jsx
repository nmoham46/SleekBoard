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

export default function QualityCheck(props) {
    const { selectedQualities = {
        correct: true,
        unambiguous: true,
        complete: true,
        consistent: true,
        verifiable: true,
        modifiable: true,
    }, handleQualityChange } = props;

    const [showTooltip, setShowTooltip] = useState({});
    const [tooltipTimeout, setTooltipTimeout] = useState({});

    const handleClick = (qualityId) => {
        if (handleQualityChange) {
            handleQualityChange(qualityId, !selectedQualities[qualityId]);
        }
    };

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
        setTooltipTimeout(prev => {
            const newState = { ...prev };
            delete newState[qualityId];
            return newState;
        });
    };

  return (
    <div className="flex items-center gap-0 px-0.5 py-0.5 rounded-full shadow-sm bg-secondary">
        {QUALITIES.map((quality) => {
            const IconComponent = quality.icon;
            const isSelected = selectedQualities[quality.id];
            return (
                <div key={quality.id} className="-mx-1 relative">
                    <Tooltip 
                        content={quality.label + ": " + quality.description}
                        open={showTooltip[quality.id] || false}
                    >
                        <IconButton
                            variant="text"
                            onClick={() => handleClick(quality.id)}
                            disabled={!handleQualityChange}
                            className={isSelected ? "opacity-100 rounded-full" : "opacity-30 rounded-full"}
                            onMouseEnter={() => handleMouseEnter(quality.id)}
                            onMouseLeave={() => handleMouseLeave(quality.id)}
                        >
                            <IconComponent />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        })}
    </div>
  )
}