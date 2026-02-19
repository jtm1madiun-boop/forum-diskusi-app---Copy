import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { userId } = action.payload;
          let newUpVotesBy = [...thread.upVotesBy];
          let newDownVotesBy = [...thread.downVotesBy];

          if (thread.upVotesBy.includes(userId)) {
            // User sudah up-vote, sekarang netral
            newUpVotesBy = newUpVotesBy.filter((id) => id !== userId);
          } else if (thread.downVotesBy.includes(userId)) {
            // User sudah down-vote, sekarang up-vote
            newDownVotesBy = newDownVotesBy.filter((id) => id !== userId);
            newUpVotesBy.push(userId);
          } else {
            // User belum vote, sekarang up-vote
            newUpVotesBy.push(userId);
          }
          // Logika ini bisa disesuaikan lagi untuk menangani down-vote secara terpisah
          return {
            ...thread,
            upVotesBy: newUpVotesBy,
            downVotesBy: newDownVotesBy,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;