function formatDate(created_at: string) {
  const JoinedAt = new Date(created_at).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return JoinedAt;
}

export default formatDate;
