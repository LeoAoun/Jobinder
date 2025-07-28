import { IMatch, IMatches } from "@interfaces/IMatch";

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

  // Create a new match entry if it doesn't exist
  const newMatches = { ...matches };

  // If the matchId is not already in the matchId's array, add it
  newMatches[matchId] = [...(newMatches[matchId] || []), matchedId];

  // If the matchedId is not already in the matchId's array, add it
  if (matchId !== "-1" && matchId !== matchedId) {
    newMatches[matchedId] = [...(newMatches[matchedId] || []), matchId];
  }

  localStorage.setItem(jobinderMatchesStorageKey, JSON.stringify(newMatches));
};

// Delete match from database
const deleteMatch = async (matchId: string, matchedId: string) => {
  const matches: IMatches = await getMatches();

  // Remove the matchId from the matchedId's array
  const updatedMatchesForMatchId: IMatch = (matches[matchId] || []).filter( // CORREÇÃO AQUI
    (id: string) => id !== matchedId
  );

  // Remove the matchedId from the matchId's array
  const updatedMatchesForMatchedId: IMatch = (matches[matchedId] || []).filter( // CORREÇÃO AQUI
    (id: string) => id !== matchId
  );

  // Update the matches object
  const newMatches: IMatches = {
    ...matches,
    [matchId]: updatedMatchesForMatchId,
    [matchedId]: updatedMatchesForMatchedId,
  };

  localStorage.setItem(jobinderMatchesStorageKey, JSON.stringify(newMatches));
};

export { getMatches, getMatch, addMatch, deleteMatch };
