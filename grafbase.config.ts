import { g, config, auth } from "@grafbase/sdk";
import { rule } from "postcss";

// types are generated with the `type` method,
// followed by the name and fields.
const User = g.model("User", {
  name: g.string(),
  email: g.string().unique(),
  imageUrl: g.url().optional(),
  tasks: g
    .relation(() => Task)
    .list()
    .optional(),
});

const Task = g
  .model("Task", {
    title: g.string(),
    description: g.string().optional(),
    createdBy: g.relation(() => User),
    createdDate: g.datetime(),
    dueDate: g.datetime().optional(),
  })
  .auth((rules) => {
    rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "graphbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

// finally we export the default config
export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
