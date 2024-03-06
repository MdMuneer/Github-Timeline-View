export const githubEvents: {
  [key in string]: {
    id: string;
    description: string;
  };
} = {
  PushEvent: {
    id: "PushEvent",
    description: "Push to a branch in",
  },
  PullRequestEvent: {
    id: "PullRequestEvent",
    description: "Opened a pull request in",
  },
  IssuesEvent: {
    id: "IssuesEvent",
    description: "Interacted with an issue",
  },
  ForkEvent: {
    id: "ForkEvent",
    description: "Forked",
  },
  CreateEvent: {
    id: "CreateEvent",
    description: "Created",
  },
};
