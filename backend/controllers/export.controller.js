import { StatusCodes } from "http-status-codes";
import UserStory from "../models/userStories.model.js";

// Mapping status values to Jira status values
function mapStatusToJira(status) 
    {
        if (!status) return "TO DO";

        switch (status.toLowerCase()) 
            {
                case "todo":
                return "TO DO";
                case "in progress":
                return "IN PROGRESS";
                case "done":
                return "DONE";
                default:
                return status;
            }
    }

// Mapping Business Value to Jira priority
function mapPriorityFromBusinessValue(businessValue) 
    {
        if (businessValue == null) return "Medium";

        if (businessValue >= 80) return "Highest";
        if (businessValue >= 60) return "High";
        if (businessValue >= 30) return "Medium";
        if (businessValue >= 10) return "Low";
        return "Lowest";
    }

// Build Jira JSON Import payload from SleekBoard user stories
function buildJiraExportPayload(stories) 
    {
        return {
                projects: [
                    {
                        name: "SleekBoard",
                        key: "SLEEK",
                        description: "Exported user stories from SleekBoard",
                        "work items": stories.map((story, index) => {
                        const customFieldValues = [];

                        if (story.storyPoint != null) 
                            {
                                customFieldValues.push(
                                    {
                                        fieldName: "Story Points",
                                        fieldType:"com.atlassian.jira.plugin.system.customfieldtypes:float",
                                        value: String(story.storyPoint),
                                    }
                                );
                            }

                        if (story.businessValue != null) 
                            {
                                customFieldValues.push(
                                    {
                                        fieldName: "Business Value",
                                        fieldType:"com.atlassian.jira.plugin.system.customfieldtypes:float",
                                        value: String(story.businessValue),
                                    }
                                );
                            }

                        return{
                                summary: story.title,
                                description: story.description || "",
                                workType: "Story",
                                status: mapStatusToJira(story.status),
                                priority: mapPriorityFromBusinessValue(story.businessValue),
                                externalId: story._id?.toString() || String(index + 1),
                                customFieldValues,
                            };
                        }),
                    },
                ],
            };
    }

// GET /api/exports/jira
export async function exportUserStoriesToJira(req, res) {
  try {
    // Later, we can filter by sprint/epic using req.query
    const stories = await UserStory.find();

    const jiraPayload = buildJiraExportPayload(stories);
    res.status(StatusCodes.OK).json(jiraPayload);
  } catch (error) {
    console.error("Error exporting user stories to Jira:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to build Jira export JSON" });
  }
}
