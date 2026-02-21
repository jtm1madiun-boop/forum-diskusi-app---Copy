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
          // <-- PERUBAHAN: Ambil voteType dari payload
          const { userId, voteType } = action.payload; 
          
          // Pertama, kita bersihkan dulu user ID ini dari kedua array (reset jadi netral)
          let newUpVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          let newDownVotesBy = thread.downVotesBy.filter((id) => id !== userId);

          // Kedua, kita masukkan user ID ke array yang sesuai berdasarkan tipe vote
          if (voteType === 'up-vote') {
            newUpVotesBy.push(userId);
          } else if (voteType === 'down-vote') {
            newDownVotesBy.push(userId);
          }
          // Jika voteType === 'neutral-vote', tidak perlu di-push ke mana-mana (tetap netral)

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