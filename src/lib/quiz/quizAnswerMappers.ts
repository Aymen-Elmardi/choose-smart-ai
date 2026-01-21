// Answer mapping functions for the quiz
// These translate user-friendly options into engine-compatible values

/**
 * Map salesChannel selection to engine flags
 */
export const mapSalesChannelToFlags = (
  option: string
): { needsOnline: boolean; needsInPerson: boolean; needsMarketplace: boolean } => {
  switch (option) {
    case "Online only":
      return { needsOnline: true, needsInPerson: false, needsMarketplace: false };
    case "In person only":
      return { needsOnline: false, needsInPerson: true, needsMarketplace: false };
    case "Online and in person":
      return { needsOnline: true, needsInPerson: true, needsMarketplace: false };
    case "Marketplace or platform":
      return { needsOnline: false, needsInPerson: false, needsMarketplace: true };
    default:
      return { needsOnline: false, needsInPerson: false, needsMarketplace: false };
  }
};

/**
 * Map terminal type selection to engine value
 */
export const mapTerminalType = (option: string): string => {
  switch (option) {
    case "Fixed terminal (countertop)":
      return "wired";
    case "Portable terminal (SIM or Wi-Fi)":
      return "portable-sim";
    case "Not sure yet":
      return "unknown";
    default:
      return "";
  }
};

/**
 * Map monthly volume to engine format
 */
export const mapMonthlyVolume = (option: string): string => {
  switch (option) {
    case "Just getting started":
      return "< £5k";
    case "Under £10k":
      return "£5k–20k";
    case "£10k–£50k":
      return "£20k–50k";
    case "£50k+":
      return "£50k–100k";
    default:
      return "< £5k";
  }
};

/**
 * Map priorities to engine format
 */
export const mapPriority = (priority: string): string => {
  switch (priority) {
    case "Lower fees":
      return "Keeping fees low";
    case "Reliability":
      return "Reliability";
    case "Ability to scale":
      return "Ability to scale";
    case "Support during setup":
      return "Easy setup";
    default:
      return priority;
  }
};

/**
 * Map business type to engine format
 */
export const mapBusinessType = (businessType: string): string => {
  switch (businessType) {
    case "Solo business":
      return "Online business";
    case "Multi-location business":
      return "Physical business";
    case "Franchise":
      return "Other / mixed";
    case "Marketplace or platform":
    case "Platform":
      return "Marketplace / platform";
    default:
      return "Other / mixed";
  }
};

/**
 * Map average transaction to engine format
 */
export const mapAvgTransaction = (option: string): string => {
  switch (option) {
    case "Under £20":
      return "< £30";
    case "£20–£100":
      return "£30–100";
    case "£100–£500":
      return "£100–500";
    case "£500+":
      return "£500+";
    default:
      return "£30–100";
  }
};

/**
 * Prepare answers for the server-side recommendation engine
 */
export const prepareEngineAnswers = (answers: {
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
}) => {
  return {
    salesChannel: answers.salesChannel,
    businessType: mapBusinessType(answers.businessType),
    priorities: answers.priorities.map(mapPriority),
    location: answers.location,
    monthlyVolume: mapMonthlyVolume(answers.monthlyVolume),
    avgTransaction: mapAvgTransaction(answers.avgTransaction),
    features: [] as string[],
  };
};
