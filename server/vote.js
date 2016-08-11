export function determineMafiaKill(votes, votedOut) {
    let voteCounts = votes.sortBy(() => Math.random())
        .countBy(vote => vote.on)
        .filterNot((val,key) => key === votedOut)

    return voteCounts.keyOf(voteCounts.max())
}

export function determineCopIdentified(votes, users, votedOut) {
    let voteCounts = votes.sortBy(() => Math.random())
        .countBy(vote => vote.on)
        .filterNot((val,key) => key === votedOut)

    let identified = voteCounts.keyOf(voteCounts.max())

    return users
        .find((u) => u.get('socket_id') === identified)
        .get('role') === 'mafia'
}

export function determineVotedOut(votes) {
    let voteCounts = votes.sortBy(() => Math.random())
        .countBy(vote => vote.on)
    return voteCounts.keyOf(voteCounts.max())
}
