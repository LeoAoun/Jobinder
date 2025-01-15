import { IMatch, IMatches } from "../../interfaces/IMatch";

// Storage key for matches
const jobinderMatchesStorageKey = "jobinder-matches";

// Get matches from database
const getMatches = async (): Promise<IMatches> => {
  const matches = localStorage.getItem(jobinderMatchesStorageKey);
  return matches ? JSON.parse(matches) : {};
};

// Get match from database
const getMatch = async (id: string): Promise<IMatch> => {
  const matches = await getMatches();
  return matches[id];
};

// Add match to database
const addMatch = async (matchId: string, matchedId: string) => {
  const matches: IMatches = await getMatches();

  // Update match for the first user
  const updatedMatchesForMatchId: IMatch = [...(matches[matchId] || []), matchedId];

  // Update match for the second user
  const updatedMatchesForMatchedId: IMatch = [...(matches[matchedId] || []), matchId];

  // Update matches object
  const newMatches: IMatches = {
    ...matches,
    [matchId]: updatedMatchesForMatchId,
    [matchedId]: updatedMatchesForMatchedId,
  };

  localStorage.setItem(jobinderMatchesStorageKey, JSON.stringify(newMatches));
};

const deleteMatch = async (matchId: string, matchedId: string) => {
  const matches: IMatches = await getMatches();

  // Update match for the first user
  const updatedMatchesForMatchId: IMatch = matches[matchId].filter((id: string) => id !== matchedId);

  // Update match for the second user
  const updatedMatchesForMatchedId: IMatch = matches[matchedId].filter(
    (id: string) => id !== matchId
  );

  // Update matches object
  const newMatches: IMatches = {
    ...matches,
    [matchId]: updatedMatchesForMatchId,
    [matchedId]: updatedMatchesForMatchedId,
  };

  localStorage.setItem(jobinderMatchesStorageKey, JSON.stringify(newMatches));
};

export { getMatches, getMatch, addMatch, deleteMatch };
