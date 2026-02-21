import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
      
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
      
    // Menambahkan case untuk menangani voting pada detail thread
    case ActionType.TOGGLE_VOTE_THREAD_DETAIL: {
      const { userId, voteType } = action.payload;
      
      // Bersihkan jejak vote pengguna sebelumnya
      let upVotesBy = threadDetail.upVotesBy.filter((id) => id !== userId);
      let downVotesBy = threadDetail.downVotesBy.filter((id) => id !== userId);

      // Tambahkan vote sesuai tipe (1 = up-vote, -1 = down-vote, 0 = netral)
      if (voteType === 1) {
        upVotesBy.push(userId);
      } else if (voteType === -1) {
        downVotesBy.push(userId);
      }

      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy,
      };
    }
    
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
      
    // Menambahkan case untuk menangani voting pada komentar
    case ActionType.UP_VOTE_COMMENT:
    case ActionType.DOWN_VOTE_COMMENT:
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          // Cari komentar yang sesuai dengan ID
          if (comment.id === action.payload.commentId) {
            let upVotesBy = [...comment.upVotesBy];
            let downVotesBy = [...comment.downVotesBy];
            const { userId } = action.payload;

            // Logika untuk up-vote, down-vote, dan neutralize
            if (action.type === ActionType.UP_VOTE_COMMENT) {
              // Jika sebelumnya down-vote, hapus dari downVotesBy
              downVotesBy = downVotesBy.filter((id) => id !== userId);
              // Tambahkan ke upVotesBy jika belum ada
              if (!upVotesBy.includes(userId)) {
                upVotesBy.push(userId);
              }
            } else if (action.type === ActionType.DOWN_VOTE_COMMENT) {
              // Jika sebelumnya up-vote, hapus dari upVotesBy
              upVotesBy = upVotesBy.filter((id) => id !== userId);
              // Tambahkan ke downVotesBy jika belum ada
              if (!downVotesBy.includes(userId)) {
                downVotesBy.push(userId);
              }
            } else if (action.type === ActionType.NEUTRALIZE_VOTE_COMMENT) {
              // Hapus vote dari kedua sisi
              upVotesBy = upVotesBy.filter((id) => id !== userId);
              downVotesBy = downVotesBy.filter((id) => id !== userId);
            }

            // Kembalikan objek komentar baru dengan vote yang sudah diperbarui
            return {
              ...comment,
              upVotesBy,
              downVotesBy,
            };
          }
          // Jika bukan komentar target, kembalikan apa adanya
          return comment;
        }),
      };
      
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;