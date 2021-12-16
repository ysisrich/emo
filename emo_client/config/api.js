
import {get,post} from './axios'

/*
* 视频 Video
*
*/

export const getVideoList = (params={}) => get('/video/getVideoList',params);

export const addVideo = (params={}) => post('/video/addVideo',params);

export const getVideoOne = (params={}) => get('/video/getVideoOne',params);

export const getVideoRecommendList = (params={}) => get('/video/getVideoRecommendList',params);

export const putVideoOne = (params={}) => post('/video/putVideoOne',params);



/*
* 评论 Comment
*
*/

export const getCommentList = (params={}) => get('/comment/getCommentList',params);

export const addComment = (params={}) => post('/comment/addComment',params);

export const getCommentOne = (params={}) => get('/comment/getCommentOne',params);

export const putCommentOne = (params={}) => post('/comment/putCommentOne',params);




/*
* 影视 movie
*
*/

export const getMovieList = (params={}) => get('/movie/getMovieList',params);

export const addMovie = (params={}) => post('/movie/addMovie',params);

export const getMovieOne = (params={}) => get('/movie/getMovieOne',params);

export const putMovieOne = (params={}) => post('/movie/putMovieOne',params);


/*
* 留言 message 
*
*/

export const getMessageList = (params={}) => get('/message/getMessageList',params);

export const addMessage = (params={}) => post('/message/addMessage',params);

export const getMessageOne = (params={}) => get('/message/getMessageOne',params);

export const putMessageOne = (params={}) => post('/message/putMessageOne',params);