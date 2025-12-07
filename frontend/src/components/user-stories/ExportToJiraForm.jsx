import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const ExportToJiraForm = ({ jsonText }) => 
  {
    const [copyLabel, setCopyLabel] = React.useState("COPY");
    
    const displayJson =
      jsonText && jsonText.trim().length > 0
        ? jsonText
        : `{
  "projects": [
    {
      "name": "SleekBoard Export",
      "key": "SLEEK",
      "description": "Exported user stories from SleekBoard",
      "work items": [
        {
          "summary": "Test user story",
          "description": "Example description for Jira import from SleekBoard.",
          "workType": "Story",
          "status": "TO DO",
          "priority": "Medium",
          "externalId": "1"
        }
      ]
    }
  ]
}`;

    const handleCopy = async () => 
      {
        try 
          {
            await navigator.clipboard.writeText(displayJson);
            setCopyLabel("COPIED!");
            setTimeout(() => setCopyLabel("COPY"), 2000);
          } 
        catch (error) 
          {
            console.error("Failed to copy JSON", error);
          }
      };

    const handleDownload = () => {
      try {
        const blob = new Blob([displayJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "sleekboard-jira-export.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download JSON file", error);
      }
    };

    return (
      <div className="relative">
        <Button
          variant="outlined"
          size="sm"
          className="!absolute right-2 top-2 normal-case text-white"
          onClick={handleCopy}
        >
          {copyLabel}
        </Button>

        <pre className="mt-10 max-h-80 overflow-auto rounded-md bg-gray-900 p-4 text-xs font-mono text-gray-100">
          {displayJson}
        </pre>

        <div className="mt-4">
          <Button
            variant="outlined"
            size="sm"
            className="flex items-center gap-2 normal-case"
            onClick={handleDownload}
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Download JSON file</span>
          </Button>
        </div>
      </div>
    );
  };

export default ExportToJiraForm;