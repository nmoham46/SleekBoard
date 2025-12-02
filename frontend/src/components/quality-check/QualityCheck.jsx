import { Checkbox } from "@material-tailwind/react";
import { FaCheck, FaQuestion, FaBalanceScale, FaEye, FaPencilAlt, FaShip } from "react-icons/fa";

const QUALITIES = [
    { id: 'correct', label: 'Correct', icon:<FaCheck />},
    { id: 'unambiguous', label: 'Unambiguous', icon:<FaQuestion />},
    { id: 'complete', label: 'Complete', icon:<FaShip />},
    { id: 'consistent', label: 'Consistent', icon:<FaBalanceScale />},
    { id: 'verifiable', label: 'Verifiable', icon:<FaEye />},
    { id: 'modifiable', label: 'Modifiable', icon:<FaPencilAlt />},
  ];

export default function QualityCheck(props) {
    const { selectedQualities = {
        correct: true,
        unambiguous: true,
        complete: true,
        consistent: true,
        verifiable: true,
        modifiable: true,
    } } = props;
  return (
    <div className="flex items-center gap-0 px-0.5 py-0.5 rounded-full shadow-sm bg-secondary scale-75">
        {QUALITIES.map((quality) => (
            <div key={quality.id} className="-mx-1">
                <Checkbox
                    icon={quality.icon}
                    defaultChecked={selectedQualities[quality.id]}
                    onChange={(e) => handleQualityChange(quality.id, e.target.checked)}
                />
            </div>
        ))}
    </div>
  )
}