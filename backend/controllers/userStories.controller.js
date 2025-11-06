import UserStory from "../models/UserStory.model.js";

// keep only the fields we allow from req.body
const pick = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k)));

/**
   * Create a User story
   * POST /api/v1/userStories
 */
export async function createStory(req, res) 
  {
    try 
      {
        const data = pick(req.body, ["title", "description", "status", "businessValue", "storyPoint", "assignedTo", "comments"]);
        // save to db
        const story = await UserStory.create(data);
        // return the created story
        res.status(201).json(story);
      } 
    catch (e) 
      {
        res.status(400).json({ error: e.message });
      }
  }

  /**
 * Get one story by id
 * GET /api/v1/userStories/:id
 */
export async function getStory(req, res) 
  {
    const s = await UserStory.findById(req.params.id);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  }

/**
   * Update a User story by id
   * PATCH /api/v1/userStories/:id
 */
export async function updateStory(req, res) 
  {
    try 
      {
        const updates = pick(req.body, ["title", "description", "status", "businessValue", "storyPoint", "assignedTo", "comments"]);

        // returning the updated doc
        const s = await UserStory.findByIdAndUpdate(req.params.id, updates, {new: true, runValidators: true});
        
        if (!s) return res.status(404).json({ error: "Not found" });
        res.json(s);
      }
    catch (e)
      {
        res.status(400).json({ error: e.message });
      }
  }

  /**
 * Deleting a User story
 * DELETE /api/v1/userStories/:id
 */
export async function deleteStory(req, res) 
  {
    const out = await UserStory.findByIdAndDelete(req.params.id);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  }

/**
   * List all User stories
   * GET /api/v1/userStories
 */
export async function listStories(req, res) 
  {
    const { q, status, assignedTo, page = 1, limit = 20, sort = "-createdAt" } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q }; 
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    const p = Math.max(parseInt(page, 10) || 1, 1);
    const lim = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

    const [data, total] = await Promise.all([UserStory.find(filter).sort(sort.split(",").join(" ")).skip((p - 1) * lim).limit(lim), UserStory.countDocuments(filter)]);
    res.json({ data, page: p, limit: lim, total });
  }