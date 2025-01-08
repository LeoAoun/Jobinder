// Get matches from database
const getMatches = async (): Promise<Record<string, string[]>> => {
  const matches = localStorage.getItem("jobinder-matches");
  return matches ? JSON.parse(matches) : {};
};

// Get match from database
const getMatch = async (id: string): Promise<string[]> => {
  const matches = await getMatches();
  return matches[id];
};

// Add match to database
const addMatch = async (matchId: string, matchedId: string) => {
  const matches = await getMatches();

  // Update match for the first user
  const updatedMatchesForMatchId = [...(matches[matchId] || []), matchedId];

  // Update match for the second user
  const updatedMatchesForMatchedId = [...(matches[matchedId] || []), matchId];

  // Update matches object
  const newMatches = {
    ...matches,
    [matchId]: updatedMatchesForMatchId,
    [matchedId]: updatedMatchesForMatchedId,
  };

  localStorage.setItem("jobinder-matches", JSON.stringify(newMatches));
};

const deleteMatch = async (matchId: string, matchedId: string) => {
  const matches = await getMatches();

  // Update match for the first user
  const updatedMatchesForMatchId = matches[matchId].filter((id: string) => id !== matchedId);

  // Update match for the second user
  const updatedMatchesForMatchedId = matches[matchedId].filter((id: string) => id !== matchId);

  // Update matches object
  const newMatches = {
    ...matches,
    [matchId]: updatedMatchesForMatchId,
    [matchedId]: updatedMatchesForMatchedId,
  };

  localStorage.setItem("jobinder-matches", JSON.stringify(newMatches));
};  

export { getMatches, getMatch, addMatch, deleteMatch };
