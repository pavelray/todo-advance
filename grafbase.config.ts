import { g, config } from "@grafbase/sdk";

// types are generated with the `type` method,
// followed by the name and fields.
const User = g.model("User", {
  name: g.string(),
  email: g.email().unique(),
  imageUrl: g.url().optional(),
  tasks: g.relation(()=> Task).list().optional(),
});

const Task = g.model("Task", {
  id: g.id(),
  title: g.string(),
  description: g.string().optional(),
  createdBy: g.relation(() => User),
  createdDate: g.datetime(),
  dueDate: g.datetime().optional(),
});


// finally we export the default config
export default config({
  schema: g,
});
