import UserStory from "../models/UserStory.model.js";

const pick = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k)));

export async function createStory(req, res) {
  try {
    const data = pick(req.body, [
      "title","description","acceptanceCriteria","priority",
      "status","storyPoints","sprintId","assignees"
    ]);
    data.createdBy = req.headers["x-user"] || "unknown";
    data.updatedBy = data.createdBy;

    const story = await UserStory.create(data);
    res.status(201).json(story);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function getStory(req, res) {
  const s = await UserStory.findById(req.params.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
}

export async function updateStory(req, res) {
  const updates = pick(req.body, [
    "title","description","acceptanceCriteria","priority",
    "status","storyPoints","sprintId","assignees"
  ]);
  updates.updatedBy = req.headers["x-user"] || "unknown";

  const s = await UserStory.findByIdAndUpdate(req.params.id, updates, {
    new: true, runValidators: true
  });
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
}

export async function deleteStory(req, res) {
  const out = await UserStory.findByIdAndDelete(req.params.id);
  if (!out) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}

export async function listStories(req, res) {
  const { q, status, priority, sprintId, assignee, page = 1, limit = 20, sort = "-createdAt" } = req.query;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (sprintId) filter.sprintId = sprintId;
  if (assignee) filter.assignees = assignee;

  const p = Math.max(parseInt(page), 1);
  const lim = Math.min(Math.max(parseInt(limit), 1), 100);

  const [data, total] = await Promise.all([
    UserStory.find(filter).sort(sort.split(",").join(" ")).skip((p - 1) * lim).limit(lim),
    UserStory.countDocuments(filter)
  ]);

  res.json({ data, page: p, limit: lim, total });
}
