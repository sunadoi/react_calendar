export const Plan = {
  all: "全員参加可",
  premium: "プレミアム以上限定",
  superPremium: "スーパープレミアム限定",
};

export const returnCircle = (plan) => {
  switch (plan) {
    case "all":
      return "🔵";
    case "premium":
      return "🟢";
    case "superPremium":
      return "🔴";
  }
};
