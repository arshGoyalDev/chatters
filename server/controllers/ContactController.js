import User from "../models/UserModel.js";

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const createInitialsPattern = (term) => {
  if (term.length < 2) return null;

  const initials = term.toUpperCase().split("");
  const pattern = initials.map((initial) => `\\b${initial}\\w*`).join("\\s+");
  return new RegExp(pattern, "i");
};

// Enhanced search regex creation
const createEnhancedSearchRegex = (searchTerm) => {
  const caseInsensitive = true;

  if (!searchTerm || !searchTerm.trim()) {
    return new RegExp(".*", "i");
  }

  const term = searchTerm.trim();

  const patterns = [];

  patterns.push(`^${escapeRegex(term)}$`);
  patterns.push(`^${escapeRegex(term)}`);

  // partial words
  patterns.push(`\\b${escapeRegex(term)}`);
  patterns.push(`${escapeRegex(term)}\\b`);

  patterns.push(escapeRegex(term));

  // fuzzy matching
  if (term.length >= 3) {
    const fuzzyPattern = term
      .split("")
      .map((char, index) => {
        if (index === 0 || index === term.length - 1) {
          return escapeRegex(char);
        }
        return `${escapeRegex(char)}?`;
      })
      .join(".*?");
    patterns.push(fuzzyPattern);
  }

  // phonetic matching
  let phoneticTerm = term.toLowerCase();
  const substitutions = [
    ["ph", "(ph|f)"],
    ["f", "(f|ph)"],
    ["k", "(k|c)"],
    ["c", "(c|k)"],
    ["s", "(s|z)"],
    ["z", "(z|s)"],
  ];

  substitutions.forEach(([from, to]) => {
    phoneticTerm = phoneticTerm.replace(new RegExp(from, "g"), to);
  });
  patterns.push(phoneticTerm);

  const combinedPattern = `(${patterns.join("|")})`;

  return new RegExp(combinedPattern, caseInsensitive ? "i" : "");
};

// Enhanced search query creation
const createEnhancedSearchQuery = (searchTerm, userId, options = {}) => {
  const {
    fields = ["firstName", "lastName", "email"],
    includeEmailParts = true,
    enableInitialsSearch = true,
  } = options;

  if (!searchTerm || !searchTerm.trim()) {
    return { _id: { $ne: userId } };
  }

  const term = searchTerm.trim();
  const regex = createEnhancedSearchRegex(term);

  const orConditions = [];

  fields.forEach((field) => {
    orConditions.push({ [field]: regex });
  });

  if (includeEmailParts && fields.includes("email")) {
    orConditions.push({
      email: new RegExp(`^${escapeRegex(term)}@`, "i"),
    });

    orConditions.push({
      email: new RegExp(`@.*${escapeRegex(term)}`, "i"),
    });
  }

  if (
    enableInitialsSearch &&
    term.length >= 2 &&
    fields.includes("firstName") &&
    fields.includes("lastName")
  ) {
    const initialsPattern = createInitialsPattern(term);
    if (initialsPattern) {
      orConditions.push({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: initialsPattern.source,
            options: "i",
          },
        },
      });
    }
  }

  return {
    $and: [{ _id: { $ne: userId } }, { $or: orConditions }],
  };
};

// Enhanced search contacts function
const searchContacts = async (request, response, next) => {
  try {
    const { searchTerm } = request.body;

    if (!searchTerm) {
      return response.status(400).send("Search Term required");
    }

    const searchQuery = createEnhancedSearchQuery(searchTerm, request.userId);

    const contacts = await User.find(searchQuery);

    return response.status(200).json({ contacts });
  } catch (error) {
    console.error("Search error:", error);
    return response.status(500).send("Internal Server Error");
  }
};

export { searchContacts };
